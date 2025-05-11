const userPmg = document.querySelector(".user-pmg");
const modalMenu = document.getElementById("modal-menu");

userPmg.addEventListener("click", function () {
    modalMenu.style.display = "block";
});

document.addEventListener("click", function (event) {
    if (!modalMenu.contains(event.target) && !userPmg.contains(event.target)) {
        modalMenu.style.display = "none";
    }
});

const nextStatistics = document.getElementById("nextStatistics");
if (nextStatistics) {
    nextStatistics.addEventListener("click", function() {
        window.location.href = "mainPage.html";
    });
}

const nextExit = document.getElementById("nextExit");
if (nextExit) {
    nextExit.addEventListener("click", function() {
        window.location.href = "exit.html";
    });
}

document.addEventListener("DOMContentLoaded", function () {
    const imgCalendar = document.querySelector(".img-calendar img"); 
    const calendarContainer = document.getElementById("calendarContainer");
    const calendarFromDates = document.querySelectorAll("#calendar-from .calendar-dates div");
    const calendarToDates = document.querySelectorAll("#calendar-to .calendar-dates div");

    const selectedDateElement = document.getElementById("selectedDate");  
    let selectedFromDate = null;
    let selectedToDate = null;    

    imgCalendar.addEventListener("click", function (event) {
        calendarContainer.classList.remove("hidden");
        event.stopPropagation(); 
    });

    document.addEventListener("click", function (event) {
        if (!calendarContainer.contains(event.target) && event.target !== imgCalendar) {
            calendarContainer.classList.add("hidden");
        }
    });

    calendarFromDates.forEach(date => {
        date.addEventListener("click", function () {
            if (date.textContent.trim() !== "") {
                clearSelectedDates("#calendar-from");
                date.classList.add("selected");
                selectedFromDate = date.textContent.trim();
                updateSelectedDates();
            }
        });
    });

    calendarToDates.forEach(date => {
        date.addEventListener("click", function () {
            if (date.textContent.trim() !== "") {
                clearSelectedDates("#calendar-to");
                date.classList.add("selected");
                selectedToDate = date.textContent.trim();
                updateSelectedDates();
            }
        });
    });

    function updateSelectedDates() {
        if (selectedFromDate && selectedToDate) {
            selectedDateElement.textContent = `${selectedFromDate}.04.25 - ${selectedToDate}.04.25`;
        }
    }

    function clearSelectedDates(calendarId) {
        const calendarDates = document.querySelectorAll(`${calendarId} .calendar-dates div`);
        calendarDates.forEach(date => {
            date.classList.remove("selected");
        });
    }
});

const returnBack = document.getElementById("button-add-back");
console.log("Кнопка повернення знайдена", returnBack);

if (returnBack) {
    returnBack.addEventListener("click", function() {
        console.log("Кнопка повернення натиснута");
        window.location.href = "mainPage.html";
    });
}