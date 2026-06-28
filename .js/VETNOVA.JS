const navbarHTML = `
<nav class="navbar">
    <div class="nav-container">
        <a class="navbar-brand" href="Home VN.html">
            <i class="fas fa-paw"></i> Vet<span>Nova</span>
        </a>

        <ul class="nav-menu">
            <li><a class="nav-link" id="nav-home" href="index.html">Home</a></li>
            <li><a class="nav-link" id="nav-about" href="ABOUT VN.html">About Us</a></li>
            <li><a class="nav-link" id="nav-features" href="FEATURE.html">Features</a></li>
            <li><a class="nav-link" id="nav-finder" href="FIND VET.HTML">Find Vet</a></li>
            <li><a class="nav-link" id="nav-emergency" href="emergency.html">Emergency Support</a></li>
            <li><a class="nav-link" id="nav-blog" href="blog.html">Pet Care Blog</a></li>
            <li><a class="nav-link" id="nav-contact" href="contact.html">Contact Us</a></li>
<li id="profileNav" style="display:none;">
    <a class="user-profile-nav" href="profile.html">
        <img
            id="navProfilePic"
            src="https://ui-avatars.com/api/?name=User&background=4ecdc4&color=fff"
            alt="Profile">
        <span id="navProfileName">Profile</span>
    </a>
</li>

<li>
    <a class="btn-nova" id="authBtn" href="login.html">
        Login
    </a>
</li>
         
        </ul>
    </div>
</nav>
`;
const footerHTML = `
<footer class="main-footer">
    <div class="footer-top">
        <div class="footer-container">

            <div class="footer-col col-about">
                <a class="footer-logo" href="Home VN.HTML">
                    <i class="fas fa-paw"></i> Vet<span>Nova</span>
                </a>

                <p class="footer-brand-desc">
                    Redefining animal welfare and pet care ecosystem in Bangladesh
                    through smart digital solutions.
                </p>

                <div class="footer-socials">
                    <a href="#"><i class="fab fa-facebook-f"></i></a>
                    <a href="#"><i class="fab fa-twitter"></i></a>
                    <a href="#"><i class="fab fa-linkedin-in"></i></a>
                    <a href="#"><i class="fab fa-instagram"></i></a>
                </div>
            </div>

            <div class="footer-col">
                <h4>Quick Links</h4>
                <ul class="footer-links">
                    <li><a href="Home VN.html">Home</a></li>
                    <li><a href="ABOUT VN.html">About Us</a></li>
                    <li><a href="FEATURE.html">Platform Features</a></li>
                    <li><a href="blog.html">Latest Blogs</a></li>
                </ul>
            </div>

            <div class="footer-col">
                <h4>Our Services</h4>
                <ul class="footer-links">
                    <li><a href="FIND VET.HTML">Find Verified Vet</a></li>
                    <li><a href="FEATURE.html#symptom-tracker">Symptom Tracker</a></li>
                    <li><a href="FEATURE.html#blood-bank">Pet Adoption</a></li>
                    <li><a href="FEATURE.html#health-card">Digital Health Card</a></li>
                </ul>
            </div>

            <div class="footer-col col-contact">
                <h4>Official Support</h4>
                <ul class="footer-contact-info">
                    <li><i class="fas fa-map-marker-alt"></i> Dhaka, Bangladesh</li>
                    <li><i class="fas fa-phone-alt"></i> +880 1700-000000</li>
                    <li><i class="fas fa-envelope"></i> support@vetnova.com</li>
                </ul>
            </div>

        </div>
    </div>

    <div class="footer-bottom">
        <div class="footer-container bottom-bar">
            <p>&copy; 2026 VetNova. All Rights Reserved.</p>
            <div class="footer-bottom-links">
                <a href="#">Privacy Policy</a> |
                <a href="#">Terms & Conditions</a>
            </div>
        </div>
    </div>
</footer>
`;

function renderDoctors(doctorsToDisplay) {

    const container = document.getElementById("vets-list-container");
    if (!container) return;

    container.innerHTML = "";

    if (doctorsToDisplay.length === 0) {

        container.innerHTML = `
        <div style="grid-column:1/-1;text-align:center;padding:50px 20px;color:#718096;">
            <i class="fas fa-user-times" style="font-size:3.5rem;color:#cbd5e0;margin-bottom:15px;"></i>
            <h3 style="font-size:1.5rem;margin-bottom:5px;color:#4a5568;">
                No verified vets found in this area.
            </h3>
            <p>
                Try searching with another location like Uttara,
                Dhanmondi, Gulshan, Mirpur, or Bashundhara.
            </p>
        </div>
        `;

        return;
    }

    doctorsToDisplay.forEach(vet => {

        container.innerHTML += `
        <div class="vet-card">

            <div class="vet-badge">Available Today</div>

            <div class="vet-image-area">
                <i class="fas fa-user-md doctor-avatar-icon"></i>
            </div>

            <div class="vet-info">
                <h3>${vet.name}</h3>

                <p class="specialty">${vet.specialty}</p>

                <div class="vet-meta">
                    <span><i class="fas fa-graduation-cap"></i> ${vet.degree}</span>
                    <span><i class="fas fa-star"></i> ${vet.rating}</span>
                    <span><i class="fas fa-map-pin"></i> ${vet.location}</span>
                </div>

                <button class="btn-book-now"
                    onclick="window.location.href='Appointment booking.html?doctor=${encodeURIComponent(vet.name)}'">

                    <i class="far fa-calendar-check"></i>
                    Book Appointment

                </button>
            </div>

        </div>
        `;
    });
}

function searchVets() {

    const searchLocation =
        document.getElementById("location-search-input")
        .value.toLowerCase().trim();

    const selectedSpecialist =
        document.getElementById("specialist-select").value;

    const filteredVets = veterinaryDoctors.filter(vet => {

        const matchesLocation =
            vet.location.toLowerCase().includes(searchLocation);

        const matchesSpecialist =
            selectedSpecialist === "all" ||
            vet.type === selectedSpecialist;

        return matchesLocation && matchesSpecialist;
    });

    renderDoctors(filteredVets);
}

/* =========================
   PAGE LOAD
========================= */


document.addEventListener("DOMContentLoaded", () => {

    if (document.getElementById("navbar-placeholder")) {
        document.getElementById("navbar-placeholder").innerHTML = navbarHTML;
    }

    if (document.getElementById("footer-placeholder")) {
        document.getElementById("footer-placeholder").innerHTML = footerHTML;
    }

    if (typeof veterinaryDoctors !== "undefined") {
        renderDoctors(veterinaryDoctors);
    }

    // ⭐ MUST WAIT FOR DOM
    
        initNavbarProfile();
    




    // =========================
    // LOGIN / PROFILE SYSTEM
    // =========================

function initNavbarProfile() {

    const authBtn = document.getElementById("authBtn");
    const profileNav = document.getElementById("profileNav");
    const profileName = document.getElementById("navProfileName");
    const navProfilePic = document.getElementById("navProfilePic");

    if (!authBtn || !profileNav || !profileName || !navProfilePic) return;

    const loggedIn = localStorage.getItem("isLoggedIn");
    const userData = JSON.parse(localStorage.getItem("vetnovaUser")) || {};

    if (loggedIn === "true") {

        profileNav.style.display = "block";

        profileName.textContent =
            userData.name ||
            userData.fullName ||
            userData.username ||
            "Profile";

        navProfilePic.src =
            userData.profileImage ||
            "https://ui-avatars.com/api/?name=User&background=4ecdc4&color=fff";

        authBtn.textContent = "Logout";
        authBtn.href = "#";
        authBtn.style.background = "#ef4444";

        authBtn.onclick = function (e) {
            e.preventDefault();

            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("vetnovaUser");
            localStorage.removeItem("userProfilePic");
            localStorage.removeItem("petProfilePic");

            location.reload();
        };

    } else {

        profileNav.style.display = "none";

        authBtn.textContent = "Login";
        authBtn.href = "login.html";
        authBtn.style.background = "#00C9A7";
    }
}

function updateNavbarProfile() {

    const userData = JSON.parse(localStorage.getItem("vetnovaUser")) || {};

    const navImg = document.getElementById("navProfilePic");
    const navName = document.getElementById("navProfileName");

    if (navImg) {
        navImg.src =
            userData.profileImage ||
            "https://ui-avatars.com/api/?name=User&background=4ecdc4&color=fff";
    }

    if (navName) {
        navName.textContent =
            userData.name ||
            userData.fullName ||
            userData.username ||
            "Profile";
    }
}
function updateNavbarProfile(){

    const userData =
        JSON.parse(localStorage.getItem("vetnovaUser"));

    const navImg =
        document.getElementById("navProfilePic");

    const navName =
        document.getElementById("navProfileName");

    if(userData){

        if(navImg)
            navImg.src = userData.profileImage ||
            "https://ui-avatars.com/api/?name=User";

        if(navName)
            navName.textContent = userData.name;

    }

}
    // =========================
    // ACTIVE MENU
    // =========================

    const currentPath = decodeURIComponent(window.location.pathname).toLowerCase();
    const currentPage = (currentPath.split("/").pop() || "index.html").replace(/\.html$/i, "");

    if (currentPage === "" || currentPage === "index" || currentPage === "home vn") {
        document.getElementById("nav-home")?.classList.add("active");
    }
    else if (currentPage.includes("about")) {
        document.getElementById("nav-about")?.classList.add("active");
    }
    else if (currentPage.includes("feature")) {
        document.getElementById("nav-features")?.classList.add("active");
    }
    else if (currentPage.includes("find")) {
        document.getElementById("nav-finder")?.classList.add("active");
    }
    else if (currentPage.includes("emergency")) {
        document.getElementById("nav-emergency")?.classList.add("active");
    }
    else if (currentPage.includes("blog")) {
        document.getElementById("nav-blog")?.classList.add("active");
    }
    else if (currentPage.includes("contact")) {
        document.getElementById("nav-contact")?.classList.add("active");
    }
    else {
        document.getElementById("nav-none")?.classList.add("active");
    }

});