
// Promises iife

var FbAPI = ((oldCrap) => {

	oldCrap.getTodos = () => {
		let items = [];
		return new Promise ((resolve, reject) => {
			$.ajax('./database/seed.json')
			.done((data) => {
				let response = data.items;
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
			FbAPI.setTodos(items);
			resolve();
			})

			.fail((error) => {
			reject(error);
			});
		});
	};

	return oldCrap;
})(FbAPI || {});