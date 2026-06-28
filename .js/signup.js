const togglePassword =
document.getElementById("togglePassword");

const password =
document.getElementById("password");

togglePassword.addEventListener("click",()=>{

const type =
password.type === "password"
? "text"
: "password";

password.type = type;

togglePassword.classList.toggle("fa-eye");
togglePassword.classList.toggle("fa-eye-slash");

});

const toggleConfirmPassword =
document.getElementById("toggleConfirmPassword");

const confirmPassword =
document.getElementById("confirmPassword");

toggleConfirmPassword.addEventListener("click",()=>{

const type =
confirmPassword.type === "password"
? "text"
: "password";

confirmPassword.type = type;

toggleConfirmPassword.classList.toggle("fa-eye");
toggleConfirmPassword.classList.toggle("fa-eye-slash");

});




document.getElementById("signupForm").addEventListener("submit",function(e){

e.preventDefault();

if(password.value !== confirmPassword.value){
    alert("Passwords do not match!");
    return;
}

const userData = {
    name: document.querySelector('input[type="text"]').value,
    email: document.querySelector('input[type="email"]').value,
    phone: document.querySelector('input[type="tel"]').value,
    password: password.value
};

localStorage.setItem("vetnovaUser", JSON.stringify(userData));
localStorage.setItem("isLoggedIn","true");



window.location.href="profile.html";

});


 localStorage.setItem(
    "joinDate",
    new Date().toLocaleDateString()
);