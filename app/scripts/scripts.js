$(document).ready(function() {

//Accessing Local Storage

  $('#newTaskForm').hide();

//Create the array
  var listo = [];

//Constructor that creates the task object
  var Task = function(task) {
    this.task = task;
    this.id = 'new';
  };

//invokes the Constructor function from the addTask function invokation, creating a new task.
  var addTask = function(task) {
    if(task) {
      task = new Task(task);
      listo.push(task);

      $('#newItemInput').val('');

      $('#newList').append(
        '<a href="#finish" class="" id="item">' +
        '<li class="list-group-item">' +
        '<h3>' + task.task + '</h3>' +
        '<span class="arrow pull-right">' +
        '<i class="glyphicon glyphicon-arrow-right">' +
        '</span>' +
        '</li>' +
        '</a>'
      );
    }
    $('#newTaskForm').slideToggle('fast', 'linear');
  };

//Calls the addTask function by button click
  $('#saveNewItem').on('click', function(e) {
    e.preventDefault();
    var task = $('#newItemInput').val().trim();
    addTask(task);
  });

//Functionality that changes the ID of the class
  var advanceTask = function(task) {
    var modified = task.innerText.trim();
    for (var i = 0; i < listo.length; i++) {
      if (listo[i].task === modified) {
        if (listo[i].id === 'new') {
          listo[i].id = 'inProgress';
        } else if(listo[i].id === 'inProgress') {
          listo[i].id = 'archived';
        } else {
          listo.splice(i,1);
        }
        break;
      }
    }
    task.remove();
  };

//Progress a new task to inProgress
  $(document).on('click', '#item', function(e) {
    e.preventDefault();
    var task = this;
    advanceTask(task);
    this.id = 'inProgress';
    $('#currentList').append(this.outerHTML);
    // this.id.onchange = populateStorage;
  });

//Progress an inProgress to the archive
  $(document).on('click', '#inProgress', function(e) {
    e.preventDefault();
    var task = this;
    task.id = 'archived';
    var changeIcon = task.outerHTML.replace('glyphicon-arrow-right', 'glyphicon-remove');
    advanceTask(task);
    $('#archivedList').append(changeIcon);
    // this.id.onchange = populateStorage;
  });

//Delete the task
  $(document).on('click', '#archived', function(e) {
    e.preventDefault();
    var task = this;
    advanceTask(task);
    // this.id.onchange = populateStorage;
  });

//Fades in and out the new task input field
  $('#add-todo').on('click', function() {
    $('#newTaskForm').fadeToggle('fast', 'linear');
  });
  $('#cancel').on('click', function(e) {
    e.preventDefault();
    $('#newTaskForm').fadeToggle('fast', 'linear');
  });
});
