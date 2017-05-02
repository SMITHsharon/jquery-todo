
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
	firebase.initializeApp(apiKeys);
	FbAPI.writeDOM(apiKeys);

}).catch((error ) => {
	console.log("key errors", error);
});


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
		// id:, ===== this key will be completed later on
		isCompleted: false, 
		task: $('#add-todo-text').val()
	};
	if (editId.length > 0) {
		// edit
		FbAPI.editToDo(apiKeys, newTodo, editId).then(() => {
			$('#add-todo-text').val("");
			$(".new-container").addClass("hide");
			$(".list-container").removeClass("hide");
			FbAPI.writeDOM(apiKeys);
		}).catch((error) => {
			console.log("addTodo error", error);
		});
	} else { // add
		console.log("newTodo", newTodo);
		FbAPI.addTodo(apiKeys, newTodo).then(() => {
			$('#add-todo-text').val("");
			editId = "";
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
	let myTodo = {
		isCompleted: event.target.checked,
		task: $(event.target).siblings('.task').html()
	};
	FbAPI.editToDo(apiKeys, myTodo, event.target.id).then(() => {
		FbAPI.writeDOM(apiKeys);
	}).catch((error) => {

	});
});



// let countTask = () => {

// 	// jQuery returns an array of the li's
// 	let remainingTasks = $('#incomplete-tasks li').length; 

// 	$('#counter').hide().fadeIn(3000).html(remainingTasks);

// };



});
