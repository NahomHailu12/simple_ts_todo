"use strict";
let indicator = false;
var temp = 0;
let id = 0;
const table = document.getElementById("table");
if (!table)
    throw new Error("Table element not found");
const form = document.getElementById("hidden");
if (!(form instanceof HTMLFormElement))
    throw new Error("Form element not found");
const btnSucess = document.getElementById("addTodo");
if (!btnSucess)
    throw new Error("AddTodo button not found");
const btnSubmit = document.getElementById("button_submit");
if (!(btnSubmit instanceof HTMLInputElement))
    throw new Error("Submit not found");
form.style.display = "none";
btnSucess.addEventListener("click", () => {
    btnSucess.style.display = "none";
    btnSubmit.defaultValue = "add";
    if (form)
        form.style.display = "block";
});
//update specific row
function updateTask(id) {
    indicator = true;
    temp = id;
    // @ts-ignore
    document.getElementById("button_submit").defaultValue = "Update";
    if (form)
        form.style.display = "block";
}
//delete specific row
function deleteTask(dId) {
    let conform = window.confirm("Are you sure you want to delete this task?");
    if (conform) { // @ts-ignore
        document.getElementById('table').removeChild(document.getElementById(`tr-${dId}`));
    }
}
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const titleElement = form.elements.namedItem("title");
    const taskElement = form.elements.namedItem("task");
    const dateElement = form.elements.namedItem("date");
    if (!((titleElement instanceof HTMLInputElement) &&
        (taskElement instanceof HTMLInputElement) &&
        (dateElement instanceof HTMLInputElement))) {
        throw new Error("forms inputs not found not found.");
    }
    const lists = {
        title: titleElement.value,
        task: taskElement.value,
        date: dateElement.value
    };
    // to create and add new element
    if (!indicator) {
        const todo = document.createElement("tr");
        todo.setAttribute("id", `tr-${id}`);
        todo.innerHTML = `
                                    <td>${lists.title}</td>
                                    <td>${lists.task}</td>
                                    <td>${lists.date}</td>
                                    <td><button id="update-${id} " class = "btn btn-success" onclick="updateTask(${id})">Update</button></td>
                                    <td><button id="delete-${id}" class = "btn btn-warning" onclick="deleteTask(${id})">Delete</button></td>`;
        table.appendChild(todo);
        btnSucess.style.display = "block";
        id++;
    }
    else {
        // update the specific row
        let tempid = `tr-${temp}`;
        let row = document.getElementById(tempid);
        if (!row)
            throw new Error("There is no task");
        row.innerHTML = `
                            <td>${lists.title}</td>
                            <td>${lists.task}</td>
                            <td>${lists.date}</td>
                            <td><button id="update-${temp} " class = "btn btn-success" onclick="updateTask(${temp})">Update</button></td>
                            <td><button id="delete-${temp}" class = "btn btn-warning" onclick="deleteTask(${temp})">Delete</button></td>
                `;
        indicator = false;
    }
    form.style.display = "none";
    form.reset();
});
