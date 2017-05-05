
$(document).ready(function(){

// questions
// why was the getToDos moved out of <main>, to crud
// why was getToDos in <main> initially?
//

let apiKeys;
let editId = "";

	$("#new-item").click(()=>{
		$(".list-container").addClass("hide");
		$(".new-container").removeClass("hide");
	});

$("#list-items").click(()=>{
		$(".new-container").addClass("hide");
		$(".list-container").removeClass("hide");
	});


FbAPI.firebaseCredentials().then((keys) => {
	apiKeys = keys;
	// gets the apiKeys.JSON object
	// that has the API key et al
	firebase.initializeApp(apiKeys);
	// FbAPI.writeDOM(apiKeys);

}).catch((error ) => {
	console.log("key errors", error);
});


// moved to crud.js
// FbAPI.getTodos().then(() => {
// 	FbAPI.writeDOM();
// 	countTask();
// })
// .catch((error) => {
// 	console.log("getTodos Error", error);
// });


// add todo
$('#add-todo-button').click(() => { 

	let newTodo = {
		isCompleted: false, 
		task: $('#add-todo-text').val()
	};
	if (editId.length > 0) {
		// edit
		FbAPI.editToDo(apiKeys, newTodo, editId).then(() => {
			$('#add-todo-text').val("");
			editId = "";
			$(".new-container").addClass("hide");
			$(".list-container").removeClass("hide");
			FbAPI.writeDOM(apiKeys);

		}).catch((error) => {
			console.log("editTodo error", error);
		});
	} else { // add
		FbAPI.addToDo(apiKeys, newTodo).then(() => {
			$('#add-todo-text').val("");
			$(".new-container").addClass("hide");
			$(".list-container").removeClass("hide");
			FbAPI.writeDOM(apiKeys);

		}).catch((error) => {
			console.log("addTodo error", error);
		});
	}
});


// delete todo
$('.main-container').on('click', '.delete', (event) => {
	FbAPI.deleteToDo(apiKeys, event.target.id).then(() => {
		FbAPI.writeDOM(apiKeys);

	}).catch((error) => {
		console.log("error in deleteToDo", error);
	});
});



// edit todo
$('.main-container').on('click', '.edit', (event) => {
	let editText = $(event.target).closest('.col-xs-4').siblings('.col-xs-8').find('.task').html();
	editId = event.target.id;
	$(".list-container").addClass("hide");
	$(".new-container").removeClass("hide");
	$('#add-todo-text').val(editText);
});



// complete todos (checkboxes)
$('.main-container').on("click", 'input[type="checkbox"]', (event) => {
	let myToDo = {
		isCompleted: event.target.checked,
		task: $(event.target).siblings('.task').html()
	};
	FbAPI.editToDo(apiKeys, myToDo, event.target.id).then(() => {
		FbAPI.writeDOM(apiKeys);

	}).catch((error) => {
		console.log("error in toDo checkboxes", error);
	});
});


// moved to dom.js
// let countTask = () => {

// 	// jQuery returns an array of the li's
// 	let remainingTasks = $('#incomplete-tasks li').length; 

// 	$('#counter').hide().fadeIn(3000).html(remainingTasks);

// };



$('#registerButton').click(() => {
	let email = $('#inputEmail').val();
	let password = $('#inputPassword').val();
	let username = $('#inputUsername').val();

	// ES6 notation when key & value are the same
	// otherwise, have to break out the 
	// key: value pairs
	let user = {email, password}; 
	FbAPI.registerUser(user).then((response) => {
		console.log("register response", response);
		let newUser = {
			uid: response.uid,
			username: username
		};

		FbAPI.addUser(apiKeys, newUser).then((response) => {
			FbAPI.loginUser(user).then((response) => {
				clearLogin();
				$('#login-container').addClass('hide');
				$('.main-container').removeClass('hide');
				FbAPI.writeDOM(apiKeys);
			}).catch((error) => {
				console.log("error in loginUser", error);
			});
		}).catch((error) => {
			console.log("error in addUser", error);
		});
	}).catch((error) => {
		console.log("error in registerUser", error);
	});
});


let clearLogin = () => {

	$('#inputEmail').val("");
	$('#inputPassword').val("");
	$('#inputUsername').val("");
};


$('#loginButton').click(() => {
	
	let email = $('#inputEmail').val();
	let password = $('#inputPassword').val();

	let user = {email, password};

	FbAPI.loginUser(user).then((response) => {
		clearLogin();
		$('#login-container').addClass('hide');
		$('.main-container').removeClass('hide');
		FbAPI.createLogoutButton(apiKeys);
		FbAPI.writeDOM(apiKeys);
	}).catch((error) => {
		console.log("error in loginUser", error);
	});
});

$('#logout-container').on('click', '#logoutButton', () => {
	clearLogin();
	FbAPI.logoutUser();
	$('#login-container').removeClass('hide');
	$('.main-container').addClass('hide');
});





});
