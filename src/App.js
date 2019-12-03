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
      task: ''
    };

    this.taskInput = React.createRef();
    this.loaderInstance = React.createRef();

    this.onInputChange = this.onInputChange.bind(this);
    this.addTask = this.addTask.bind(this);
    this.storeTask = this.storeTask.bind(this);
  }

  componentDidMount() {
    this.handleLoader(true);
    this.fetchTasks();
  }

  handleLoader(status = false) {
    this.loaderInstance.current.updateLoaderVisibility(status);
  }

  fetchTasks() {
    return fetch(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`)
      .then(response => response.json())
      .then((tasks) => {
        this.setState({items: tasks});
      })
      .then(() => {
        this.handleLoader(false)
      })
      .catch(console.error);
  }

  storeTask() {
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
      .then(() => {
        this.handleLoader(false)
      })
      .catch(console.error);
  };

  addTask(event) {
    event.preventDefault();

    if (this.state.task) {
      this.handleLoader(true);
      this.storeTask();

      this.setState({
        task: ''
      });
    } else {
      alert('The task cannot be empty. Please enter a task.')
    }

    this.taskInput.current.focus();
  }

  onInputChange(event) {
    this.setState({task: event.target.value})
  }

  render() {
    return (
      <div className="task-app container-fluid">
        <div className="container p-5">
          <h1>My tasks</h1>

          <Loader ref={this.loaderInstance}/>

          <form className="form-inline mb-5 mt-5" onSubmit={this.addTask}>
            <input
              id="task-input"
              placeholder="Enter your task here..."
              className="form-control"
              onChange={this.onInputChange}
              value={this.state.task}
              autoComplete="off"
              ref={this.taskInput}
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
