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
    // Get item from local storage with key "lists" and put it in a variable as a string
    var lists = localStorage.getItem("lists");
    // Remove all \, [ and ] from the lists variable
    lists = lists.replace(/\\/g, "");
    lists = lists.replace("[", "");
    lists = lists.replace("]", "");
    // Remove first and last character from lists variable
    lists = lists.substring(1, lists.length - 1);
    console.log(lists);
    // Lists variable is pure html now, so append it to the body
    $("body").append(lists);
});

// When form with class "createList" is submitted, get input with id "listName" in variable "name"
$("#formListSubmit").click(function(e) {
    // Prevents the default action of the form to fire
    e.preventDefault();
    // Get the value of the input with id "listName"
    let $name = $("#listName").val();
    // If the value of the input starts with a space, is empty or is longer than 20 characters, return
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

function createTask() {
    // Get all the elements in the parent form of the button that was clicked
    let $parentElements = $(event.target).parent().children();
    // Get the value of the input with id "taskInput" in the parent form of the button that was clicked
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
    // If $taskName is more than 50 characters add "\n" inside the string every 50 characters
    let $array = [];
    if ($taskName.length > 50) {
        for (let i = 0; i < $taskName.length; i = i + 50) {
            $array.push($taskName.slice(i, i + 50));
        }
        console.log($array);
    }
    // Set the value of the input with id "taskInput" in the parent form of the button that was clicked to ""
    $parentElements[0].value = "";
    // Create a new div with class "task"
    let $taskDiv = $("<div>");
        $taskDiv.attr("class", "task");
    // Create a new h3 with class "taskTitle" and the value of $taskName
    let $addSubtask = $("<button>Add subtask</button>");
        $addSubtask.attr("class", "addSubtask");
        $addSubtask.attr("onClick", "addSubtask(event)");
    let $deleteTask = $("<button>Delete task</button>");
        $deleteTask.attr("class", "deleteTask");
        $deleteTask.attr("onClick", "deleteTask(event)");

    
    
    // Create a new button with class "addNote" which will add a <h5> with class "note" and text "New Note" and place it underneath the <h4> with class "taskTitle"
    let $addNoteButton = $("<button>+</button>");
        $addNoteButton.attr("class", "addNote");
        $addNoteButton.attr("onClick", "addNote()");
        // Add flaoting right to the button
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
        // Place the button to the right of the <h5> with class "taskTitle"
    //Append $addNoteButton to the last <h4> element
    
    // Append the button to the div
    // $taskDiv.append($addNoteButton);
    // Append the div to the parent div with class "taskList"
    console.log($(event.target).parent().parent().children()[2]);
    console.log($taskDiv);
    // Get the class name of the parent parents third child
    let $taskListDiv = $(event.target).parent().parent().children()[2];
    // If the class name is "taskList", append the div to the parent parents third child
    // Append $taskDiv to $taskListDiv
    $taskDiv.append($addSubtask);
    $taskDiv.append($deleteTask);
    $($taskListDiv).append($taskDiv);
}

function addNote() {
    // Create an input with type "text" and class "noteInput"
    let $noteInput = $("<input>");
        $noteInput.attr("type", "text");
        $noteInput.attr("class", "noteInput");
        $noteInput.attr("placeholder", "New Note...");
    // Create a button with class "noteSubmit" and text "Submit"
    let $noteSubmit = $("<button>Submit</button>");
        $noteSubmit.attr("class", "noteSubmit");
        $noteSubmit.attr("onClick", "submitNote()");
    // Append the input and button to the parent div with class "task"
    $(event.target).parent().append($noteInput);
    $(event.target).parent().append($noteSubmit);
}

function submitNote() {
    // Get the value of the input with class "noteInput"
    let $noteInput = $(event.target).parent().children()[1].value;
    // If $noteInput is more than 50 characters add "\n" inside the string every 50 characters
    let $array = [];
    if ($noteInput.length > 50) {
        for (let i = 0; i < $noteInput.length; i = i + 50) {
            $array.push($noteInput.slice(i, i + 50));
        }
        console.log($array);
    }
    // Create a new <h5> with class "note" and the value of $noteInput
    let $noteH5;
    if ($noteInput.length < 50) {
        $noteH5 = $("<h5>" + $noteInput + "</h5>");
        $noteH5.attr("class", "note");
        // Append the <h5> to the parent div with class "task"
        $(event.target).parent().append($noteH5);
    } else {
        for (let i = 0; i < $array.length; i++) {
            $noteH5 = $("<h5>");
            $noteH5.attr("class", "note");
            $noteH5.text($array[i]);
            $(event.target).parent().append($noteH5);
        }
    }
    // Remove the input and button from the parent div with class "task"
    $(event.target).parent().children()[1].remove();
    $(event.target).parent().children()[1].remove();

}

function deleteList(event) {

    // Ask user if they are sure they want to delete the list
    let $sure = confirm("Are you sure you want to delete this list?");
    // If they are sure, delete the list
    if ($sure) {
        let $list = $(event.target).parent().parent();
        // Remove the div from the DOM
        $list.remove();
    } else {
        return;
    }
}

function deleteTask(event) {
    // Ask user if they are sure they want to delete the task
    let $sure = confirm("Are you sure you want to delete this task?");
    // If they are sure, delete the task
    if ($sure) {
        let $task = $(event.target).parent();
        // Remove the div from the DOM
        $task.remove();
    } else {
        return;
    }
}

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
        // Add flaoting right to the button
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
