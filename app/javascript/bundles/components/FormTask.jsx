import PropTypes from 'prop-types';
import React from 'react';
import Services from './Services';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as TaskActions from '../actions/taskActions';
import * as ServiceActions from '../actions/serviceActions';
import $ from 'jquery';
import Toastr from 'toastr';

class FormTask extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      address: '',
      activeServiceType: this.props.tasksContainer.task.service.classification,
      activeServiceId: this.props.tasksContainer.task.service.id,
      geocoder: new google.maps.Geocoder(),
      markerImage: 'https://res.cloudinary.com/djnzkhyxr/image/upload/v1498079839/pointer_iw70le.png',
      title: this.props.tasksContainer.task.title,
      latitude: this.props.tasksContainer.task.latitude,
      longtitude: this.props.tasksContainer.task.longtitude,
      serviceTypes: ['electrician', 'plumber', 'gardener', 'housekeeper', 'cook'],
      referenceToImages: {
        'cook': require('./../../../assets/images/cook.svg'),
        'plumber': require('./../../../assets/images/plumber.svg'),
        'pointer': require('./../../../assets/images/pointer.svg'),
        'gardener': require('./../../../assets/images/gardener.svg'),
        'electrician': require('./../../../assets/images/electrician.svg'),
        'housekeeper': require('./../../../assets/images/housekeeper.svg')
      }
    };

    this.setServiceId = this.setServiceId.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ title: nextProps.tasksContainer.task.title });

    if (nextProps.tasksContainer.showForm &&
          nextProps.tasksContainer.task.id){
      let position = {
        lat: (nextProps.tasksContainer.task.latitude),
        lng: (nextProps.tasksContainer.task.longtitude)
      }
      this.setState({
        markerExists: true,
        latitude: nextProps.tasksContainer.task.latitude,
        longtitude: nextProps.tasksContainer.task.longtitude
      });
      this.reDrawMarker(position);
    } else if (nextProps.tasksContainer.showForm &&
                !nextProps.tasksContainer.task.id &&
                !this.state.activeServiceId) {
      let position = {
        lat: 48.463819,
        lng: 35.053189
      }
      this.setState({ markerExists: true });
      this.reDrawMarker(position);
    }
  }

  setServiceId(id) {
    this.setState({ activeServiceId: id })
  }

  reDrawMarker(position) {
    let mapOptions = {
      zoom: 15,
      center: position,
      streetViewControl: false,
      mapTypeControl: false
    }

    let map = new google.maps.Map(document.getElementById('map-container'), mapOptions)
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
                                    this.state.activeServiceId,
                                    this.state)
        .then(() => Toastr.success('Successfully updated!'))
        .catch(error => {
          Toastr.error(error);
        });
    } else {
      this.props.actions.createTask(this.state.activeServiceId,
                                    this.state)
        .then(() => Toastr.success('Successfully created!'))
        .catch(error => {
          Toastr.error(error);
        });
    }
  }

  isTaskPresent() {
    return this.props.tasksContainer.task.id
  }

  buttonText() {
    return (this.isTaskPresent() ? 'UPDATE TASK' : 'CREATE TASK')
  }

  loadServices(type) {
    this.props.actions.loadServices(type);
    this.setState({ activeServiceType: type })
  }

  handleChange(value) {
    this.setState({ title: value });
  }

  isActive(type) {
    return this.state.activeServiceType === type;
  }

  render() {
    let serviceTypes = this.state.serviceTypes.map((type, index) => {
      return (
        <div key={index} className='task__service-type'
                         onClick={()=>{this.loadServices(type)}} data-type-name={type}>
          <div className={this.isActive(type) ? 'active-type-service' : ''}>
            <img src={this.state.referenceToImages[type]} />
          </div>
          <p className='task__service-type-name'> {type} </p>
        </div>
      )
    })

    return (
      <div className='form-container'>
        <div id='new-task'>
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
                          errors={this.props.tasksContainer.errors.service}
                          serviceId={this.state.activeServiceId}
                          setServiceId={this.setServiceId} />
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
  servicesContainer: state.service,
  authContainer: state.auth
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({...TaskActions, ...ServiceActions }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(FormTask)
