import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as actions from '../actions/serviceActions';
import $ from 'jquery';

class Services extends React.Component {
  selectService(service, event) {
    this.makeActive(event);
    this.props.serviceActions.setServiceId(service.id);
  }

  makeActive(event) {
    $('.service-name').removeClass('active-service');
    $(event.currentTarget).addClass('active-service');
  }

  getClassName(service) {
    let activeClass = '';
    if (this.props.task.service && this.props.task.service.name == service.name) {
      activeClass = ' active-service'
    }

    return (
      'service-name' + activeClass
    )
  }

  render() {
    let services
    let title
    let errors

    if (this.props.errors.length) {
      errors = this.props.errors.map((error, index) => {
        return (
          <div key={index} className='service-errors'>
            <p>{error}</p>
          </div>
        )
      })
    }

    if (this.props.services.length > 0) {
      title = <p className="new-task-modal__subtitle">{this.props.services[0].classification} tasks</p>

      services = this.props.services.map((service, index) => {
        return (
          <div key={index}>
            <p className={this.getClassName(service)}
               onClick={this.selectService.bind(this, service)}>{service.name}</p>
          </div>
        )
      })
    } else {
      services = <p>There are no services</p>
    }

    return (
      <div>
        {title}
        {services}
        {errors}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  serviceActions: bindActionCreators(actions, dispatch)
});

export default connect(null, mapDispatchToProps)(Services)
