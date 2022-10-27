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
    $($taskListDiv).append($taskDiv);
}

function addNote() {
    // Create a new h5 with class "note" and text "New Note"
    let $note = $("<h5>New note</h5>");
        $note.attr("class", "note");
    // Append the h5 to the parent div with class "task"
    $(event.target).parent().append($note);
}