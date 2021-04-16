import './style.scss';
import $ from 'jquery';

const counter = () => {
  let num = 0;
  $('#main').html(`You've been staring into Coco's eyes for ${num} seconds...<br>I don't blame you`);

  setInterval(() => {
    num += 1;
    $('#main').html(`You've been staring into Coco's eyes for ${num} seconds...<br>I don't blame you`);
  }, 1000);
};

counter();
