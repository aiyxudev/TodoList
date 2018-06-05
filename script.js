// JavaScript Document

var todoList = {
	todos: [],	
	
	addTodo: function(todoText){
		this.todos.push({
			todoText: todoText,
			completed: false
		});
	},
	
	changeTodo: function(position, todoText){
		this.todos[position].todoText = todoText;	
	},
	
	deleteTodo: function(position){
		this.todos.splice(position,1);
	},
	
	toggleCompleted: function(position){
		var todo = this.todos[position];
		todo.completed = !todo.completed;
	},
	
	toggleAll: function(){
		var totalTodos = this.todos.length;
		var completedTodos = 0;
	
		this.todos.forEach(function(todo) {
			if(todo.completed === true){
				completedTodos++;
			}
		});

		this.todos.forEach(function(todo){
			if(completedTodos === totalTodos){
				todo.completed = false;
			} else {
				todo.completed = true;
			}
		});
	}	
};


var handlers = {
	addTodo: function(textInput){
		todoList.addTodo(textInput);
		view.displayTodos();	
	},
	
	changeTodo: function(position,todoText){
		todoList.changeTodo(position, todoText);
		view.displayTodos();
	},
	
	deleteTodo: function(position){
		todoList.deleteTodo(position);
		view.displayTodos();
	},
	
	toggleCompleted: function(position) {
		todoList.toggleCompleted(position);
		view.displayTodos();
	},
	
	toggleAll: function() {
    	todoList.toggleAll();
    	view.displayTodos();
  	}  	
};


var view = {
	displayTodos: function(){
		
		var todosUl = document.querySelector("ul");
		todosUl.innerHTML = '';	

		todoList.todos.forEach(function(todo,position){
			var todoLi = document.createElement("li");
			var todoTextWithCompletion = "";
			
			if (todo.completed === true){
				todoTextWithCompletion = "(x)" + todo.todoText;
			}else{
				todoTextWithCompletion = "( )" + todo.todoText;
			}
			
			todoLi.id = position;
			todoLi.textContent = todoTextWithCompletion;
			todoLi.appendChild(this.createEditButton());
			todoLi.appendChild(this.createDeleteButton());
			todoLi.appendChild(this.createToggleButton());
			
			todosUl.appendChild(todoLi);		
		}, this);	
	},
	
	//new code <- edit button on the side
	createEditButton: function(){
		var editButton = document.createElement("button");
		editButton.textContent = "Edit";
		editButton.className = "editButton";
		return editButton;
	},
	
	createDeleteButton: function(){
		var deleteButton = document.createElement("button");
		deleteButton.textContent = "Delete";
		deleteButton.className = "deleteButton";
		return deleteButton;
	},
	
	createToggleButton: function(){
		var toggleButton = document.createElement("button");
		toggleButton.textContent = "Toggle";
		toggleButton.className = "toggleButton";
		return toggleButton;
	},
	
	
	setUpEventListeners: function() {
		var todosUl = document.querySelector("ul");
		var addTodoTextInput = document.getElementById('addTodoTextInput');	 
	
		todosUl.addEventListener("click",function(event) {
			var elementClicked = event.target;
			if (elementClicked.className === "deleteButton"){
				handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
			}

			if (elementClicked.className === "editButton"){
				var todoText = prompt('Edit');
				handlers.changeTodo(parseInt(elementClicked.parentNode.id),todoText);
			}
			
			if(elementClicked.className === "toggleButton"){
				handlers.toggleCompleted(parseInt(elementClicked.parentNode.id));
			}
		});
		
		addTodoTextInput.addEventListener('keyup', function(event){
			if (event.keyCode === 13){
				handlers.addTodo(addTodoTextInput.value);
				addTodoTextInput.value = "";
			}
		})
 	}
};

view.setUpEventListeners();

	
	



