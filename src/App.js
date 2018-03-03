import React, { Component } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import Control from './components/Control';
import TaskList from './components/TaskList';
import _ from 'lodash';

class App extends Component {
  constructor(props) {
    super(props);
    /*this.state = {
      tasks : localStorage.getItem('tasks')
    };*/
    this.state = {
      tasks : [],
      enableFormTask : false,
      taskEdit : null,
      filter :{
        name : '',
        status : -1,
      },
      keyword : '',
      sortBy : 'name',
      sortValue : 1, // 1 la tang dan . -1 la gian dan
    };
    this.onGenerateDate = this.onGenerateDate.bind(this);
    this.setStateFormTask = this.setStateFormTask.bind(this);
    this.onHandleSubmitTaskForm = this.onHandleSubmitTaskForm.bind(this);
    this.onDeleteTask = this.onDeleteTask.bind(this);
    this.onUpdateTask = this.onUpdateTask.bind(this);
    
  }

  componentWillMount() {
    if (localStorage && localStorage.getItem('tasks')) {
      var tasks = JSON.parse(localStorage.getItem('tasks'));
      this.setState({
        tasks : tasks
      });
    }
  }

  onGenerateDate() {
    var tasks =  [
        {
          id : this.generateID(),
          name : "First Task",
          status : 1
        },
        {
          id : this.generateID(),
          name : "Second Task",
          status : 0
        }
    ];
    this.setState({
      tasks : tasks
    });
      
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  setStateFormTask() {
      this.setState({
        enableFormTask : !this.state.enableFormTask,
        taskEdit : null
      });
   }

   onOpenForm() {
      this.setState({
        enableFormTask : true
      });
   }

  generateID() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
  }

  onHandleSubmitTaskForm(data, event) {
    event.preventDefault();
    var tasks = this.state.tasks;
    if(data.id){
      var index = this.findTaskById(data.id);
      tasks[index] = data;
    } else {
      data.id = this.generateID();
      tasks.push(data);
    }
    
    this.setState({
      tasks : tasks,
      taskEdit : null
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
    this.setStateFormTask();
  }

  onChangeStatusTask(data) {
    var {tasks} = this.state;
    var index = this.findTaskById(data);
    if (index !== -1) {
      tasks[index].status = this.changeStatusTask(tasks[index].status);
    }
    
    this.setState({
      tasks : tasks
    });
      
    localStorage.setItem('tasks', JSON.stringify(tasks));   
  }

  changeStatusTask(status) {
    if(status === 1) {
      return 0;
    }
    return 1;
  }

  findTaskById(id) {
    var {tasks} = this.state;
    var result = -1;
    tasks.forEach((task, index) => {
      if(task.id === id) {
        result = index;
      }
    });
    return result;
  }

  onDeleteTask(id) {
    var {tasks} = this.state;
    var index = this.findTaskById(id);
    if (index > -1) {
        tasks.splice(index, 1);
    }
    this.setState({
      tasks : tasks
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    if (this.state.enableFormTask) {
      this.setStateFormTask();
    }
  }

  onUpdateTask(id) {
    var {tasks} = this.state;
    //var index = this.findTaskById(id); // cach binh thuong
    var  index = _.findIndex(tasks, (task) => { // su dung lodash
        return task.id === id;
    });
    this.setState({
      taskEdit : tasks[index]
    });
    this.onOpenForm();
  }

  onFilter = (filterName, filterStatus) => {
      filterStatus = parseInt(filterStatus, 10);// convert string to number
      this.setState({
        filter : {
          name : filterName,
          status: filterStatus
        }
      });
  }

  onSearch = (keyword) => {
    this.setState({
      keyword : keyword
    });
  }

  onSort = (sortBy, sortValue) => {
    this.setState({
        sortBy: sortBy,
        sortValue : sortValue
    });
  }

  render() {
    var { tasks, taskEdit, filter, keyword, sortBy, sortValue } = this.state;  // var tasks = this.state.tasks;
    if (filter) {
      console.log(filter.name);
       if(filter.name) {
         tasks = tasks.filter((task) => {
             return task.name.toLowerCase().indexOf(filter.name) !== -1;
         });
       }
      
       if(filter.status === 0 || filter.status === 1) {
         tasks = tasks.filter((task) => {
             return task.status === filter.status;
         });
       }
    }
    if(keyword){
      tasks = tasks.filter((task) => {
         return Object.keys(task).some((element) => {
            return task[element].toString().toLowerCase().indexOf(keyword) !== -1;
         });
     });
    }

    
    if (sortBy === 'name') {
        tasks.sort((a, b) => {
            if (a.name > b.name) return sortValue;
            else if (a.name < b.name) return -sortValue;
            return 0;
        });
    } else {
        tasks.sort((a, b) => {
            if (a.status > b.status) return sortValue;
            else if (a.status < b.status) return -sortValue;
            return 0;
        });
    }
    var element = this.state.enableFormTask === true ? <TaskForm enableFormTask = {this.setStateFormTask} 
    onSubmitForm = { this.onHandleSubmitTaskForm } task = {taskEdit}></TaskForm> : '';
    return (
      <div className="container">
        <div className="text-center">
          <h1>Quản Lý Công Việc</h1>
          <hr />
        </div>
        <div className="row">
          <div className={this.state.enableFormTask ? "col-xs-4 col-sm-4 col-md-4 col-lg-4" : ""}>
             { element }
          </div>
          <div className= {this.state.enableFormTask ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" : "col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
            <button type="button" className="btn btn-primary" onClick = {this.setStateFormTask}>
              <span className="fa fa-plus mr-5" />Thêm Công Việc
            </button>
            <button type="button" className="btn btn-danger" onClick = { this.onGenerateDate }>
              <span className="fa fa-plus mr-5" />Tao du lieu mau
            </button>
            <Control onSearch = {this.onSearch} onSort = {this.onSort}></Control>
            <div className="row mt-15">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <TaskList 
                tasks = {tasks} 
                changeStatusTask = { (data) => this.onChangeStatusTask(data) } 
                deleteTask = { this.onDeleteTask }
                onUpdateTask = { this.onUpdateTask }
                onFilter = {this.onFilter}
                ></TaskList>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
