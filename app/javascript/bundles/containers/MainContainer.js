import React from 'react';
import { connect } from 'react-redux';
import ListTasks from '../components/ListTasks.jsx';
import NewTask from '../components/NewTask.jsx';
import * as actions from '../actions/taskActions';

const mapStateToProps = (state) => ({tasks: state.tasks});

class Body extends React.Component {
  componentDidMount() {
    this.props.loadTasks();
  }

  render() {
    return (
      <div>
        <NewTask />
        <ListTasks tasks={this.props.tasks} />
      </div>
    )
  }
}

export default connect(mapStateToProps, actions)(Body);
