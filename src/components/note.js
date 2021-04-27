import React, { Component } from 'react';
import Draggable from 'react-draggable';
import TextareaAutosize from 'react-textarea-autosize';
import ReactMarkdown from 'react-markdown';

const polarheader = require('../img/polarheader.png');
const pandaheader = require('../img/pandaheader.png');
const catheader = require('../img/catheader.png');

const polaricon = require('../img/polaricon.png');
const pandaicon = require('../img/pandaicon.png');
const caticon = require('../img/caticon.png');

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

  handleAnimalHeaderClick = (newAnimalHeader) => {
    this.props.onUpdateNote(this.props.id, { animalHeader: newAnimalHeader });
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

  renderAnimalHeader = () => {
    if (this.props.note.animalHeader === 'panda') {
      return (
        <img src={pandaheader} draggable="false" alt="Panda bear sticky note header" />
      );
    } else if (this.props.note.animalHeader === 'cat') {
      return (
        <img src={catheader} draggable="false" alt="Cat bear sticky note header" />
      );
    } else {
      return (
        <img src={polarheader} draggable="false" alt="Polar bear sticky note header" />
      );
    }
  }

  renderNoteText = (animalColor, scarfColor, scarfFontColor, textBackgroundColor, textFontColor) => {
    if (this.state.isEditingText) {
      return (
        <div className="note-content" style={{ backgroundColor: animalColor }}>
          <TextareaAutosize className="note-title"
            style={{ backgroundColor: scarfColor, color: scarfFontColor }}
            onChange={this.onTitleChange}
            value={this.props.note.title}
          />
          <textarea className="note-text"
            style={{ backgroundColor: textBackgroundColor, color: textFontColor }}
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
            onBlur={this.onTextBlur}
            onChange={this.onTextChange}
            value={this.props.note.text}
          />

        </div>
      );
    } else {
      return (
        <div className="note-content" style={{ backgroundColor: animalColor }}>
          <TextareaAutosize className="note-title"
            style={{ backgroundColor: scarfColor, color: scarfFontColor }}
            onChange={this.onTitleChange}
            value={this.props.note.title}
          />
          <button type="button"
            className="note-text"
            style={{ backgroundColor: textBackgroundColor, color: textFontColor }}
            onFocus={this.onTextFocus}
            onBlur={this.onTextBlur}
          >
            <ReactMarkdown>{this.props.note.text || ''}</ReactMarkdown>
          </button>
        </div>
      );
    }
  }

  render() {
    let animalColor, scarfColor, scarfFontColor, textBackgroundColor, textFontColor, authorFontColor;
    switch (this.props.note.animalHeader) {
      case 'cat':
        animalColor = 'darkorange';
        scarfColor = 'pink';
        scarfFontColor = 'black';
        textBackgroundColor = 'white';
        textFontColor = 'black';
        authorFontColor = 'white';
        break;
      case 'panda':
        animalColor = 'white';
        scarfColor = 'plum';
        scarfFontColor = 'white';
        textBackgroundColor = 'black';
        textFontColor = 'white';
        authorFontColor = 'gray';
        break;
      default:
        animalColor = 'white';
        scarfColor = 'purple';
        scarfFontColor = 'white';
        textBackgroundColor = 'lightgray';
        textFontColor = 'black';
        authorFontColor = 'gray';
    }

    return (
      <Draggable
        handle=".animal-header"
        position={{
          x: this.props.note.x,
          y: this.props.note.y,
        }}
        onDrag={this.handleDrag}
        onMouseDown={this.makeTopZIndex}
        bounds="parent"
      >
        <div className="note" style={{ zIndex: this.props.note.zIndex }}>
          <div className="animal-header">
            {this.renderAnimalHeader()}
          </div>
          {this.renderNoteText(animalColor, scarfColor, scarfFontColor, textBackgroundColor, textFontColor)}
          <div className="options rotate">
            <i onClick={this.handleDeleteClick} className="fas fa-times" role="button" tabIndex="0" label="Delete note" />
            <img onClick={() => { this.handleAnimalHeaderClick('polar'); }} className="animal-icon" src={polaricon} alt="Change animal header to polar bear" />
            <img onClick={() => { this.handleAnimalHeaderClick('panda'); }} className="animal-icon" src={pandaicon} alt="Change animal header to panda bear" />
            <img onClick={() => { this.handleAnimalHeaderClick('cat'); }} className="animal-icon" src={caticon} alt="Change animal header to cat" />
          </div>
          <div className="note-author" style={{ backgroundColor: animalColor, color: authorFontColor }}>created by {this.props.note.createdBy}</div>
        </div>
      </Draggable>
    );
  }
}

export default Note;
