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

async function loadCandidatesAndCalculateStats() {
    try {
        const response = await fetch("http://localhost:5200/api/all-candidates");
        if (!response.ok) throw new Error("Не вдалося завантажити кандидатів");

        const candidates = await response.json();

        const totalCandidates = candidates.length;

        // Підрахунок кандидатів за статусами
        const statuses = ["НБТ", "Отказ", "Співбесіда", "Неактуально", "Перезвон", "Не підходить"];
        const statusCounts = {};
        statuses.forEach(status => statusCounts[status] = 0);

        candidates.forEach(c => {
            if (statuses.includes(c.status)) {
                statusCounts[c.status]++;
            }
        });

        // Підрахунок відсотків за статусами
        const statusPercentages = {};
        statuses.forEach(status => {
            statusPercentages[status] = totalCandidates > 0 ? ((statusCounts[status] / totalCandidates) * 100).toFixed(1) : 0;
        });

        // Підрахунок кандидатів за джерелами
        const sources = ["Work", "Robota", "Jooble"];
        const sourceCounts = {};
        sources.forEach(src => sourceCounts[src] = 0);

        candidates.forEach(c => {
            if (sources.includes(c.source)) {
                sourceCounts[c.source]++;
            }
        });

        // Тепер виводимо в DOM

        // Загальна кількість
        document.querySelectorAll(".text-info .out-result")[0].querySelector("p").textContent = totalCandidates;

        // Статуси
        let statusIndex = 1; // починаючи з другого .out-result, бо перший - загальна кількість
        statuses.forEach(status => {
            // Кількість
            document.querySelectorAll(".text-info .out-result")[statusIndex].querySelector("p").textContent = statusCounts[status];
            // Відсоток (підрядок після кількості)
            document.querySelectorAll(".text-info .out-result")[statusIndex + 1].querySelector("p").textContent = statusPercentages[status] + "%";
            statusIndex += 2;
        });

        // Джерела (останні 3 блоки)
        const lastResults = document.querySelectorAll(".text-info .out-result");
        sources.forEach((src, i) => {
            lastResults[lastResults.length - sources.length + i].querySelector("p").textContent = sourceCounts[src];
        });

    } catch (err) {
        console.error("Помилка при завантаженні статистики:", err);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    if (window.location.pathname.includes("statistics.html")) {
        loadCandidatesAndCalculateStats();
    }
});

