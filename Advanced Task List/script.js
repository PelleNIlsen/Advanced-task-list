// If button with id "saveLists" is clicked, save all divs with class "list" to local storage as different lists
$("#saveLists").click(function() {
    var lists = $(".list");
    var listsArray = [];
    for (var i = 0; i < lists.length; i++) {
        listsArray.push(lists[i].innerHTML);
    }
    localStorage.setItem("lists", JSON.stringify(listsArray));
});

// If button with id "loadLists" is clicked, load all lists from local storage
$("#loadLists").click(function() {
    var lists = localStorage.getItem("lists");
    lists = lists.replace(/\\/g, "");
    lists = lists.replace("[", "");
    lists = lists.replace("]", "");
    lists = lists.substring(1, lists.length - 1);
    console.log(lists);
    $("body").append(lists);
});

// When form with class "createList" is submitted, get input with id "listName" in variable "name"
$("#formListSubmit").click(function(e) {
    e.preventDefault();
    let $name = $("#listName").val();
    if ($name[0] == " " || $name.length > 50 || $name == "") {
        $(".error").text("Invalid name!");
        $(".error").css("color", "red");
        $(".error").css("visibility", "visible");
        setTimeout( function() {
            $(".error").css("visibility", "hidden");
        }, 5000);
        $("#listName").val("");
        return;
    }
    $("#listName").val("");
    
    createList($name);
})

// Creates list with list specified list name
function createList($name) {
    let $div = $("<div>");
        $div.attr("class", "list");
    let $h3 = $("<h3>" + $name + "</h3>");
        $h3.attr("class", "listTitle")

    let $deleteList = $("<button>Delete list</button>");
        $deleteList.attr("class", "deleteList");
        $deleteList.attr("onclick", "deleteList(event)");
    
    $h3.append($deleteList);

    let $form = $("<form>");
        $form.attr("class", "createTask");
        $form.attr("id", "taskForm");
        let $taskInput = $("<input>");
            $taskInput.attr("type", "text");
            $taskInput.attr("name", "taskInput");
            $taskInput.attr("id", "taskInput");
            $taskInput.attr("placeholder", "New Task Name...");

        let $taskButton = $("<button>Create New Task</button>");
            $taskButton.attr("type", "button");
            $taskButton.attr("id", "formTaskSubmit");
            $taskButton.attr("onClick", "createTask()");

    let $taskList = $("<div>");
        $taskList.attr("class", "taskList");

    let $taskH3 = $("<h3>");
        $taskH3.attr("class", "tasks");
        $taskH3.text("Tasks");

    $div.append($h3);
        $form.append($taskInput);
        $form.append($taskButton);
    $div.append($form);
        $taskList.append($taskH3);
    $div.append($taskList);
    $("body").append($div);
}

// Creates a task with task name and buttons to add notes, add subtask and delete task
function createTask() {
    let $parentElements = $(event.target).parent().children();
    let $taskName = $parentElements[0].value;
    console.log($taskName);
    if ($taskName[0] == " " || $taskName == "") {
        $(".error").text("Invalid name!");
        $(".error").css("color", "red");
        $(".error").css("visibility", "visible");
        setTimeout( function() {
            $(".error").css("visibility", "hidden");
        }, 5000);
        $parentElements[0].value = ""; 
        return;
    }
    let $array = [];
    if ($taskName.length > 50) {
        for (let i = 0; i < $taskName.length; i = i + 50) {
            $array.push($taskName.slice(i, i + 50));
        }
        console.log($array);
    }
    $parentElements[0].value = "";
    let $taskDiv = $("<div>");
        $taskDiv.attr("class", "task");

    let $addSubtask = $("<button>Add subtask</button>");
        $addSubtask.attr("class", "addSubtask");
        $addSubtask.attr("onClick", "addSubtask(event)");

    let $deleteTask = $("<button>Delete task</button>");
        $deleteTask.attr("class", "deleteTask");
        $deleteTask.attr("onClick", "deleteTask(event)");

    let $addNoteButton = $("<button>+</button>");
        $addNoteButton.attr("class", "addNote");
        $addNoteButton.attr("onClick", "addNote()");
        $addNoteButton.css("float", "right");

    let $taskH4;
    if ($taskName.length < 50) {
        $taskH4 = $("<h4>" + $taskName + "</h4>");
        $taskDiv.append($taskH4);
        $taskH4.append($addNoteButton);
    } else {
        for (let i = 0; i < $array.length; i++) {
            $taskH4 = $("<h4>");
            $taskH4.attr("class", "taskTitle");
            $taskH4.text($array[i]);
            $taskDiv.append($taskH4);
        }
        $taskH4.append($addNoteButton);
    }

    console.log($(event.target).parent().parent().children()[2]);
    console.log($taskDiv);

    let $taskListDiv = $(event.target).parent().parent().children()[2];

    $taskDiv.append($addSubtask);
    $taskDiv.append($deleteTask);
    $($taskListDiv).append($taskDiv);
}

// Adds an input and submit button to add a note to a task
function addNote() {
    let $noteInput = $("<input>");
        $noteInput.attr("type", "text");
        $noteInput.attr("class", "noteInput");
        $noteInput.attr("placeholder", "New Note...");

    let $noteSubmit = $("<button>Submit</button>");
        $noteSubmit.attr("class", "noteSubmit");
        $noteSubmit.attr("onClick", "submitNote()");

    $(event.target).parent().append($noteInput);
    $(event.target).parent().append($noteSubmit);
}

// Adds a note to a task then removes the input and submit button
function submitNote() {
    let $noteInput = $(event.target).parent().children()[1].value;
    let $array = [];
    if ($noteInput.length > 50) {
        for (let i = 0; i < $noteInput.length; i = i + 50) {
            $array.push($noteInput.slice(i, i + 50));
        }
        console.log($array);
    }
    let $noteH5;
    if ($noteInput.length < 50) {
        $noteH5 = $("<h5>" + $noteInput + "</h5>");
        $noteH5.attr("class", "note");
        $(event.target).parent().append($noteH5);
    } else {
        for (let i = 0; i < $array.length; i++) {
            $noteH5 = $("<h5>");
            $noteH5.attr("class", "note");
            $noteH5.text($array[i]);
            $(event.target).parent().append($noteH5);
        }
    }
    $(event.target).parent().children()[1].remove();
    $(event.target).parent().children()[1].remove();

}

// Deletes a list
function deleteList(event) {
    let $sure = confirm("Are you sure you want to delete this list?");
    if ($sure) {
        let $list = $(event.target).parent().parent();
        $list.remove();
    } else {
        return;
    }
}

// Deletes a task
function deleteTask(event) {
    let $sure = confirm("Are you sure you want to delete this task?");
    if ($sure) {
        let $task = $(event.target).parent();
        $task.remove();
    } else {
        return;
    }
}

function deleteSubtask(event) {
    let $sure = confirm("Are you sure you want to delete this subtask?");
    if ($sure) {
        let $subtask = $(event.target).parent();
        $subtask.remove();
    } else {
        return;
    }
}

// Adds an input and submit button to add a subtask to a task
function addSubtask(event) {
    let $subtask = $("<div>");
        $subtask.attr("class", "subtask");
    let $subtaskInput = $("<input>");
        $subtaskInput.attr("type", "text");
        $subtaskInput.attr("placeholder", "New Subtask Name...");
    let $subtaskButton = $("<button>Create New Subtask</button>");
        $subtaskButton.attr("type", "button");
        $subtaskButton.attr("onClick", "createSubtask(event)");
    $subtask.append($subtaskInput);
    $subtask.append($subtaskButton);
    $(event.target).parent().append($subtask);
}

// Creates a subtask
function createSubtask(event) {
    let $subtaskName = $(event.target).parent().children()[0].value;
    if ($subtaskName[0] == " " || $subtaskName == "") {
        $(".error").text("Invalid name!");
        $(".error").css("color", "red");
        $(".error").css("visibility", "visible");
        setTimeout( function() {
            $(".error").css("visibility", "hidden");
        }, 5000);
        $(event.target).parent().children()[0].value = ""; 
        return;
    }
    let $subtask = $("<div>");
        $subtask.attr("class", "subtask");

    let $subtaskH4 = $("<h4>" + $subtaskName + "</h4>");

    let $deleteSubtask = $("<button>Delete subtask</button>");
        $deleteSubtask.attr("class", "deleteSubtask");

        $deleteSubtask.attr("onClick", "deleteSubtask(event)");
    let $addNoteButton = $("<button>+</button>");
        $addNoteButton.attr("class", "addNote");
        $addNoteButton.attr("onClick", "addNote()");
        $addNoteButton.css("float", "right");

    let $addSubtask = $("<button>Add subtask</button>");
        $addSubtask.attr("class", "addSubtask");
        $addSubtask.attr("onClick", "addSubtask(event)");
    
    $subtaskH4.append($addNoteButton);
    $subtask.append($subtaskH4);
    $subtask.append($addSubtask);
    $subtask.append($deleteSubtask);
    $(event.target).parent().parent().append($subtask);
    $(event.target).parent().remove();
}