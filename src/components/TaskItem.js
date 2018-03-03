import React, { Component } from 'react';

class TaskItem extends Component {
  renderStatus() {
   /* var {id, name} = this.props;*/
    var result = '';
    if (this.props.status === 1) {
      result = 'Kich hoat';
    } else if (this.props.status === 0) {
      result = 'An';
    } else {
      result = 'Tat ca';
    }
    return result;
  }

	render() {
		return (
      <tr>
        <td>{this.props.id}</td>
        <td>{this.props.name}</td>
        <td className="text-center">
          <button className={ this.props.status === 1 ? 'btn btn-danger' : 'btn btn-success' } onClick = {() => this.props.changeStatusTask(this.props.id)}>
            { this.renderStatus() }
          </button>
        </td>
        <td className="text-center">
          <button type="button" className="btn btn-warning" onClick = {() => this.props.onUpdateTask(this.props.id)}>
            <span className="fa fa-pencil mr-5" />Sửa
          </button>
          &nbsp;
          <button type="button" className="btn btn-danger" onClick = {() => this.props.deleteTask(this.props.id)}>
            <span className="fa fa-trash mr-5" />Xóa
          </button>
        </td>
      </tr>
		  );
  	}
}

export default TaskItem;