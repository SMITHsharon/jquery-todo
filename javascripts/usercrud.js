
var FbAPI = ((fish) => {

	fish.addUser = (keys, newUser) => {
		return new Promise((resolve, reject) => {
			$.ajax({
				method: 'POST',
				url: `${keys.databaseURL}/users.json`,
				data: JSON.stringify(newUser)

			}).done((response) => {
				resolve(response);
			}).catch((error) => {
				reject(errpr);
			});
		});
	};

	fish.getUser = (keys, uid) => {
		let users = [];
		return new Promise((resolve, reject) => {
			$.ajax({
				method: 'GET',
				url: `${keys.databaseURL}/users.json?orderBy="uid"&equalTo="${uid}"`
			}).done((user) => {
				console.log("user iife get // uid", user);
				let response = user;
				Object.keys(response).forEach((key) => {
					response[key].id = key;
					users.push(response[key]);
				});
				resolve(users[0]);
			}).fail((error) => {
				reject(error);
			});
		});
	};

	return fish;

})(FbAPI || {});