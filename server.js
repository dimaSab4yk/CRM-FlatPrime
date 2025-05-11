const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
require('dotenv').config();

const app = express();
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }  // Потрібно для підключення через SSL
});

app.use(cors());
app.use(express.json()); // Для обробки JSON-тіла запитів

// Маршрут для перевірки логіну та паролю
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const result = await pool.query(
            'SELECT * FROM recruiters WHERE email = $1 AND password = $2',
            [username, password]
        );

        if (result.rows.length > 0) {
            res.status(200).json({ message: 'Успішний вхід!' });
        } else {
            res.status(401).json({ message: 'Невірний логін або пароль' });
        }
    } catch (err) {
        console.error('Помилка при перевірці логіну та паролю:', err);
        res.status(500).json({ message: 'Виникла помилка на сервері' });
    }
});

app.post('/api/temp-candidates', async (req, res) => {
    const { full_name, phoneNumber, source } = req.body;

    if (!full_name || !phoneNumber || !source) {
        return res.status(400).json({ error: 'Всі поля є обов’язковими.' });
    }

    try {
        const query = `
            INSERT INTO temp_candidates (full_name, phoneNumber, source)
            VALUES ($1, $2, $3)
            RETURNING *;
        `;
        const values = [full_name, phoneNumber, source];

        const result = await pool.query(query, values);
        res.status(201).json({ message: 'Контакт тимчасово збережено', data: result.rows[0] });
    } catch (err) {
        console.error('❌ Помилка при збереженні до бази:', err);
        res.status(500).json({ error: 'Помилка сервера при збереженні.' });
    }
});

app.post('/api/candidates', async (req, res) => {
    try {
        const { full_name, phoneNumber, status, source } = req.body;
        console.log("Перед відправкою на сервер:", full_name, phoneNumber, status, source);

        if (!full_name || !phoneNumber || !source || !status) {
            return res.status(400).json({ error: "Всі поля обов'язкові для заповнення." });
        }

        const insertQuery = `
            INSERT INTO candidates (full_name, phonenumber, status, source)
            VALUES ($1, $2, $3, $4)
        `;

        await pool.query(insertQuery, [full_name, phoneNumber, status, source]);

        res.status(200).json({ message: 'Кандидат успішно доданий до основної таблиці' });
    } catch (err) {
        console.error('Помилка при збереженні кандидата:', err);
        res.status(500).json({ error: 'Помилка сервера при збереженні кандидата' });
    }
});


// Запуск сервера
app.listen(5200, () => {
    console.log('Сервер запущено на порту 5200');
});
