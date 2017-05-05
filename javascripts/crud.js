
// Promises iife

var FbAPI = ((oldCrap) => {

	oldCrap.getToDos = (apiKeys) => {

		let items = [];

		return new Promise ((resolve, reject) => {

			let uid = FbAPI.credentialsCurrentUser().uid;

			$.ajax(`${apiKeys.databaseURL}/items.json?orderBy="uid"&equalTo="${uid}"`)
			.done((data) => {
				console.log("data :: ", data);
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

			}).fail((error) => {
				reject(error);
			});
		});
	};


	oldCrap.addToDo = (apiKeys, newToDo) => {

		newToDo.uid = FbAPI.credentialsCurrentUser().uid;

		return new Promise ((resolve, reject) => {
			$.ajax({
				method: 'POST',
				url: `${apiKeys.databaseURL}/items/.json`,
				data: JSON.stringify(newToDo)

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


	oldCrap.editToDo = (apiKeys, editToDo, id) => {

		editToDo.uid = FbAPI.credentialsCurrentUser().uid;

		return new Promise ((resolve, reject) => {
			$.ajax({
				method: 'PUT',
				url: `${apiKeys.databaseURL}/items/${id}.json`,
				data: JSON.stringify(editToDo)

			}).done(() => {
				resolve();
			}).fail((error) => {
				reject(error);
			});
		});
	};

	return oldCrap;
})(FbAPI || {});

