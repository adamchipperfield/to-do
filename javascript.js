// Declare Variables //
var userInput = document.getElementById('userInput');
var userSubmit = document.getElementById('userSubmit');
var toDoList = document.getElementById('toDoList');
var doneList = document.getElementById('doneList');
var itemCheck = document.getElementById('itemCheck');
var listStatus = document.getElementById('listStatus');
var completeCount = document.getElementById('completeCount');
var toDoCount = document.getElementById('toDoCount');
var toDoCountText = document.getElementById('toDoCountText');
var completeCountText = document.getElementById('completeCountText');
var alertBox = document.getElementById('alertBox');
var alertBoxToDoName = document.getElementById('alertBoxToDoName');
var alertBoxInput = document.getElementById('alertBoxInput');
var alertBoxSubmit = document.getElementById('alertBoxSubmit');
var alertBoxClose = document.getElementById('alertBoxClose');
var alertBoxStatus = document.getElementById('alertBoxStatus');
var currentToDo;
var currentToDoLabel;

// Declare Event Listeners //
userSubmit.addEventListener('click', addToDo);
alertBoxSubmit.addEventListener('click', editToDo);
alertBoxClose.addEventListener('click', closeEditToDo);

// Set Up Elements //
userInput.focus();
alertBoxInput.focus();

// Functions //

// Counter Functions
function countToDo(){
  if(toDoList.childElementCount === 1){
    toDoCountText.innerHTML = 'item';
  }else{
    toDoCountText.innerHTML = 'items';
  }
  toDoCount.innerHTML = toDoList.childElementCount;
}

function countDone(){
  if(doneList.childElementCount === 1){
    completeCountText.innerHTML = 'item';
  }else{
    completeCountText.innerHTML = 'items';
  }
  completeCount.innerHTML = doneList.childElementCount;
}

// To Do Functions

function addToDo(){
  if(userInput.value === ''){
    listStatus.innerHTML = 'Please enter some text';
    listStatus.style.color = 'red';
  }else{
    var node = document.createElement('li');
    node.innerHTML = '<input type="checkbox" id="itemCheck" onclick="checkToDo(this)" /><label onclick="openEditToDo(this)">' + userInput.value + '</label>';
    toDoList.insertBefore(node, toDoList.childNodes[0]);
    listStatus.innerHTML = '';
  }
  userInput.value = '';
  userInput.focus();
  countToDo();
}

function checkToDo(e){
  var parentElement = e.parentElement;
  parentElement.style.textDecoration = 'line-through';
  parentElement.querySelector('input').setAttribute('onclick', 'undoToDo(this)');
  doneList.appendChild(parentElement);
  parentElement.querySelector('label').setAttribute('onclick', 'openEditToDo(this)');
  countDone();
  countToDo();
}

function undoToDo(e){
  var parentElement = e.parentElement;
  parentElement.style.textDecoration = 'none';
  parentElement.querySelector('input').setAttribute('onclick', 'checkToDo(this)');
  toDoList.insertBefore(parentElement, toDoList.childNodes[0]);
  countToDo();
  countDone();
}

// Edit Modal Functions

function openEditToDo(e){
  currentToDo = e.parentElement;
  currentToDoLabel = currentToDo.querySelector('label').innerHTML;

  alertBoxToDoName.innerHTML = currentToDoLabel;
  alertBoxInput.focus();

  alertBox.style.display = 'block';
}
function closeEditToDo(){
  alertBox.style.display = 'none';
  alertBoxInput.value = '';
  alertBoxStatus.innerHTML = '';
  alertBoxStatus.style.color = '';
}

function editToDo(){
  if(alertBoxInput.value){
    currentToDo.querySelector('label').innerHTML = alertBoxInput.value;
    closeEditToDo();
  }else{
    alertBoxStatus.innerHTML = 'Please enter a new name before saving.';
    alertBoxStatus.style.color = 'red';
  }
}
