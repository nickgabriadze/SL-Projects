let incrementingID = 0;
document.querySelector("button").addEventListener("click", (e) => {
  e.preventDefault();
  const inputElement = document.querySelector(".input-todo");
  if (inputElement.value.trim().length === 0) {
    alert("Please enter a task");
  } else {
    const newTodos = document.querySelector(".todos");
    const newTodoElement = document.createElement(`div`);
    const newCheckBox = document.createElement("input");
    const newTodoTitle = document.createElement("h3");
    const newDeleteButton = document.createElement("button");
    newDeleteButton.innerText = "Delete";
    newDeleteButton.setAttribute("class", "delete-button");
    handleOverflow(newTodos);
    newTodoTitle.innerText = inputElement.value;
    newCheckBox.setAttribute("type", "checkbox");
    newCheckBox.setAttribute("class", "checkbox-input");
    newTodoElement.setAttribute("id", incrementingID++);
    newTodoElement.append(newCheckBox);
    newTodoElement.appendChild(newTodoTitle);
    newTodoElement.appendChild(newDeleteButton);
    newTodoElement.className = "each-todo";
    newTodos.appendChild(newTodoElement);

    newCheckBox.addEventListener("change", (e) => {
      if (e.target.checked) {
        newTodoTitle.style.textDecoration = "line-through";
        newDeleteButton.style.textDecoration = "line-through";
      } else {
        newTodoTitle.style.textDecoration = "none";
        newDeleteButton.style.textDecoration = "none";
      }
    });

    newDeleteButton.addEventListener("click", () => {
      newTodoElement.remove();
      handleOverflow(newTodos);
    });

 

    inputElement.value = "";
  }
});





const handleOverflow = (todo) => {
 
  if(todo.children.length > 1){
    todo.classList.add("overflow")
  }else{
    todo.classList.remove("overflow");
  
  }
}


