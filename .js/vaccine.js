 document.querySelector(".btn").addEventListener("click", function(){
        alert("Vaccination record saved successfully!");
    });
    let currentDate = new Date();
let records = [];

function renderCalendar() {
    const calendar = document.getElementById("calendar");
    const monthYear = document.getElementById("monthYear");

    calendar.innerHTML = "";

    let year = currentDate.getFullYear();
    let month = currentDate.getMonth();

    let firstDay = new Date(year, month, 1).getDay();
    let daysInMonth = new Date(year, month + 1, 0).getDate();

    const months = [
        "January","February","March","April","May","June",
        "July","August","September","October","November","December"
    ];

    monthYear.innerText = `${months[month]} ${year}`;

    // empty days
    for (let i = 0; i < firstDay; i++) {
        let empty = document.createElement("div");
        calendar.appendChild(empty);
    }

    // days
    for (let d = 1; d <= daysInMonth; d++) {
        let day = document.createElement("div");
        day.classList.add("day");

        let fullDate = `${year}-${String(month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
        day.innerText = d;

        // highlight if match record
        if (records.includes(fullDate)) {
            day.classList.add("active");
        }

        calendar.appendChild(day);
    }
}

function addRecord() {
    let date = document.getElementById("vaccineDate").value;

    if (date && !records.includes(date)) {
        records.push(date);
    }

    renderCalendar();
}

function nextMonth() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
}

function prevMonth() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
}

renderCalendar();