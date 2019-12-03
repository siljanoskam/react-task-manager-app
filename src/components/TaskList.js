import React from 'react';
import '../TaskList.css';

class TaskList extends React.Component {
  constructor(props) {
    super(props);

    this.displayTask = this.displayTask.bind(this);
    this.finishTask = this.finishTask.bind(this);
  }

  displayTask(task) {
    return <li
      className={`font-weight-bold ${task.completed ? 'strikethrough' : ''}`}
      key={`${task.id}`}
      onClick={this.finishTask}
      title="Click to finish this task"
      id={task.id}
    >
      {task.title}
    </li>
  };

  updateTaskStatus(selectedTask) {
    return fetch(`https://jsonplaceholder.typicode.com/todos/${selectedTask.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        completed: true
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(() => {
        selectedTask.classList.add('strikethrough')
      })
      .catch(console.error);
  };

  finishTask(event) {
    const selectedTask = event.currentTarget;
    this.updateTaskStatus(selectedTask);
  };

  render() {
    return <div className="card card-body bg-info mb-2">
      <ul className="task-list text-white">
        {
          this.props.items.length !== 0 ?
            this.props.items.map(this.displayTask) :
            <label className="font-weight-bold">You have no tasks at the moment!</label>
        }
      </ul>
    </div>
  }
}

export default TaskList;
