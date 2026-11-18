
// Contact Form Validation

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const phonePattern = /^\+?[0-9\s()-]{10,18}$/;

// Display error message
function showError(form, field, message) {
  const target = form.querySelector(
    `[data-error-for="${field}"]`
  );

  if (target) {
    target.textContent = message;
  }
}

// Clear previous errors
function clearErrors(form) {
  form.querySelectorAll(".field-error").forEach((item) => {
    item.textContent = "";
  });
}

// Contact form submission
document.querySelector("#contact-form")?.addEventListener("submit", (event) => {
  event.preventDefault();

  const form = event.currentTarget;
  clearErrors(form);

  const data = new FormData(form);

  const name = String(data.get("name") || "").trim();
  const email = String(data.get("email") || "").trim();
  const phone = String(data.get("phone") || "").trim();
  const message = String(data.get("message") || "").trim();

  let valid = true;

  // Name validation
  if (name.length < 2) {
    showError(form, "name", "Please enter your name (at least 2 characters).");
    valid = false;
  }

  // Email validation
  if (!emailPattern.test(email)) {
    showError(form, "email", "Please enter a valid email address.");
    valid = false;
  }

  // Phone validation
  if (!phonePattern.test(phone) || phone.replace(/\D/g, "").length < 10) {
    showError(form, "phone", "Please enter a valid phone number.");
    valid = false;
  }

  // Message validation
  if (message.length < 10) {
    showError(form, "message", "Message must contain at least 10 characters.");
    valid = false;
  }

  const status = document.querySelector("#contact-status");

  if (valid) {
    status.textContent = "Thank you! Your message is ready to send.";
    form.reset();
  } else {
    status.textContent = "Please correct the errors above.";
  }
});
