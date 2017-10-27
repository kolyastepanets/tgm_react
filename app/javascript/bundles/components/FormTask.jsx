import PropTypes from 'prop-types';
import React from 'react';
import Services from './Services.jsx';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as actions from '../actions/taskActions';

class FormTask extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      referenceToImages: {
        'cook': require('./../../../assets/images/cook.svg'),
        'electrician': require('./../../../assets/images/electrician.svg'),
        'gardener': require('./../../../assets/images/gardener.svg'),
        'housekeeper': require('./../../../assets/images/housekeeper.svg'),
        'plumber': require('./../../../assets/images/plumber.svg'),
        'pointer': require('./../../../assets/images/pointer.svg')
      }
    };
  }

  manageTask() {
    if (this.props.task.title) {
      this.props.taskActions.updateTask(this.props.task.id, this.refs.title.value);
    } else {
      // create
    }
  }

  render() {
    let { title, service } = this.props.task;

    let serviceTypes = this.props.serviceTypes.map((type, index) => {
      return (
        <div key={index} className='task__service-type' onClick={()=>{this.loadServices(type)}} data-type-name={type}>
          <div>
            <img src={this.state.referenceToImages[type]} />
          </div>
          <p className='task__service-type-name'> {type} </p>
        </div>
      )
    })

    return (
      <div id='new-task' className='hidden'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <p className='modal-title new-task-modal__subtitle'>New task</p>
              <div id='modal-task-address'></div>
              <button className='btn btn-primary' onClick={()=>{this.manageTask()}}>{this.props.task.title ? 'UPDATE TASK' : 'CREATE TASK'}</button>
            </div>
            <div className='modal-body'>
              <div className='task__form-info'>
                <p className='new-task-modal__subtitle'>location</p>
                <p className='new-task-modal__address'></p>
              </div>

              <div className='task__form-info'>
                <p className='new-task-modal__subtitle'>service type</p>
                <div id='task-services'> {serviceTypes} </div>
              </div>

              <div className='task__form-info' id='task-services'>
              <Services services={this.props.services} task={this.props.task} />
              </div>

              <div className='task__form-info'>
                <p className='new-task-modal__subtitle'>task description</p>
                <div className='task-description'></div>
                <div key={this.props.task.id}>
                  <input type="text" ref='title' defaultValue={title} placeholder='Enter a description' id='task-input-description'/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  taskActions: bindActionCreators(actions, dispatch)
});

export default connect(null, mapDispatchToProps)(FormTask)

