function authError(form, field, message) {
  const target = form.querySelector(`[data-error-for="${field}"]`);
  if (target) target.textContent = message;
}

function clearAuthErrors(form) {
  form.querySelectorAll('.field-error').forEach((item) => { item.textContent = ''; });
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^\+?[0-9\s()\-]{10,18}$/;

document.querySelector('#signup-form')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  clearAuthErrors(form);
  const data = new FormData(form);
  const name = String(data.get('name')).trim();
  const email = String(data.get('email')).trim().toLowerCase();
  const phone = String(data.get('phone')).trim();
  const password = String(data.get('password'));
  let valid = true;
  if (!name) { authError(form, 'name', 'Name is required.'); valid = false; }
  if (!emailPattern.test(email)) { authError(form, 'email', 'Enter a valid email.'); valid = false; }
  if (!phonePattern.test(phone)) { authError(form, 'phone', 'Enter a valid phone number.'); valid = false; }
  if (!/(?=.*[A-Za-z])(?=.*\d).{8,}/.test(password)) { authError(form, 'password', 'Use 8+ characters with a letter and a number.'); valid = false; }
  const status = document.querySelector('#signup-status');
  if (!valid) { status.textContent = ''; return; }
  localStorage.setItem('triad-user', JSON.stringify({ name, email, phone, password }));
  localStorage.setItem('triad-current-user', email);
  status.textContent = 'Account created. Opening your profile...';
  setTimeout(() => { window.location.href = 'profile.html'; }, 500);
});

document.querySelector('#login-form')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  clearAuthErrors(form);
  const data = new FormData(form);
  const email = String(data.get('email')).trim().toLowerCase();
  const password = String(data.get('password'));
  const user = JSON.parse(localStorage.getItem('triad-user') || 'null');
  if (!emailPattern.test(email)) authError(form, 'email', 'Enter a valid email.');
  if (!password) authError(form, 'password', 'Password is required.');
  if (!emailPattern.test(email) || !password) return;
  if (!user || user.email !== email || user.password !== password) {
    authError(form, 'password', 'Email or password is incorrect.');
    return;
  }
  localStorage.setItem('triad-current-user', email);
  document.querySelector('#login-status').textContent = 'Success. Opening your profile...';
  setTimeout(() => { window.location.href = 'profile.html'; }, 500);
});

const profileName = document.querySelector('#profile-name');
if (profileName) {
  const user = JSON.parse(localStorage.getItem('triad-user') || 'null');
  if (!user) window.location.href = 'login.html';
  else {
    profileName.textContent = user.name;
    document.querySelector('#profile-email').textContent = user.email;
    document.querySelector('#profile-avatar').textContent = user.name.charAt(0).toUpperCase();
  }
}

document.querySelector('#logout-button')?.addEventListener('click', () => {
  localStorage.removeItem('triad-current-user');
  window.location.href = 'index.html';
});
