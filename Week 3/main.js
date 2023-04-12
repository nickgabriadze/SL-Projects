const form = document.getElementById("user-form");

function checkPass() {
  const pass = document.getElementById("initial-pass");
  const confirmPass = document.getElementById("confirmed-pass");

  return pass.value.toString() === confirmPass.value.toString();
}

form.addEventListener("submit", (e) => {
  const valid = checkPass();

  if (!valid) {
    e.preventDefault();
    alert("Passwords do not match");
  }
});
