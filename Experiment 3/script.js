function addTask() {
    let input = document.getElementById("taskInput");
    let taskText = input.value;

    if (taskText === "") return;

    let li = document.createElement("li");
    li.textContent = taskText;

    // Mark complete
    li.onclick = function () {
        li.classList.toggle("completed");
    };

    // Delete button
    let btn = document.createElement("button");
    btn.textContent = "X";
    btn.onclick = function (e) {
        e.stopPropagation();
        li.remove();
    };

    li.appendChild(btn);
    document.getElementById("taskList").appendChild(li);

    input.value = "";
}