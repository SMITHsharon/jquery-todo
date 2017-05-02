
// Promises iife

var FbAPI = ((oldCrap) => {

	oldCrap.getTodos = (apiKeys) => {
		let items = [];
		return new Promise ((resolve, reject) => {
			$.ajax(`${apiKeys.databaseURL}/items.json`)
			.done((data) => {
				let response = data;
				Object.keys(response).forEach((key) => { 
					console.log("key", key);
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

	oldCrap.addTodo = (apiKeys, newTodo) => {
		return new Promise ((resolve, reject) => {
			$.ajax({
				method: 'POST',
				url: `${apiKeys.databaseURL}/items/.json`,
				data: JSON.stringify(newTodo)

			}).done(() => {
				resolve();
			}).fail((error) => {
				reject(error);
			});
		});
	};

	

	oldCrap.deleteToDo = (apiKeys, id) => {
		return new Promise ((resolve, reject) => {
			$.ajax({
				method: 'DELETE',
				url: `${apiKeys.databaseURL}/items/${id}.json`

			}).done(() => {
				resolve();
			}).fail((error) => {
				reject(error);
			});
			
		
		});
	};

	oldCrap.editToDo = (apiKeys, editTodo, id) => {
		return new Promise ((resolve, reject) => {
			$.ajax({
				method: 'PUT',
				url: `${apiKeys.databaseURL}/items/${id}.json`,
				data: JSON.stringify(editTodo)

			}).done(() => {
				resolve();
			}).fail((error) => {
				reject(error);
			});
		});
	};






	return oldCrap;
})(FbAPI || {});

