const formData = { email: '', message: '' };

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageTextarea = form.querySelector('textarea[name="message"]');

const STORAGE_KEY = 'feedback-form-state';

form.addEventListener('input', inputLoad);

function inputLoad(event) {
  if (event.target.name in formData) {
    formData[event.target.name] = event.target.value.trim();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }
}

window.addEventListener('load', () => {
  const savedData = localStorage.getItem(STORAGE_KEY);
  if (savedData) {
    const parsedData = JSON.parse(savedData);
    formData.email = parsedData.email || '';
    formData.message = parsedData.message || '';

    form.email.value = formData.email;
    form.message.value = formData.message;
  } else {
    console.log('No saved data found, form fields are empty.');
  }
});

form.addEventListener('submit', event => {
  event.preventDefault();

  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }

  console.log('Submitted data:', formData);
  localStorage.removeItem(STORAGE_KEY);
  form.reset();
  formData.email = '';
  formData.message = '';
});
