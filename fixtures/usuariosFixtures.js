const {executarNoBanco} = require('../connection');
const {faker} = require('@faker-js/faker/locale/pt_BR');

let query = 'INSERT INTO usuarios (nome, cidade, idade) VALUES ';

for (let i = 1; i <= 100; i++) {
    query += `('${faker.name.fullName()}', '${faker.address.cityName()}', '${faker.random.numeric(2)}'),`;

    console.log('Inserindo no banco a linha '+i);
}

executarNoBanco(query.substring(0, query.length - 1));