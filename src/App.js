import React from 'react';
import './App.css';
import TaskList from "./components/TaskList";
import Loader from "./components/Loader";

const userId = 1; // We'll be using a const ID for the data fetches (for testing purposes)
const isTodoCompleted = false; // The Todos will be uncompleted by default

class TaskApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      task: '',
      isLoaderHidden: true
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.addTask = this.addTask.bind(this);
    this.fetchTaskAdd = this.fetchTaskAdd.bind(this);
    this.showLoader = this.showLoader.bind(this);
    this.hideLoader = this.hideLoader.bind(this);
  }

  componentDidMount() {
    this.showLoader();
    this.fetchTasks();
  }

  showLoader() {
    this.setState({isLoaderHidden: false});
  };

  hideLoader() {
    this.setState({isLoaderHidden: true});
  };

  fetchTasks() {
    return fetch('https://jsonplaceholder.typicode.com/todos?userId=1')
      .then(response => response.json())
      .then((tasks) => {
        this.setState({items: tasks});
      })
      .then(this.hideLoader)
      .catch(console.log);
  }

  fetchTaskAdd() {
    return fetch('https://jsonplaceholder.typicode.com/todos', {
      method: 'POST',
      body: JSON.stringify({
        userId: userId,
        title: this.state.task,
        completed: isTodoCompleted
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(response => response.json())
      .then((task) => {
        this.setState({
          items: this.state.items.concat(task)
        });
      })
      .then(this.hideLoader)
      .catch(console.log);
  };

  addTask(event) {
    event.preventDefault();

    const taskInput = document.getElementById('task-input');

    if (this.state.task) {
      this.showLoader();
      this.fetchTaskAdd();

      this.setState({
        task: ''
      });
    } else {
      alert('The task cannot be empty. Please enter a task.')
    }

    taskInput.focus();
  }

  onInputChange(event) {
    this.setState({task: event.target.value})
  }

  render() {
    return (
      <div className="task-app container-fluid">
        <div className="container p-5">
          <h1>My tasks</h1>

          <Loader isLoaderHidden={this.state.isLoaderHidden}/>

          <form className="form-inline mb-5 mt-5" onSubmit={this.addTask}>
            <input
              id="task-input"
              placeholder="Enter your task here..."
              className="form-control"
              onChange={this.onInputChange}
              value={this.state.task}
              autoComplete="off"
            />
            <button className="btn btn-info ml-1 font-weight-bold">
              Add Task
            </button>
          </form>

          <TaskList items={this.state.items}/>
        </div>
      </div>
    );
  }
}

export default TaskApp;
