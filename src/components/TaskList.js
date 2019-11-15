import React from 'react';

class TaskList extends React.Component {
  constructor(props) {
    super(props);

    this.displayTask = this.displayTask.bind(this);
  }

  displayTask(task) {
    return <li
      className="font-weight-bold"
      key={`${task.id}`}
      onClick={this.finishTask}
      title="Click to finish this task"
    >
      {task.title}
    </li>
  };

  finishTask(event) {
    event.target.classList.add('strikethrough');
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
