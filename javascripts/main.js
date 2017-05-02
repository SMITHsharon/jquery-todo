
$(document).ready(function(){

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
	FbAPI.writeDOM(apiKeys);

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



});
