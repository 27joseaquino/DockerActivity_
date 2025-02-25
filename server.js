const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

db.connect(err => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err.message);
        process.exit(1);
    }
    console.log('Conectado ao banco de dados');
});

app.post('/items', (req, res) => {
    console.log('Recebendo requisição POST em /items');
    const { name } = req.body;
    db.query('INSERT INTO items (name) VALUES (?)', [name], (err, result) => {
        if (err) {
            console.error('Erro ao inserir no banco de dados:', err);
            return res.status(500).json(err);
        }
        res.status(201).json({ id: result.insertId, name });
    });
});

// Read
app.get('/items', (req, res) => {
    db.query('SELECT * FROM items', (err, results) => {
        if (err) return res.status(500).json(err);
        res.status(200).json(results);
    });
});

// Update
app.put('/items/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    db.query('UPDATE items SET name = ? WHERE id = ?', [name, id], (err) => {
        if (err) return res.status(500).json(err);
        res.status(200).json({ id, name });
    });
});

// Delete
app.delete('/items/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM items WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).json(err);
        res.status(200).send();
    });
});


app.listen(3001, () => {
    console.log('Aplicação rodando na porta 3001');

});



/*describe('Testando a API de itens', () => {
    it('deve criar um item', async () => {
        const response = await request(app).post('/itens').send({ name: 'item1' });
        expect(response.status).toBe(201);
    });
});*/