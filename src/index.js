import './style.scss';
import $ from 'jquery';

const counter = () => {
  let num = 0;
  $('#main').html(`You've been on this page for ${num} seconds`);

  setInterval(() => {
    num += 1;
    $('#main').html(`You've been on this page for ${num} seconds`);
  }, 1000);
};

counter();
