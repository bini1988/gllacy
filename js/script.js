/**
  * Поддержка js
  */

var body = document.querySelector('body');

body.classList.remove('nojs');

/**
  * Форма обратной ствязи
  */
var contactsFeedbackBtn = document.querySelector('.contacts__btn-feedback');

var overlay = document.querySelector('.overlay');

var modalContentFeedback = document.querySelector('.modal-content--feedback');
var modalContentFeedbackCloseBtn = modalContentFeedback.querySelector('.modal-content__btn-close');

var feedbackForm = document.querySelector('#feedback-form');

var userNameField = feedbackForm.querySelector('#user-name');
var userEmailField = feedbackForm.querySelector('#user-email');

var userNameSaved = localStorage.getItem('user-name');


contactsFeedbackBtn.addEventListener('click', function(evt) {
  evt.preventDefault();

  modalContentFeedback.classList.add('modal-content--show-fadeout');
  overlay.classList.add('overlay--show');

  if (userNameSaved) {
    userNameField.value = userNameSaved;
    userEmailField.focus();
  } else {
    userNameField.focus();
  }
});


modalContentFeedbackCloseBtn.addEventListener('click', function(evt) {
  evt.preventDefault();

  modalContentFeedback.classList.remove('modal-content--show-fadeout');
  overlay.classList.remove('overlay--show');
});


feedbackForm.addEventListener('submit', function(evt) {

  localStorage.setItem('user-name', userNameField.value);
});


window.addEventListener('keydown', function(evt) {
  if (evt.keyCode === 27) {
    if (modalContentFeedback.classList.contains('modal-content--show-fadeout')) {

      modalContentFeedback.classList.remove('modal-content--show-fadeout');
      overlay.classList.remove('overlay--show');
    }
  }
});
