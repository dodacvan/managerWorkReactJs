import React, { Component } from 'react';
import TaskItem from './TaskItem';

class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterName : '',
      filterStatus : -1, // -1 la tat ca, active la 1, an la 0
    }
  }
  onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.props.onFilter(name === 'filterName' ? value : this.state.filterName,
    name === 'filterStatus' ? value : this.state.filterStatus);
    this.setState({
        [name] : value,
    });
    //this.props.onFilter(this.state.filterName, this.state.filterStatus); // neu nhu the nay se ko dong bo this.state co the empty
    // cach 2 la goi trong call back la chac chan nhat
    // this.setState({
     //   [name] : value,
    //}, () => {
    //  this.props.onFilter(this.state.filterName,this.state.filterStatus);
    //});
  }

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
    var {filterName, filterStatus} = this.state;
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
              <input type="text" className="form-control" name="filterName" value = {filterName} onChange = {this.onChange}/>
            </td>
            <td>
              <select className="form-control" name="filterStatus" value = {filterStatus} onChange = {this.onChange}>
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