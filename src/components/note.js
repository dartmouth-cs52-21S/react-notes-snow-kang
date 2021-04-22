import React, { Component } from 'react';
import Draggable from 'react-draggable';
import TextareaAutosize from 'react-textarea-autosize';

class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      title: props.note.title,
      text: props.note.text,
    };
  }

  handleDrag = (_, data) => {
    this.props.onUpdate(this.props.id, { x: data.x, y: data.y });
  }

  handleDeleteClick = () => {
    this.props.onDelete(this.props.id);
  }

  onSectionFocus = (_) => {
    this.setState({ isEditing: true });
  }

  // Only update App parent once note is no longer in focus
  onSectionBlur = (_) => {
    this.setState({ isEditing: false });
    this.props.onUpdate(this.props.id, { title: this.state.title, text: this.state.text });
  }

  onTitleChange = (event) => {
    this.setState({ title: event.target.value });
  }

  onTextChange = (event) => {
    this.setState({ text: event.target.value });
  }

  // Update
  renderNoteText = () => {
    if (this.state.isEditing) {
      return (
        <div className="note-content">
          <TextareaAutosize onBlur={this.onSectionBlur} onChange={this.onTitleChange} value={this.state.title} />
          <TextareaAutosize onBlur={this.onSectionBlur} onChange={this.onTextChange} value={this.state.text} />
        </div>
      );
    } else {
      return (
        <div className="note-content">
          <TextareaAutosize onFocus={this.onSectionFocus} onChange={this.onTitleChange} value={this.props.note.title} />
          <TextareaAutosize onFocus={this.onSectionFocus} onChange={this.onTextChange} value={this.props.note.text} />
        </div>
      );
    }
  }

  render() {
    return (
      <Draggable
        handle=".draggable-area"
        position={{
          x: this.props.note.x,
          y: this.props.note.y,
        }}
        onDrag={this.handleDrag}
        stack="div"
        distance="0"
      >
        <div className="note">
          <div className="options">
            <span className="draggable-area" />
            <i onClick={this.handleDeleteClick} className="fas fa-times" role="button" tabIndex="0" label="Delete note" />
          </div>
          {this.renderNoteText()}
        </div>
      </Draggable>
    );
  }
}

export default Note;
