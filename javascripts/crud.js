
// Promises iife

var FbAPI = ((oldCrap) => {

	oldCrap.getTodos = (apiKeys) => {
		let items = [];
		return new Promise ((resolve, reject) => {
			$.ajax(`${apiKeys.databaseURL}/items.json`)
			.done((data) => {
				let response = data;
				Object.keys(response).forEach((key) => { 
// console.log("key", key);
					response[key].id = key;
					//response[item0] = {
						//isCompleted : true,
						//task: "mow the lawn"
						//id: "item0" ======> this new key/value pair being created here
					// }

					items.push(response[key]);
				});
			
			resolve(items);
			})

			.fail((error) => {
			reject(error);
			});
		});
	};

	oldCrap.addTodo = (newTodo) => {
		return new Promise ((resolve, reject) => {
			newTodo.id = `item${FbAPI.todoGetter().length}`;
// console.log("newTodo", newTodo);
			FbAPI.setSingleTodo(newTodo);
			resolve();
		});
	};

	oldCrap.checker = (id) => {
		return new Promise ((resolve, reject) => {
			FbAPI.setChecked(id);
			resolve();
		});

	};

	oldCrap.deleteToDo = (id) => {
		return new Promise ((resolve, reject) => {
			FbAPI.duhlete(id);
			resolve();
		});
	};

	oldCrap.editToDo = (id) => {
		return new Promise ((resolve, reject) => {
			FbAPI.duhlete(id);
			resolve();
		});
	};






	return oldCrap;
})(FbAPI || {});

