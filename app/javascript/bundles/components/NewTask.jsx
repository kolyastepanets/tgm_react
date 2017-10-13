import PropTypes from 'prop-types';
import React from 'react';

export default class NewTask extends React.Component {
  static propTypes = {
    title: PropTypes.string, // this is passed from the Rails view
  };

  constructor(props) {
    super(props);

    this.state = {
      title: this.props.title,
      serviceTypes: [],
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
      success:(response) => {
        this.addTaskToList(response);
      }
    });
  }

  addTaskToList() {
    $('#new-task').addClass('hidden');
  }

  render() {
    let serviceTypes = this.state.serviceTypes.map((type, index) => {
      return (
        <div key={index} className='task__service-type'>
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
              <p className="modal-title new-task-modal__subtitle" onClick={this.createTask}>New task</p>
              <div id="modal-task-address"></div>
              <button className='btn btn-primary'>CREATE TASK</button>
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