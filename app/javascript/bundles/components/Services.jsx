import React from 'react';

export default class Services extends React.Component {
  selectService(service, event) {
    this.makeActive(event);
    this.props.handleSelectedService(service.id);
  }

  makeActive(event) {
    $('.service-name').removeClass('active-service');
    $(event.currentTarget).addClass('active-service');
  }

  getClassName(service) {
    let activeClass = this.props.task.service.name == service.name ? ' active-service' : ''
    return (
      'service-name' + activeClass
    )
  }

  render() {
    let services
    let title

    if (this.props.services.length > 0) {
      title = <p className="new-task-modal__subtitle">{this.props.services[0].classification} tasks</p>

      services = this.props.services.map((service, index) => {
        return (
          <div key={index}>
            <p className={this.getClassName(service)} onClick={this.selectService.bind(this, service)}>{service.name}</p>
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
        <div className='service-errors hidden'></div>
      </div>
    );
  }
}
