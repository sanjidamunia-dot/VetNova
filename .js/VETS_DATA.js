
const veterinaryDoctors = [
    { name: "Dr. Tasnim Ara", specialty: "Senior Veterinary Surgeon & Avian Expert", type: "Surgeon", degree: "DVM (CVASU), MS (Surgery)", rating: "4.8 (32 Reviews)", location: "Uttara, Dhaka" },
    { name: "Dr. M. A. Hannan", specialty: "General Veterinary Physician", type: "General", degree: "DVM, MS (Medicine)", rating: "4.9 (61 Reviews)", location: "Uttara, Dhaka" },
    { name: "Dr. Mahbubul Alam", specialty: "General Veterinary Physician", type: "General", degree: "DVM, PGT (Pet Medicine)", rating: "4.7 (19 Reviews)", location: "Mirpur, Dhaka" },
    { name: "Dr. Asif Rahman", specialty: "Chief Veterinary Surgeon & Cat Specialist", type: "Surgeon", degree: "DVM, MS (Surgery)", rating: "4.9 (45 Reviews)", location: "Dhanmondi, Dhaka" },
    { name: "Dr. Sabrina Khan", specialty: "Senior Veterinary Dental Surgeon", type: "Surgeon", degree: "DVM, MS (Surgery)", rating: "4.9 (54 Reviews)", location: "Gulshan, Dhaka" },
    { name: "Dr. Kamrul Hasan", specialty: "Consultant Veterinary Surgeon", type: "Surgeon", degree: "DVM, MS (Theriogenology)", rating: "4.9 (33 Reviews)", location: "Bashundhara, Dhaka" }
];

function displayVets(vetsList) {
    const container = document.getElementById("vets-list-container");
    if (!container) return;
    
    container.innerHTML = ""; 

    vetsList.forEach(vet => {
        const card = document.createElement("div");
        card.className = "vet-card";
        
       
        card.innerHTML = `
            <div class="vet-badge">Available Today</div>
            <div class="vet-image-area"><i class="fas fa-user-md doctor-avatar-icon"></i></div>
            <div class="vet-info">
                <h3>${vet.name}</h3>
                <p class="specialty">${vet.specialty}</p>
                <div class="vet-meta">
                    <span><i class="fas fa-graduation-cap"></i> ${vet.degree}</span>
                    <span><i class="fas fa-star"></i> ${vet.rating}</span>
                    <span><i class="fas fa-map-pin"></i> ${vet.location}</span>
                </div>
                <button class="btn-book-now" onclick="window.location.href='Appointment booking.html?doctor=${encodeURIComponent(vet.name)}'">
    <i class="far fa-calendar-check"></i> Book Appointment
</button>
            </div>
        `;
        container.appendChild(card);
    });
}

function searchVets() {
    const searchLocation = document.getElementById("location-search-input").value.toLowerCase().trim();
    const selectedSpecialist = document.getElementById("specialist-select").value;

    const filteredVets = veterinaryDoctors.filter(vet => {
        const matchesLocation = vet.location.toLowerCase().includes(searchLocation);
        const matchesSpecialist = (selectedSpecialist === "all") || (vet.type === selectedSpecialist);
        return matchesLocation && matchesSpecialist;
    });

    displayVets(filteredVets);
}


window.addEventListener("DOMContentLoaded", () => {
    const doctorName = new URLSearchParams(window.location.search).get("doctor");

    if (!doctorName) return;

    const doctorSelect = document.getElementById("doctor-select");

    // যদি doctor dropdown এ থাকে
    let found = false;

    [...doctorSelect.options].forEach(option => {
        if (option.value === doctorName) {
            option.selected = true;
            found = true;
        }
    });

    // না থাকলে নতুন option add করবে
    if (!found) {
        const newOption = document.createElement("option");
        newOption.value = doctorName;
        newOption.textContent = doctorName;
        newOption.selected = true;
        doctorSelect.appendChild(newOption);
        doctorSelect.disabled = true;
    }
});