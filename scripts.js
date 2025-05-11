document.addEventListener("DOMContentLoaded", function () {
        const enterButton = document.getElementById("enterButton");

    if (enterButton) {
        enterButton.addEventListener("click", async function () {
            const username = document.getElementById("username").value.trim();
            const password = document.getElementById("password").value.trim();

            if (username === "" || password === "") {
                alert("❌ Будь ласка, введіть логін та пароль!");
                return;
            }

            // Відправляємо запит на сервер для перевірки
            try {
                const response = await fetch('http://localhost:5200/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username, password })
                });

                const data = await response.json();

                if (response.status === 200) {
                    // Якщо успішно - перенаправляємо на головну сторінку
                    window.location.href = "mainPage.html"; 
                } else {
                    alert(data.message); // Виводимо повідомлення про помилку
                }
            } catch (err) {
                console.error('Помилка при запиті до сервера:', err);
                alert('❌ Виникла помилка при підключенні до сервера');
            }
        });
    }
    
    const passwordInput = document.getElementById("password");
    const eyeIcon = document.getElementById("eyeIcon");
    
    if (passwordInput && eyeIcon) {
        eyeIcon.addEventListener("click", function () {
            if (passwordInput.type === "password") {
                passwordInput.type = "text"; 
                eyeIcon.src = "Images/eye.png"; 
            } else {
                passwordInput.type = "password"; 
                eyeIcon.src = "Images/eye-off.png"; 
            }
        });
    }
    
    const modal = document.getElementById("modal-add");
    const addContactBtn = document.querySelector(".add-contact");
    const modalContent = document.querySelector(".modal-add-content");
    const modalOverlay = document.querySelector(".modal-overlay");

    if (modal && addContactBtn && modalContent && modalOverlay) {
        addContactBtn.addEventListener("click", function () {
            modal.style.display = "block";
            modalOverlay.style.display = "block"; 
        });

        modalOverlay.addEventListener("click", function () {
            modal.style.display = "none";
            modalOverlay.style.display = "none"; 
        });

        modal.style.display = "none";
        modalOverlay.style.display = "none"; 
    }

    const modalSort = document.getElementById("modal-sort");
    const sortContactBtn = document.querySelector(".sort");
    const modalContentSort = document.querySelector(".modal-sort-content");

    const modalOverlaySort = document.querySelector(".modal-overlay-sort");

    if (modalSort && sortContactBtn && modalContentSort && modalOverlaySort) {
        sortContactBtn.addEventListener("click", function () {
            modalSort.style.display = "block";
            modalOverlaySort.style.display = "block"; 
        });

        modalOverlaySort.addEventListener("click", function () {
            modalSort.style.display = "none";
            modalOverlaySort.style.display = "none"; 
        });

        modalSort.style.display = "none";
        modalOverlaySort.style.display = "none"; 
    }
});

function setupDropdown(inputId, dropdownId, buttonId) {
    const dropdownInput = document.getElementById(inputId);
    const dropdownButton = document.getElementById(buttonId);
    const dropdown = document.getElementById(dropdownId);

    if (!dropdownInput || !dropdownButton || !dropdown) {
        console.warn(`Dropdown elements missing: ${inputId}, ${dropdownId}, ${buttonId}`);
        return;
    }

    function toggleDropdown() {
        const isVisible = dropdown.style.display === "block";
        closeAllDropdowns();
        dropdown.style.display = isVisible ? "none" : "block";
    }

    function closeAllDropdowns() {
        document.querySelectorAll(".dropdown-modal-sort").forEach(d => d.style.display = "none");
    }

    dropdownInput.addEventListener("click", function(event) {
        toggleDropdown();
        event.stopPropagation();
    });

    dropdownButton.addEventListener("click", function(event) {
        toggleDropdown();
        event.stopPropagation();
    });

    document.addEventListener("click", function(event) {
        if (dropdown && dropdownInput) { 
            if (!dropdown.contains(event.target) && !dropdownInput.contains(event.target)) { 
                closeAllDropdowns();
            }
        }
    });
    

    dropdown.querySelectorAll("li").forEach(option => {
        option.addEventListener("click", function() {
            dropdownInput.value = option.dataset.value;
            closeAllDropdowns();
        });
    });
}

document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("dropdown-input") && document.getElementById("modal-add") && document.getElementById("open-dropdown")) {
        setupDropdown("dropdown-input", "dropdown-modal-sort", "open-dropdown");
    }

    if (document.getElementById("dropdown-input-sort") && document.getElementById("dropdown-modal-sort-data") && document.getElementById("open-dropdown-sort")) {
        setupDropdown("dropdown-input-sort", "dropdown-modal-sort-data", "open-dropdown-sort");
    }

    if (document.getElementById("dropdown-input-sourse") && document.getElementById("dropdown-modal-sort-sourse") && document.getElementById("open-dropdown-sourse")) {
        setupDropdown("dropdown-input-sourse", "dropdown-modal-sort-sourse", "open-dropdown-sourse");
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const userPmg = document.querySelector(".user-pmg");
    const modalMenu = document.getElementById("modal-menu");

    if (userPmg && modalMenu) {
        userPmg.addEventListener("click", function () {
            modalMenu.style.display = "block";
        });

        document.addEventListener("click", function (event) {
            if (!modalMenu.contains(event.target) && !userPmg.contains(event.target)) {
                modalMenu.style.display = "none";
            }
        });
    }
});

const nextStatistics = document.getElementById("nextStatistics");
if (nextStatistics) {
    nextStatistics.addEventListener("click", function() {
        window.location.href = "statistics.html";
    });
}

const nextExit = document.getElementById("nextExit");
if (nextExit) {
    nextExit.addEventListener("click", function() {
        window.location.href = "exit.html";
    });
}

document.addEventListener("DOMContentLoaded", function () {
    const modalComent = document.getElementById("modal-coment");
    const modalOverlay = document.getElementById("modal-overlay-coment");
    const comentImages = document.querySelectorAll(".coment-img");

    if (modalComent && modalOverlay && comentImages.length > 0) {
        
        comentImages.forEach(img => {
            img.addEventListener("click", function () {
                modalComent.style.display = "block";
                modalOverlay.style.display = "block";
            });
        });

        modalOverlay.addEventListener("click", function () {
            modalComent.style.display = "none";
            modalOverlay.style.display = "none"; 
        });

        modalComent.style.display = "none";
        modalOverlay.style.display = "none"; 
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const addContact = document.getElementById("button-addContact");

    if (addContact) {
        addContact.addEventListener("click", async function () {
            const fullName = document.getElementById("fullName").value.trim();
            const phoneNumber = document.getElementById("phoneNumber").value.trim();
            const source = document.getElementById("dropdown-input-sourse").value.trim();
            const status = null;

            if (fullName === "") {
                alert("❌ Поле 'ПІБ' не заповнене!");
                return;
            }
            if (phoneNumber === "") {
                alert("❌ Поле 'Номер телефону' не заповнене!");
                return;
            }
            if (source === "" || source === "Оберіть варіант") {
                alert("❌ Поле 'Джерело' не заповнене!");
                return;
            }

            const newContact = {
                full_name: fullName,
                phoneNumber,
                source,
            };

            console.log("Перед запитом на сервер:", newContact);

            try {
                const response = await fetch('http://localhost:5200/api/temp-candidates', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newContact)
                });

                if (!response.ok) {
                    const errData = await response.json();
                    throw new Error(errData.message || 'Помилка збереження на сервері');
                }

                const result = await response.json();
                console.log("✅ Відповідь сервера:", result);

                const savedContact = result.data;  // має містити id
                localStorage.setItem("newContact", JSON.stringify(savedContact));

                window.location.href = "addContact.html";
            } catch (error) {
                console.error("❌ Помилка при збереженні:", error.message);
                alert("Помилка при збереженні: " + error.message);
            }
        });
    }
});


document.addEventListener("DOMContentLoaded", function () {
    const contactData = localStorage.getItem("newContact");

    if (contactData) {
        console.log("Дані отримано з localStorage:", contactData);  // Перевірка отриманих даних
        const contact = JSON.parse(contactData);

        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString('uk-UA', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });

        const recruiter = "Дмитро";
        const index = 1;

        const newLine = document.createElement("div");
        newLine.classList.add("line-table");

        newLine.innerHTML = 
            `<div class="column column-1">${index}</div>
            <div class="column column-2">${contact.full_name}</div> 
            <div class="column column-3">${contact.phonenumber}</div>
            <div class="column column-4">
                <div class="change-status">
                    <div class="polygon">
                        <img src="Images/Polygon 3.png" alt="Більше">
                    </div>
                </div>
            </div>
            <div class="column column-5">
                <div class="change-sourse">${contact.source}</div>
            </div>
            <div class="column column-6">${recruiter}</div>
            <div class="column column-7">${formattedDate}</div>
            <div class="column column-8"><img class="coment-img" src="Images/🦆 icon _speech_.png"></div>
        `;

        const table = document.querySelector(".title-table-new");
        if (table) {
            table.insertAdjacentElement("afterend", newLine);
        }
    } else {
        console.log("Дані не знайдені в localStorage.");
    }
});

document.querySelector('.addContact').addEventListener('click', async () => {
    const contactData = localStorage.getItem("newContact");
    console.log("contactData з localStorage:", contactData);

    const status = localStorage.getItem("selectedStatus");

    // Перевірка на наявність даних в localStorage
    if (!contactData || !status) {
        alert("Немає всіх необхідних даних.");
        return;
    }

    // Перетворюємо contactData з JSON-стрічки в об'єкт
    const temp = JSON.parse(contactData);

    // Створюємо новий об'єкт з полями
    const contact = {
        full_name: temp.full_name,
        phoneNumber: temp.phonenumber,
        source: temp.source,
        status: status
    };

    console.log("Перед відправкою на сервер:", contact);

    try {
        const response = await fetch('http://localhost:5200/api/candidates', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(contact)
        });

        const result = await response.json();

        if (response.ok) {
            alert("✅ Кандидат доданий до бази!");
            localStorage.removeItem("newContact");
            localStorage.removeItem("selectedStatus");
            window.location.href = "mainPage.html";
        } else {
            alert("❌ Помилка: " + result.error);
        }
    } catch (err) {
        console.error("Помилка при надсиланні:", err);
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const returnBack = document.querySelector(".turnBack");

    if (returnBack) {
        returnBack.addEventListener("click", function () {
            console.log("Кнопка повернення натиснута ✅");
            window.location.href = "mainPage.html";
        });
    } else {
        console.warn("⚠️ Кнопка повернення НЕ знайдена в DOM!");
    }
});

document.querySelectorAll(".change-status").forEach(element => {
    switch (element.textContent.trim()) {
        case "Співбесіда":
            element.style.backgroundColor = "rgba(163, 233, 198, 0.5)"; 
            break;
        case "НБТ":
            element.style.backgroundColor = "rgba(180, 186, 192, 0.5)"; 
            break;
        case "Отказ":
            element.style.backgroundColor = "rgba(240, 102, 102, 0.5)"; 
        case "Неактуально":
            element.style.backgroundColor = "rgba(254, 204, 96, 0.5)"; 
            break;
        case "Не підходить":
            element.style.backgroundColor = "rgba(202, 110, 82, 0.5)"; 
            break;
        case "Перезвон":
            element.style.backgroundColor = "rgba(212, 228, 119, 0.5)"; 
            break;
    }
});

function applySourceColors() {
    document.querySelectorAll(".change-sourse").forEach(element => {
        switch (element.textContent.trim()) {
            case "Work":
                element.style.backgroundColor = "rgba(82, 134, 210, 0.5)";
                break;
            case "Jooble":
                element.style.backgroundColor = "rgba(95, 177, 228, 0.5)";
                break;
            case "Robota":
                element.style.backgroundColor = "rgba(255, 82, 82, 0.5)";
                break;
        }
    });
}

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".change-status").forEach(element => {
        let polygon = element.querySelector(".polygon");

        if (polygon) {
            let dropdown = document.createElement("div");
            dropdown.classList.add("dropdown-menu");
            let statuses = ["Співбесіда", "НБТ", "Неактуально", "Не підходить", "Отказ", "Перезвон"];

            statuses.forEach(status => {
                let option = document.createElement("div");
                option.textContent = status;
                option.addEventListener("click", function () {
                    element.textContent = status; 
                    polygon.style.display = "none"; 

                    switch (status) {
                        case "Співбесіда": element.style.backgroundColor = "rgba(163, 233, 198, 0.5)"; break;
                        case "НБТ": element.style.backgroundColor = "rgba(180, 186, 192, 0.5)"; break;
                        case "Отказ": element.style.backgroundColor = "rgba(240, 102, 102, 0.5)"; break;
                        case "Неактуально": element.style.backgroundColor = "rgba(254, 204, 96, 0.5)"; break;
                        case "Не підходить": element.style.backgroundColor = "rgba(202, 110, 82, 0.5)"; break;
                        case "Перезвон": element.style.backgroundColor = "rgba(212, 228, 119, 0.5)"; break;
                    }

                    dropdown.style.display = "none"; 

                    let selectedStatus = element.textContent.trim();
                    console.log(`Передаємо статус: ${selectedStatus}`);
                    localStorage.setItem("selectedStatus", selectedStatus);
                });
                dropdown.appendChild(option);
            });

            element.appendChild(dropdown); 

            element.addEventListener("click", function (event) {
                event.stopPropagation(); 
                dropdown.style.display = "flex";
            });

            document.addEventListener("click", function () {
                dropdown.style.display = "none";
            });

            element.style.position = "relative";
        }
    });
});





