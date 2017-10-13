import React from 'react';

export default class Services extends React.Component {
  selectService(id) {
    this.props.handleSelectedService(id);
  }

  render() {
    let services
    let title

    if (this.props.services.length > 0) {
      title = <p className="new-task-modal__subtitle">{this.props.services[0].classification} tasks</p>

      services = this.props.services.map((service, index) => {
        return (
          <div key={index}>
            <p className="service-name" onClick={()=>{this.selectService(service.id)}}>{service.name}</p>
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
      </div>
    );
  }
}
