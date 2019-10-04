import React, { Component } from 'react';
import './countdown.css';

class Countdown extends Component {
  constructor() {
    super();
    this.state = {
      timer: "closed",
      eventDate: undefined,
      years: 0,
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
      this.setState({eventDate: dateThen});
      this.timeCalc();

      fetch('/api/eventData', {
        method: 'POST',
        body: JSON.stringify({
          eventDate: dateThen
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => console.log(res))
      .catch(error => console.error('Error: ', error))
    }
  }

  timeCalc = () => {
    if(this.state.eventDate){
      let dateThen = this.state.eventDate;
      let dateNow = new Date();
      let distance = dateThen - dateNow;
  
      let years = Math.floor(distance / (1000 * 60 * 60 * 24 * 365))
      let days = Math.floor((distance % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24));
      let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
      if(seconds !== -1){
        this.setState({
        timer: "open",
        years: years,
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds
      })};
    }
  }

  componentDidMount() {
    setInterval(this.timeCalc, 1000);
    fetch('/api/eventData')
      .then(res => res.json())
      .then(eventData => this.setState({eventData}, () => console.log('Event data fetched...', eventData)));
  }

  render() {
    return (
      <div>
        <h2>Event Date and Time</h2>
          <form id="event-form" onSubmit={this.handleSubmit}>
            <div>
              <input type="datetime-local" name="eventdate" />
            </div>
            <div>
              <input type="submit" value="Set Event" className="button" />
            </div>
          </form>
          <div id={this.state.timer}>
            <h2>Time Remaining</h2>
            <div id="remaining">
              <h3>{this.state.years} years, {this.state.days} days, {this.state.hours} hours, {this.state.minutes} minutes, and {this.state.seconds} seconds.</h3>
            </div>
          </div>
      </div>
    );
  }
}

export default Countdown;
