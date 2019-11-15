import React from 'react';
import './App.css';
import TaskList from "./components/TaskList";

class TaskApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            task: ''
        };

        this.onInputChange = this.onInputChange.bind(this);
        this.addTask = this.addTask.bind(this);
    }

    addTask(event) {
        event.preventDefault();

        const taskInput = document.getElementById('task-input');

        if (this.state.task) {
            if (this.state.items.includes(this.state.task)) {
                alert('The task already exists!');
            } else {
                this.setState({
                    items: this.state.items.concat([this.state.task])
                });
            }

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

                    <TaskList items={this.state.items}/>

                    <form className="form-inline" onSubmit={this.addTask}>
                        <input
                            id="task-input"
                            placeholder="Enter your task here..."
                            className="form-control"
                            onChange={this.onInputChange}
                            value={this.state.task}
                        />
                        <button className="btn btn-info ml-1 font-weight-bold">
                            Add Task
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

export default TaskApp;
