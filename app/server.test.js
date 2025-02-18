const request = require('supertest');
const app = require('./app');

describe('Testando a API de itens', () => {
    it('deve criar um item', async () => {
        const response = await request(app)
            .post('/items')
            .send({ name: 'Item de Teste' });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.name).toBe('Item de Teste');
    });

    it('deve retornar todos os itens', async () => {
        const response = await request(app).get('/items');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('deve atualizar um item', async () => {
        const createResponse = await request(app)
            .post('/items')
            .send({ name: 'Item de Teste' });

        const itemId = createResponse.body.id;
        const response = await request(app)
            .put(`/items/${itemId}`)
            .send({ name: 'Item Atualizado' });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe('Item Atualizado');
    });

    it('deve deletar um item', async () => {
        const createResponse = await request(app)
            .post('/items')
            .send({ name: 'Item de Teste' });

        const itemId = createResponse.body.id;
        const response = await request(app).delete(`/items/${itemId}`);

        expect(response.status).toBe(200);
    });
});
