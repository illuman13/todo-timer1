import React, { Component } from 'react';
// import PropTypes from 'prop-types';

export default class TaskFilter extends Component {
  // static propTypes = {
  //   filterCompleted: PropTypes.string.isRequired,
  //   filter: PropTypes.string.isRequired,
  // };

  createBtn = (label, state, func) => {
    return (
      <button onClick={func} className={`${label === state ? 'selected' : ''}`}>
        {label}
      </button>
    );
  };

  render() {
    const { filterCompleted, filter } = this.props;
    return (
      <ul className="filters">
        <li key="23">{this.createBtn('All', filter, filterCompleted)}</li>
        <li key="24">{this.createBtn('Active', filter, filterCompleted)}</li>
        <li key="25">{this.createBtn('Completed', filter, filterCompleted)}</li>
      </ul>
    );
  }
}
