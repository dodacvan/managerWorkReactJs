import React, { Component } from 'react';

class TaskForm extends Component {
  constructor(props) {
    super(props);
    var defaultStatus = 1;
    var task = {
        id : '',
        name : '',
        status : defaultStatus
    };
    this.state = {
      addTask : task,
    };
    this.onHandleChange = this.onHandleChange.bind(this);
    this.onClear = this.onClear.bind(this);
  }

  componentWillMount(){
    if(this.props.task) {
      this.setState({
        addTask : this.props.task,
        lastTask : { // lastTask : this.props.task ko hoat dong nhu y muon
          // khi thay doi taskInput cap nhap addTask no cung thay doi luon lastTask
          id : this.props.task.id,
          name : this.props.task.name,
          status : this.props.task.status,
        }
      });
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.task) {
      this.setState({
        addTask : nextProps.task,
        lastTask : {// lastTask : nextProps.task ko hoat dong nhu y muon
          // khi thay doi taskInput cap nhap addTask no cung thay doi luon lastTask
          id : nextProps.task.id,
          name : nextProps.task.name,
          status : nextProps.task.status,
        }
      });
    }
    
  }

  onHandleChange(events) {
    var target = events.target;
    var name = target.name;
    var value = target.value;
    var addTask = this.state.addTask;
    addTask[name] = value;
    this.setState({
      addTask : addTask
    });
    console.log(this.state.lastTask.name)
  }

  onClear() {
    this.setState({
        addTask : this.state.lastTask
    });
  }

	render() {
		return (
        <div className="panel panel-warning">
          <div className="panel-heading">
            <h3 className="panel-title">{this.state.addTask.id ? 'Sửa Công Việc' : 'Thêm Công Việc'} <button type="button" className="close" onClick={this.props.enableFormTask}>&times;</button></h3>
          </div>
          <div className="panel-body">
            <form onSubmit = { (events) => this.props.onSubmitForm(this.state.addTask, events) }>
              <div className="form-group">
                <label>Tên :</label>
                <input type="text" className="form-control"  name = "name" onChange = { this.onHandleChange } value = {this.state.addTask.name}/>
              </div>
              <label>Trạng Thái :</label>
              <select className="form-control" required="required" onChange = { this.onHandleChange } name = "status" value = {this.state.addTask.status}>
                <option value={1}>Kích Hoạt</option>
                <option value={0}>Ẩn</option>
              </select>
              <br />
              <div className="text-center">
                <button type="submit" className="btn btn-warning" >{this.state.addTask.id ? 'Sửa' : 'Thêm'}</button>&nbsp;
                <button type="reset" className="btn btn-danger" onClick = { this.onClear }>Hủy Bỏ</button>
              </div>
            </form>
          </div>
        </div>
		  );
  	}
}

export default TaskForm;
