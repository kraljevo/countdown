import React, { Component } from 'react';
import './customers.css';

class Customers extends Component {
  constructor() {
    super();
    this.state = {
      eventDate: undefined,
      eventTime: undefined
    };
  }
  
  handleSubmit = event => {
    event.preventDefault();
    console.log('Handling submit...');
    let userInput = {
        eventDate: event.target.eventdate.value,
        eventTime: event.target.eventtime.value
    };
    
    fetch('/api/eventData', {
      method: 'POST',
      body: JSON.stringify(userInput),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .then(response => console.log('Success: ', response))
    .catch(error => console.error('Error: ', error))

    this.setState({
      eventDate: event.target.eventdate.value,
      eventTime: event.target.eventtime.value
    });

    document.getElementById("event-form").reset();
  }

  componentDidMount() {
    fetch('/api/eventData')
      .then(res => res.json())
      .then(eventData => this.setState({eventData}, () => console.log('Event data fetched...', eventData)));
  }

  render() {
    return (
      <div>
        <h2>Event Information</h2>
          <form id="event-form" onSubmit={this.handleSubmit}>
            <div>
              <div>Event Date:</div>
              <input type="date" name="eventdate" />
            </div>
            <div>
              <div>Event Time:</div>
              <input type="time" name="eventtime"/>
            </div>
            <div>
              <input type="submit" value="Save Changes" />
            </div>
          </form>
          <div>
            <h2>Time Remaining</h2>
            <div id="remaining">
              <h3>Years,</h3>
              <h3>Months,</h3>
              <h3>Days,</h3>
              <h3>Hours,</h3>
              <h3>Minutes,</h3>
              <h3>Seconds.</h3>
            </div>
          </div>
      </div>
    );
  }
}

export default Customers;
