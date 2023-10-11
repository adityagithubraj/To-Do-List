// todo.js

document.addEventListener("DOMContentLoaded", () => {
    const todoForm = document.getElementById("todo-form");
    const todoContainer = document.getElementById("todo-container");

    //............fetch and display todos.......................//

    const fetchTodos = async () => {
        try {
            const response = await fetch("http://localhost:6060/api/find");
            const todos = await response.json();

            todoContainer.innerHTML = "";

            todos.forEach((todo) => {
                const todoCard = document.createElement("div");
                todoCard.classList.add("todo-card");
                const createdDate = new Date(todo.createdAt).toLocaleDateString();
                todoCard.innerHTML = `
                    <strong>${todo.title}  </strong> ${todo.description}
                    <em>Created on: ${createdDate}</em>
                    <button class="edit" data-id="${todo._id}">Edit</button>
                    <button class="delete" data-id="${todo._id}">Delete</button>
                    <input type="checkbox" class="complete" data-id="${todo._id}" ${
                    todo.completed ? "checked" : ""
                }> Completed
                `;

//................... edit and delete buttons.........................//

                todoCard.querySelector(".edit").addEventListener("click", async (event) => {
                    const todoId = event.target.getAttribute("data-id");
                    const newTitle = prompt("Edit Todo Title:", todo.title);
                    const newDescription = prompt("Edit Todo Description:", todo.description);
                    await editTodo(todoId, newTitle, newDescription);
                    fetchTodos();
                });

                todoCard.querySelector(".delete").addEventListener("click", async (event) => {
                    const todoId = event.target.getAttribute("data-id");
                    await deleteTodo(todoId);
                    fetchTodos();
                });

 //............... completion status..............................//
                todoCard.querySelector(".complete").addEventListener("change", async (event) => {
                    const todoId = event.target.getAttribute("data-id");
                    const completed = event.target.checked;
                    await updateCompletionStatus(todoId, completed);
                    fetchTodos();
                });

                todoContainer.appendChild(todoCard);
            });
        } catch (error) {
            console.error(error);
        }
    };

//................ create a new todo.....................//

    const createTodo = async (title, description) => {
        try {
            const response = await fetch("http://localhost:6060/api/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title, description, completed: false }),
            });
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Failed to create todo.");
            }
        } catch (error) {
            console.error(error);
        }
    };


//................edit a todo.......................//
    const editTodo = async (id, title, description) => {
        try {
            const response = await fetch(`http://localhost:6060/api/update/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title, description }),
            });
            if (!response.ok) {
                throw new Error("Failed to edit todo.");
            }
        } catch (error) {
            console.error(error);
        }
    };


//........................ delete a todo........................//
    const deleteTodo = async (id) => {
        try {
            const response = await fetch(`http://localhost:6060/api/delete/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("Failed to delete todo.");
            }
        } catch (error) {
            console.error(error);
        }
    };


    //..................  update todo.........................//

    const updateCompletionStatus = async (id, completed) => {
        try {
            const response = await fetch(`http://localhost:6060/api/update/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ completed }),
            });
            if (!response.ok) {
                throw new Error("Failed to update completion status.");
            }
        } catch (error) {
            console.error(error);
        }
    };

    

    todoForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const title = document.getElementById("title").value;
        const description = document.getElementById("description").value;

        if (title.trim() === "") return;

        await createTodo(title, description);
        fetchTodos();

       
        document.getElementById("title").value = "";
        document.getElementById("description").value = "";
    });

    
    fetchTodos();
});
