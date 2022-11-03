const {executarNoBanco} = require('../connection');
const {faker} = require('@faker-js/faker/locale/pt_BR');

let query = 'INSERT INTO produtos (nome, categoria, tamanho, valor) VALUES ';

for (let i = 1; i <= 100; i++) {
    // query += `('', '', '', ''),`;
    query += `(
        '${faker.commerce.product()}', 
        '${faker.commerce.department()}', 
        '${faker.random.numeric(1)}', 
        '${faker.commerce.price()}'
    ),`;

    console.log('Inserindo no banco a linha '+i);
}

query = query.substring(0, query.length - 1);

executarNoBanco(query);