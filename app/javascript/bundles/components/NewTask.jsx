import PropTypes from 'prop-types';
import React from 'react';
import Services from './Services.jsx';

export default class NewTask extends React.Component {
  static propTypes = {
    title: PropTypes.string, // this is passed from the Rails view
  };

  constructor(props) {
    super(props);

    this.createTask = this.createTask.bind(this);
    this.assignServiceId = this.assignServiceId.bind(this);

    this.state = {
      title: this.props.title,
      serviceTypes: [],
      services: [],
      serviceId: '',
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
    $.getJSON('/api/v1/services/types.json', (response) => {
      this.setState({ serviceTypes: response })
    })
  }

  createTask() {
    $.ajax({
      url: '/api/v1/tasks',
      type: 'POST',
      data: {
        task: {
          title: this.refs.title.value,
          service_id: this.state.serviceId
        }
      },
      success:(response) => {
        this.props.handleSubmit(response);
      }
    });
  }

  loadServices(type) {
    $.ajax({
      url: '/api/v1/services.json',
      type: 'GET',
      data: {
        type: type
      },
      success:(response) => {
        this.setState({ services: response })
      }
    });
  }

  assignServiceId(id) {
    this.setState({ serviceId: id })
  }

  render() {
    let serviceTypes = this.state.serviceTypes.map((type, index) => {
      return (
        <div key={index} className='task__service-type' onClick={()=>{this.loadServices(type)}}>
          <div>
            <img src={this.state.referenceToImages[type]} />
          </div>
          <p className='task__service-type-name'> {type} </p>
        </div>
      )
    })

    return (
      <div id="new-task" className='hidden'>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <p className="modal-title new-task-modal__subtitle">New task</p>
              <div id="modal-task-address"></div>
              <button className='btn btn-primary' onClick={this.createTask}>CREATE TASK</button>
            </div>
            <div className="modal-body">
              <div className="task__form-info">
                <p className="new-task-modal__subtitle">location</p>
                <p className="new-task-modal__address"></p>
              </div>

              <div className="task__form-info">
                <p className="new-task-modal__subtitle">service type</p>
                <div id='task-services'> {serviceTypes} </div>
              </div>

              <div className="task__form-info" id='task-services'>
                <Services services={this.state.services} handleSelectedService={this.assignServiceId}/>
              </div>

              <div className="task__form-info">
                <p className="new-task-modal__subtitle">task description</p>
                <div className="task-description"></div>
                <input ref='title' placeholder='Enter a description' id='task-input-description' />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
