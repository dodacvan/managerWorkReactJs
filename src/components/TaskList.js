import React, { Component } from 'react';
import TaskItem from './TaskItem';

class TaskList extends Component {
  showTaskItems() {
    var elements = this.props.tasks.map((task, index) => {
      var result = <TaskItem 
      id ={task.id} 
      name = {task.name} 
      status = {task.status} 
      key={index} 
      changeStatusTask = { this.props.changeStatusTask } 
      deleteTask = {this.props.deleteTask} 
      onUpdateTask = {this.props.onUpdateTask}></TaskItem>;
      return result;
    });
    return elements;
  }

	render() {
		return (
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th className="text-center">STT</th>
            <th className="text-center">Tên</th>
            <th className="text-center">Trạng Thái</th>
            <th className="text-center">Hành Động</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td />
            <td>
              <input type="text" className="form-control" />
            </td>
            <td>
              <select className="form-control">
                <option value={-1}>Tất Cả</option>
                <option value={0}>Ẩn</option>
                <option value={1}>Kích Hoạt</option>
              </select>
            </td>
            <td />
          </tr>
          { this.showTaskItems() }
        </tbody>
      </table>
		  );
  	}
}

export default TaskList;