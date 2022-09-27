import React, { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';
// import PropTypes from 'prop-types';

export default class Task extends Component {
  // static defaultProps = {
  //   getDate: new Date(),
  // };
  // static propTypes = {
  //   getDate: PropTypes.func.isRequired,
  //   label: PropTypes.string.isRequired,
  //   onDeleted: PropTypes.func.isRequired,
  //   id: PropTypes.string.isRequired,
  //   onToggleCompleted: PropTypes.func.isRequired,
  //   completed: PropTypes.bool.isRequired,
  // };
  tm = this.props.getDate;
  state = {
    date: 0,
    completed: false,
    editing: false,
    time: formatDistanceToNow(this.tm, { includeSeconds: true }),
    min: this.props.minut,
    sec: this.props.second,
  };

  ClickOnEditing = () => {
    this.setState(() => {
      return {
        editing: true,
      };
    });
  };
  KeyPress = (e) => {
    if (e.code === 'Enter') {
      this.setState(() => {
        return {
          editing: false,
        };
      });
    }
  };

  componentDidMount() {
    this.timerID = setInterval(() => this.date(), 500);
  }

  componentWillUnmount() {
    clearInterval(this.stopInterval);
    clearInterval(this.timerID);
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.sec !== prevState.sec) {
      this.props.onTimer();
    }
  }
  stopInterval = null;
  startTimer(duration) {
    clearInterval(this.stopInterval);
    let timer = duration,
      minutes,
      seconds;

    this.stopInterval = setInterval(() => {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);
      minutes = minutes < 10 ? '0' + minutes : minutes;
      seconds = seconds < 10 ? '0' + seconds : seconds;
      if (timer === 3599) {
        timer = -1;
      }
      this.setState({
        min: minutes,
        sec: seconds,
      });
      if (duration === 0) {
        if (++timer < 0) {
          timer = duration;
        }
      } else {
        if (timer-- <= 0) {
          clearInterval(this.stopInterval);
          timer = duration;
        }
      }
      this.props.timeOut(`${minutes}:${seconds}`);
    }, 1000);
  }
  date = () => {
    this.setState({
      time: formatDistanceToNow(this.tm, { includeSeconds: true }),
    });
  };

  render() {
    // const { editing } = this.state;
    const { min, sec } = this.state;
    const { label, onDeleted, id, onToggleCompleted, completed, time } = this.props;

    return (
      <li className={`${completed ? 'completed' : ''}`} key={id}>
        <div className="view">
          <input className="toggle" type="checkbox" id={id} onClick={onToggleCompleted} readOnly checked={completed} />
          <label htmlFor={id}>
            <span className="title">{label}</span>
            <span className="description">
              <button className="icon icon-play" onClick={() => this.startTimer(60 * Number(min) + Number(sec))} />
              <button className="icon icon-pause" onClick={() => clearInterval(this.stopInterval)} />
              {time}
            </span>
            <span className="description">created {this.state.time} ago</span>
          </label>
          <button className="icon icon-edit" onClick={this.ClickOnEditing} />
          <button className="icon icon-destroy" onClick={onDeleted} />
        </div>
        <input type="text" className="edit" onKeyDown={this.KeyPress} />
      </li>
    );
  }
}
