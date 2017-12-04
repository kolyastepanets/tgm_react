import React from 'react';

class Services extends React.Component {
  selectService(id) {
    this.props.setServiceId(id);
  }

  isActive(id) {
    return this.props.serviceId === id
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

      services = this.props.services.map((service) => {
        return (
          <div key={service.id}>
            <p className={this.isActive(service.id) ? 'service-name active-service' : 'service-name'}
               onClick={()=>{this.selectService(service.id)}}>{service.name}</p>
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

export default Services;
