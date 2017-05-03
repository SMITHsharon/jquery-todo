
var FbAPI = ((cats) => {

	cats.registerUser = (credentials) => {
console.log("credentials.email", credentials.email);
		return new Promise ((resolve, reject) => {
			firebase.auth().createUserWithEmailAndPassword(credentials.email, credentials.password).then((authData) => {
					resolve(authData);
			}).catch((error) => {
				reject(error);
			});
		});
	};

	cats.loginUser = (creds) => {

		return new Promise ((resolve, reject) => {
			firebase.auth().signInWithEmailAndPassword(creds.email, creds.password)
			.then((authData) => {
				resolve(authData);
			}).catch((error) => {
				reject(error);
			});
		});
	};

	return cats;
	
})(FbAPI || {});