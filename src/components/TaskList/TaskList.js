import React, { Component } from 'react';
// import PropTypes from 'prop-types';

import Task from '../Task';

import './TaskList.css';

export default class TaskList extends Component {
  // static defaultProps = {
  //   task: [],
  //   onDeleted: () => {},
  //   onToggleCompleted: () => {},
  // };
  // static propTypes = {
  //   task: PropTypes.arrayOf(PropTypes.object),
  //   onDeleted: PropTypes.func,
  //   onToggleCompleted: PropTypes.func,
  // };
  state = {
    str: null,
  };
  timeOut = (time) => {
    this.setState({
      str: time,
    });
  };
  // componentDidUpdate(prevProps) {
  //   if (this.props.str !== prevProps.str) {
  //     this.props.onTimer(this.props.id
  //   }
  // }

  render() {
    const { task, onDeleted, onToggleCompleted, onTimer } = this.props;
    const el = task.map((item) => {
      const { id } = item;
      return (
        <Task
          key={id}
          {...item}
          minut={Number(item.min)}
          second={Number(item.sec)}
          lets={this.state.str}
          timeOut={this.timeOut}
          getDate={item.timer}
          onDeleted={() => onDeleted(id)}
          onTimer={() => onTimer(id, this.state.str)}
          onToggleCompleted={() => onToggleCompleted(id)}
        />
      );
    });

    return <ul className="todo-list">{el}</ul>;
  }
}
