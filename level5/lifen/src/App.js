import './App.css';

var React = require('react');
var createReactClass = require('create-react-class');

var App = createReactClass({
  getInitialState: function () {
    return (
      {
        workers: {
        },
        shifts: {
        }
      }
    )
  },
  addWorker: function (worker, status) {
    //create a unike key for each
    var timestamp = (new Date()).getTime();
    this.state.workers['worker-' + timestamp] = worker + ' - ' + status;
    // set the state
    this.setState({ workers: this.state.workers });
  },
  addShift: function (day, worker) {
    //create a unike key for each
    var timestamp = (new Date()).getTime();
    this.state.shifts['shift-' + timestamp] = day + ' - ' + worker;
    // set the state
    this.setState({ shifts: this.state.shifts });
  },
  removeWorker: function (workerKey) {
    // update the state object
    delete this.state.workers[workerKey];
    // set the state
    this.setState({ workers: this.state.workers });
  },
  render: function () {
    return (
      <div class="component-wrapper">
        <WorkerList workers={this.state.workers} /><br />
        <AddWorkerForm addWorker={this.addWorker} /><br />
        <RemoveWorkerForm removeWorker={this.removeWorker} workers={this.state.workers} /><br />
        <ShiftList shifts={this.state.shifts} /><br />
        <AddShiftForm addShift={this.addShift} workers={this.state.workers} />
      </div>
    );
  }
});

var WorkerList = createReactClass({
  render: function () {
    return (
      <div className="container">
        <h2 class="text-center">Worker List</h2>
        <ul className="list-group text-center">
          {
            Object.keys(this.props.workers).map(function (key) {
              return <li className="list-group-item list-group-item-info">{this.props.workers[key]} </li>
            }.bind(this))
          }
        </ul>
      </div>
    );
  }
});

var ShiftList = createReactClass({
  render: function () {
    return (
      <div className="container">
        <h2 class="text-center">Shift List</h2>
        <ul className="list-group text-center">
          {
            Object.keys(this.props.shifts).map(function (key) {
              return <li className="list-group-item list-group-item-success">{this.props.shifts[key]} </li>
            }.bind(this))
          }
        </ul>
      </div>
    );
  }
});

var AddWorkerForm = createReactClass({
  createWorker: function (e) {
    e.preventDefault();
    //get the worker object name from the form
    var worker = this.refs.workerName.value;
    var status = this.refs.workerStatus.value;
    //call the addWorker method of the App component
    //to change the state of the worker list by adding an new item
    if (worker.length > 0) {
      this.props.addWorker(worker, status);
    }
    //reset the form
    this.refs.workerForm.reset();
  },
  render: function () {
    return (
      <form className="form-inline" ref="workerForm" onSubmit={this.createWorker}>
        <div className="form-group">
          <label for="workerItem">
            Worker Name:
                    <input type="text" id="workerItem" className="form-control" placeholder="e.x. Jean Dupont" ref="workerName" />
          </label>
          <label for="workerItem2" id="secondLabel">
            Worker Status:
            <select id="workerItem2" className="form-control" ref="workerStatus" >
              <option value="">--Please choose an option--</option>
              <option value="Intern">Intern</option>
              <option value="Medic">Medic</option>
              <option value="Interim">Interim</option>
            </select>
          </label>

        </div>
        <button type="submit" className="btn btn-primary">Add Worker</button>
      </form>
    )

  }
});

var AddShiftForm = createReactClass({
  createShift: function (e) {
    e.preventDefault();
    //get the worker object name from the form
    var day = this.refs.shiftDay.value;
    var worker = this.refs.WorkerShift.value;
    var workerName = this.props.workers[worker];
    //call the addWorker method of the App component
    //to change the state of the worker list by adding an new item
    if (day.length > 0) {
      this.props.addShift(day, workerName);
    }
    //reset the form
    this.refs.shiftForm.reset();
  },
  render: function () {
    return (
      <form className="form-inline" ref="shiftForm" onSubmit={this.createShift}>
        <div className="form-group">
          <label for="shiftItem">
            Shift Day:
                    <input type="text" id="shiftItem" className="form-control" placeholder="e.x. 02-03-2019" ref="shiftDay" />
          </label>
          <label for="selectWorker" id="secondLabel">
            Assign a worker:
                  <select id="selectWorker" className="form-control" ref="WorkerShift">
              <option value="">Choose a worker</option>
              {
                Object.keys(this.props.workers).map(function (key) {
                  return <option value={key}>{this.props.workers[key]}</option>
                }.bind(this))
              }
            </select>
          </label>

        </div>
        <button type="submit" className="btn btn-primary">Add Shift</button>
      </form>
    )

  }
});

var RemoveWorkerForm = createReactClass({
  selectWorkertoRemove: function (e) {
    var worker = e.target.value;
    //get the worker object name from the form
    //call the removeWorker method of the App component
    this.props.removeWorker(worker);
    //reset the form
    this.refs.removeWorkerForm.reset();
  },
  render: function () {
    return (
      <form className="form-inline" ref="removeWorkerForm" onChange={this.selectWorkertoRemove}>
        <div className="form-group">
          <label for="selectWorker">
            Remove a worker:
                  <select id="selectWorker" className="form-control">
              <option value="">--Please choose a worker--</option>
              {
                Object.keys(this.props.workers).map(function (key) {
                  return <option value={key}>{this.props.workers[key]}</option>
                }.bind(this))
              }
            </select>
          </label>
        </div>
      </form>
    )

  }
});

export default App;
