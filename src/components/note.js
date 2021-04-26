import React, { Component } from 'react';
import Draggable from 'react-draggable';
import TextareaAutosize from 'react-textarea-autosize';
import ReactMarkdown from 'react-markdown';

class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditingText: false,
    };
  }

  makeTopZIndex = () => {
    this.props.onUpdateZIndex(this.props.id);
  }

  handleDrag = (_, data) => {
    this.props.onUpdateNote(this.props.id, { x: data.x, y: data.y });
  }

  handleDeleteClick = () => {
    this.props.onDelete(this.props.id);
  }

  onTextFocus = (_) => {
    this.setState({ isEditingText: true });
  }

  onTextBlur = (_) => {
    this.setState({ isEditingText: false });
  }

  onTitleChange = (event) => {
    this.props.onUpdateNote(this.props.id, { title: event.target.value });
  }

  onTextChange = (event) => {
    this.props.onUpdateNote(this.props.id, { text: event.target.value });
  }

  renderNoteText = () => {
    if (this.state.isEditingText) {
      return (
        <div className="note-content">
          <TextareaAutosize onChange={this.onTitleChange} value={this.props.note.title} />
          <TextareaAutosize autoFocus onBlur={this.onTextBlur} onChange={this.onTextChange} value={this.props.note.text} />
        </div>
      );
    } else {
      return (
        <div className="note-content">
          <TextareaAutosize onChange={this.onTitleChange} value={this.props.note.title} />
          <button type="button" onFocus={this.onTextFocus} onBlur={this.onTextBlur}>
            <ReactMarkdown>{this.props.note.text || ''}</ReactMarkdown>
          </button>
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
        onMouseDown={this.makeTopZIndex}
        stack="div"
        distance="0"
      >
        <div className="note" style={{ zIndex: this.props.note.zIndex }}>
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
