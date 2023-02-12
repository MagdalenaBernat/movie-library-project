const spinner = document.createElement('div');
spinner.classList.add('spinner');

const addSpinner = () => {
  document.body.append(spinner);
  // debugger;
};

const removeSpinner = () => {
  spinner.remove();
  // debugger;
};

export { addSpinner, removeSpinner };
