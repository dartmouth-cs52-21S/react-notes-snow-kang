/* Commented out React support for the starterpack assignment */

import './style.scss';
import $ from 'jquery';
// import React from 'react';
// import ReactDOM from 'react-dom';

const counter = () => {
  let num = 0;
  $('#main').html(`You've been staring into Coco's eyes for ${num} seconds...<br>I don't blame you`);

  setInterval(() => {
    num += 1;
    $('#main').html(`You've been staring into Coco's eyes for ${num} seconds...<br>I don't blame you`);
  }, 1000);
};

counter();

// const App = () => <div className="test">All the REACT are belong to us!</div>;
// ReactDOM.render(<App />, document.getElementById('main'));
