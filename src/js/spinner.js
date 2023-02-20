'use strict';

const spinner = document.createElement('div');
spinner.classList.add('spinner');

const addSpinner = () => {
  document.body.append(spinner);
};

const removeSpinner = () => {
  spinner.remove();
};

export { addSpinner, removeSpinner };
