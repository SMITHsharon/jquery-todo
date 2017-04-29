
// this is the main iife

var FbAPI = (() => {

	let todos = [];

	return {
		todoGetter : () => {
			return todos;
		}, 

		setTodos : (newArray) => {
			todos = newArray;
		},

		setSingleTodo : (newObject) => {
			todos.push(newObject);
		}
	};

})();