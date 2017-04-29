
$(document).ready(function(){

	$("#new-item").click(()=>{
		$(".list-container").addClass("hide");
		$(".new-container").removeClass("hide");
	});

$("#list-items").click(()=>{
		$(".new-container").addClass("hide");
		$(".list-container").removeClass("hide");
	});

FbAPI.getTodos().then(() => {
	FbAPI.writeDOM();
	countTask();
})
.catch((error) => {
	console.log("getTodos Error", error);
});


// add todo
$('#add-todo-button').click(() => { 

	let newTodo = {
		// id:, ===== this key will be completed later on
		isCompleted: false, 
		task: $('#add-todo-text').val()
	};
	console.log("newTodo", newTodo);
	FbAPI.addTodo(newTodo).then(() => {
		$('#add-todo-text').val("");
		$(".new-container").addClass("hide");
		$(".list-container").removeClass("hide");
		FbAPI.writeDOM();
		countTask();
	}).catch((error) => {
		console.log("addTodo error", error);
	});

});


// delete todo



// edit todo



// complete todos (checkboxes)
$('.main-container').on("click", 'input[type="checkbox"]', (event) => {
	console.log("id", event.target.id);
	FbAPI.checker(event.target.id).then(() => {
		FbAPI.writeDOM();
	}).catch((error) => {
		console.log("checker error", error);
	});
});



let countTask = () => {

	// jQuery returns an array of the li's
	let remainingTasks = $('#incomplete-tasks li').length; 

	$('#counter').hide().fadeIn(3000).html(remainingTasks);

};






});