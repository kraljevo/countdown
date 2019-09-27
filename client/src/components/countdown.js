import React, { Component } from 'react';
import './countdown.css';

class Countdown extends Component {
  constructor() {
    super();
    this.state = {
      eventDate: new Date(),
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    };
  }
  
  handleSubmit = event => {
    event.preventDefault();
    console.log('Handling submit...');
    let dateThen = new Date(event.target.eventdate.value);
    let dateNow = new Date();

    if(dateThen < dateNow){
      alert('Please choose an event in the future.')
    } else {
      fetch('/api/eventData', {
        method: 'POST',
        body: JSON.stringify(dateThen),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json(dateThen))
      .catch(error => console.error('Error: ', error))

      let distance = dateThen - dateNow;

      let days = Math.floor(distance / (1000 * 60 * 60 * 24));
      let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);

      this.setState({
        eventDate: dateThen,
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds
      });
    }
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
              <input type="datetime-local" name="eventdate" />
            </div>
            <div>
              <input type="submit" value="Set Event" class="button" />
            </div>
          </form>
          <div class="timer">
            <h2>Time Remaining</h2>
            <div id="remaining">
              <h3>{this.state.days} Days, {this.state.hours} Hours, {this.state.minutes} Minutes, and {this.state.seconds} Seconds.</h3>
            </div>
          </div>
      </div>
    );
  }
}

export default Countdown;
