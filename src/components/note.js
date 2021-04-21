import React, { Component } from 'react';
import Draggable from 'react-draggable';

class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  handleDrag = (e, data) => {
    this.props.onUpdate(this.props.id, { x: data.x, y: data.y });
  }

  handleDeleteClick = () => {
    this.props.onDelete(this.props.id);
  }

  render() {
    return (
      <Draggable
        handle=".handle"
        defaultPosition={{ x: 0, y: 0 }}
        position={{
          x: this.props.note.x,
          y: this.props.note.y,
        }}
        onDrag={this.handleDrag}
      >
        <div className="note">
          <div className="options">
            <i onClick={this.handleDeleteClick} className="fa fa-trash-o" role="button" tabIndex="0" label="Delete note" />
            <i className="fas fa-arrows-alt handle" />
          </div>
          <h2>{this.props.note.title}</h2>
          <p>{this.props.note.text}</p>
        </div>
      </Draggable>
    );
  }
}

export default Note;
