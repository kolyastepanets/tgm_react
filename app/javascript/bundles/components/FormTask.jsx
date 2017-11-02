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
      address: '',
      geocoder: new google.maps.Geocoder(),
      mapDefaultOptions: {
        zoom: 15,
        center: {
          lat: 48.463819,
          lng: 35.053189
        },
        streetViewControl: false,
        mapTypeControl: false
      },
      markers: [],
      markerImage: 'https://res.cloudinary.com/djnzkhyxr/image/upload/v1498079839/pointer_iw70le.png',
      title: this.props.tasksContainer.task.title,
      latitude: this.props.tasksContainer.task.latitude,
      longtitude: this.props.tasksContainer.task.longtitude,
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
    new google.maps.Map(document.getElementById('map-container'), this.state.mapDefaultOptions)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ title: nextProps.tasksContainer.task.title });

    if (nextProps.tasksContainer.showForm && nextProps.tasksContainer.task.id) {
      let position = {
        lat: (nextProps.tasksContainer.task.latitude),
        lng: (nextProps.tasksContainer.task.longtitude)
      }

      this.reDrawMarker(position);
    } else if (nextProps.tasksContainer.showForm &&
                !nextProps.tasksContainer.task.id &&
                !nextProps.servicesContainer.serviceId) {
      let position = {
        lat: 48.463819,
        lng: 35.053189
      }

      this.reDrawMarker(position);
    }
  }

  reDrawMarker(position) {
    let map = new google.maps.Map(document.getElementById('map-container'), this.state.mapDefaultOptions)
    let marker = new google.maps.Marker({
      position: position,
      map: map,
      title: 'Hold and move',
      draggable: true,
      icon: this.state.markerImage
    });

    marker.addListener('dragend', () => {
      this.geocodePosition(marker.getPosition());
    });

    this.geocodePosition(marker.getPosition());
  }

  geocodePosition(position) {
    this.state.geocoder.geocode({
      latLng: position
    }, (responses) => {
      let address = '';
      let location

      if (responses && responses.length > 0) {
        address = responses[0].formatted_address;
        location = responses[0].geometry.location;
      } else {
        return address = 'Cannot determine address at this location.';
      }

      this.setState({
        address: address,
        longtitude: location.lng(),
        latitude: location.lat()
      })
    });
  }

  manageTask() {
    if (this.isTaskPresent()) {
      this.props.actions.updateTask(this.props.tasksContainer.task.id,
                                    this.props.servicesContainer.serviceId,
                                    this.state);
    } else {
      this.props.actions.createTask(this.props.servicesContainer.serviceId,
                                    this.state);
    }
    this.props.actions.setServiceId(null);
    $('.service-name').removeClass('active-service');
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

  handleChange(value) {
    this.setState({ title: value });
  }

  render() {
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
      <div className='form-container'>
        <div id="map-container"></div>

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
                  <p className='new-task-modal__address'>{this.state.address}</p>
                </div>

                <div className='task__form-info'>
                  <p className='new-task-modal__subtitle'>service type</p>
                  <div id='task-services'> {serviceTypes} </div>
                </div>

                <div className='task__form-info' id='task-services'>
                <Services services={this.props.servicesContainer.services}
                          task={this.props.tasksContainer.task}
                          errors={this.props.tasksContainer.errors.service} />
                </div>

                <div className='task__form-info'>
                  <p className='new-task-modal__subtitle'>task description</p>
                  <div className='task-description'></div>
                  <div key={this.props.tasksContainer.task.id}>
                    <input type="text"
                           value={this.state.title}
                           placeholder='Enter a description'
                           id='task-input-description'
                           onChange={(e) => this.handleChange(e.target.value)}/>
                  </div>
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

