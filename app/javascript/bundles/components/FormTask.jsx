import PropTypes from 'prop-types';
import React from 'react';
import Services from './Services.jsx';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as TaskActions from '../actions/taskActions';
import * as ServiceActions from '../actions/serviceActions';

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

  componentDidMount() {
    this.props.actions.setServiceId(this.props.tasksContainer.task.service.id);
  }

  manageTask() {
    if (this.isTaskPresent()) {
      this.props.actions.updateTask(this.props.tasksContainer.task.id,
                                    this.props.servicesContainer.serviceId,
                                    this.refs.title.value);
    } else {
      this.props.actions.createTask(this.props.servicesContainer.serviceId,
                                    this.refs.title.value);
    }
  }

  isTaskPresent() {
    return this.props.tasksContainer.task.id
  }

  buttonText() {
    return (this.isTaskPresent() ? 'UPDATE TASK' : 'CREATE TASK')
  }

  loadServices(type) {
    this.addActiveClass(type);
    this.props.actions.loadServices(type);
  }

  addActiveClass(type) {
    $(".active-type-service").removeClass('active-type-service')
    $(`[data-type-name="${type}"] div`).addClass('active-type-service');
  }

  render() {
    let { title, service } = this.props.tasksContainer.task;

    let serviceTypes = this.props.servicesContainer.serviceTypes.map((type, index) => {
      return (
        <div key={index} className='task__service-type'
                         onClick={()=>{this.loadServices(type)}} data-type-name={type}>
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
              <button className='btn btn-primary'
                      onClick={()=>{this.manageTask()}}>{this.buttonText()}</button>
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
              <Services services={this.props.servicesContainer.services}
                        task={this.props.tasksContainer.task} />
              </div>

              <div className='task__form-info'>
                <p className='new-task-modal__subtitle'>task description</p>
                <div className='task-description'></div>
                <div key={this.props.tasksContainer.task.id}>
                  <input type="text"
                         ref='title'
                         defaultValue={title}
                         placeholder='Enter a description'
                         id='task-input-description'/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  tasksContainer: state.task,
  servicesContainer: state.service
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({...TaskActions, ...ServiceActions }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(FormTask)

