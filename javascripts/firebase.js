
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
		},

		setChecked: (itemID) => {
			const position = itemID.split("item")[1]; // item0 = ["", 0]
			todos[position].isCompleted = !todos[position].isCompleted;
		},

		duhlete: (id) => {
			const position = id.split("item")[1];
			todos.splice(position, 1);
		}
	};

})();