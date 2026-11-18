
// Authentication Simulation using localStorage

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const phonePattern = /^\+?[0-9\s()-]{10,18}$/;
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

// Display errors under form fields
function authError(form, field, message) {
  const target = form.querySelector(
    `[data-error-for="${field}"]`
  );
  if (target) target.textContent = message;
}

function clearAuthErrors(form) {
  form.querySelectorAll(".field-error").forEach((item) => {
    item.textContent = "";
  });
}

// Safely read user data
function getUser() {
  try {
    return JSON.parse(localStorage.getItem("triad-user") || "null");
  } catch {
    return null;
  }
}

// SIGN UP
document.querySelector("#signup-form")?.addEventListener("submit", (event) => {
  event.preventDefault();

  const form = event.currentTarget;
  clearAuthErrors(form);

  const data = new FormData(form);

  const name = String(data.get("name") || "").trim();
  const email = String(data.get("email") || "").trim().toLowerCase();
  const phone = String(data.get("phone") || "").trim();
  const password = String(data.get("password") || "");

  let valid = true;

  // Name validation
  if (name.length < 2) {
    authError(form, "name", "Name must contain at least 2 characters.");
    valid = false;
  }

  // Email validation
  if (!emailPattern.test(email)) {
    authError(form, "email", "Please enter a valid email address.");
    valid = false;
  }

  // Phone validation
  if (!phonePattern.test(phone) || phone.replace(/\D/g, "").length < 10) {
    authError(form, "phone", "Please enter a valid phone number.");
    valid = false;
  }

  // Password validation
  if (!passwordPattern.test(password)) {
    authError(
      form,
      "password",
      "Password must contain 8+ characters, uppercase, lowercase and a number."
    );
    valid = false;
  }

  const status = document.querySelector("#signup-status");

  if (!valid) {
    status.textContent = "Please correct the errors above.";
    return;
  }

  // Check if email already exists
  const existingUser = getUser();

  if (existingUser && existingUser.email === email) {
    authError(form, "email", "This email is already registered.");
    return;
  }

  // Save user information
  const user = {
    name: name,
    email: email,
    phone: phone,
    password: password
  };

  localStorage.setItem("triad-user", JSON.stringify(user));
  localStorage.setItem("triad-current-user", email);

  status.textContent = "Account created successfully!";

  setTimeout(() => {
    window.location.href = "profile.html";
  }, 500);
});

// LOG IN
document.querySelector("#login-form")?.addEventListener("submit", (event) => {
  event.preventDefault();

  const form = event.currentTarget;
  clearAuthErrors(form);

  const data = new FormData(form);

  const email = String(data.get("email") || "").trim().toLowerCase();
  const password = String(data.get("password") || "");

  let valid = true;

  if (!emailPattern.test(email)) {
    authError(form, "email", "Please enter a valid email address.");
    valid = false;
  }

  if (!passwordPattern.test(password)) {
    authError(form, "password", "Password must contain 8+ characters, uppercase, lowercase and a number.");
    valid = false;
  }

  const status = document.querySelector("#login-status");

  if (!valid) {
    status.textContent = "Please correct the errors above.";
    return;
  }

  const user = getUser();

  // Check saved credentials
  if (!user || user.email !== email || user.password !== password) {
    authError(form, "password", "Incorrect email or password.");
    return;
  }

  // Create active session
  localStorage.setItem("triad-current-user", email);

  status.textContent = "Login successful!";

  setTimeout(() => {
    window.location.href = "profile.html";
  }, 500);
});

// PROFILE PAGE
const profileName = document.querySelector("#profile-name");

if (profileName) {
  const user = getUser();
  const currentUser = localStorage.getItem("triad-current-user");

  // Redirect if user is not logged in
  if (!user || !currentUser || user.email !== currentUser) {
    window.location.replace("login.html");
  } else {
    profileName.textContent = user.name;

    document.querySelector("#profile-email").textContent = user.email;

    document.querySelector("#profile-avatar").textContent =
      user.name.charAt(0).toUpperCase();

    const phone = document.querySelector("#profile-phone");

    if (phone) {
      phone.textContent = user.phone;
    }
  }
}

// LOG OUT
document.querySelector("#logout-button")?.addEventListener("click", () => {
  localStorage.removeItem("triad-current-user");
  window.location.href = "login.html";
});
