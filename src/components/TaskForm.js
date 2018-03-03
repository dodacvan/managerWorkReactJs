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
      lastTask : { 
          id1 : '',
          name1 : '',
          status1 : defaultStatus,
      }
    };
    this.onHandleChange = this.onHandleChange.bind(this);
    this.onClear = this.onClear.bind(this);
    
  }

  componentWillMount(){
    if(this.props.task) {
      this.setState({
        addTask : this.props.task,
        lastTask : {
          id1 : this.props.task.id,
          name1 : this.props.task.name,
          status1 : this.props.task.status,
        }
      });
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.task) {
      this.setState({
        addTask : nextProps.task,
        lastTask : {
          id1 : nextProps.task.id,
          name1 : nextProps.task.name,
          status1 : nextProps.task.status,
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
  }

  onClear() {
    console.log(this.state.lastTask);
    this.setState({
        addTask :  {
          id : this.state.lastTask.id1,
          name : this.state.lastTask.name1,
          status : this.state.lastTask.status1
      }
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
