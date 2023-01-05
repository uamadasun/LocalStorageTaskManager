const inputEl = document.querySelector("#input");
const buttonEl = document.querySelector("#delete");
const outputEl = document.querySelector("#list-container");
const form = document.querySelector("form");

//Add task and save into local storage (database built into our browser where we can save data permanently)
//local storage is used for authorization mostly, to save token/sessions/cookies 

// localStorage.setItem('firstName', 'Uchenna');

//Get item
// const result = localStorage.getItem('firstName');

//remove item from local storage
// localStorage.removeItem('firstName');

//Delete task
const removeTask = id => {
  let tasks;

  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks = tasks.filter((task) => {
    return task.id !== +id //+id converts a string to a number
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
  getTasks();
};


//Get all the tasks
const getTasks = () => {
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = []
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  // console.log(tasks);

  //display to DOM
  let output;
  const allTasks = tasks.map((task) => {
    return `
    <li id="item">
            <span>${task.title}</span>
            <button onclick="removeTask('${task.id}')"id="delete">X</button>
          </li> 
    `
  })
  output = allTasks.join("");
  outputEl.innerHTML = output;
};

getTasks();



//Add a new task and save to local storage
const addTask = e => {
  e.preventDefault();
  // console.log(inputEl.value);

  //check if input is empty
  if (inputEl.value === "") {
    alert("Please enter a task");
  }

  //get the item
  const task = inputEl.value;
  if (task) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
      tasks = [];
      console.log(tasks);

    } else {
      // tasks = localStorage.getItem('tasks');
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    //using 'unshift' instead of push adds the task to the top of the list
    tasks.unshift({
      id: Date.now(),
      title: task,
    });

    //Save to local storage
    localStorage.setItem('tasks', JSON.stringify(tasks));

    //empty input
    inputEl.value = "";
  }
  getTasks();
};


//event listener
form.addEventListener('submit', addTask);