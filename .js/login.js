document.getElementById("loginForm").addEventListener("submit", function (e) {

    e.preventDefault();

    const email = document.querySelector('input[type="email"]').value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
        alert("Please fill all fields.");
        return;
    }

    // Login Status Save
    localStorage.setItem("isLoggedIn", "true");

    // User Info Save
    localStorage.setItem("vetnovaUser", JSON.stringify({
        email: email
    }));

    

    // Profile Page এ Redirect
    window.location.href = "profile.html";

});

const togglePassword =
document.getElementById("togglePassword");

const password =
document.getElementById("password");

togglePassword.addEventListener("click", () => {

    const type =
    password.getAttribute("type") === "password"
    ? "text"
    : "password";

    password.setAttribute("type", type);

    togglePassword.classList.toggle("fa-eye");
    togglePassword.classList.toggle("fa-eye-slash");

});