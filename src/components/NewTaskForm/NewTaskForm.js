import React, { Component } from 'react';
import './NewTaskForm.css';
// import PropTypes from 'prop-types';

export default class NewTaskForm extends Component {
  // static propTypes = {
  //   AddItem: PropTypes.func.isRequired,
  // };

  state = {
    label: '',
    min: '',
    sec: '',
  };

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };
  onMinChange = (e) => {
    this.setState({
      min: e.target.value,
    });
  };
  onSecChange = (e) => {
    this.setState({
      sec: e.target.value,
    });
  };

  onSubmit = (e) => {
    if (e.code === 'Enter') {
      const { label, min, sec } = this.state;
      const { AddItem } = this.props;
      AddItem(label, min, sec);
      this.setState({
        label: '',
        min: '0',
        sec: '0',
      });
    }
  };
  render() {
    return (
      <form className="new-todo-form" onKeyDown={this.onSubmit}>
        <input
          className="new-todo"
          type="text"
          placeholder="Task"
          onChange={this.onLabelChange}
          value={this.state.label}
          autoFocus
        />
        <input
          className="new-todo-form__timer"
          onChange={this.onMinChange}
          value={this.state.min}
          type="number"
          placeholder="Min"
          autoFocus
        />
        <input
          className="new-todo-form__timer"
          onChange={this.onSecChange}
          value={this.state.sec}
          type="number"
          placeholder="Sec"
          autoFocus
        />
      </form>
    );
  }
}
