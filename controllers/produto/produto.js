const {executarNoBanco} = require('../../connection');
let fs = require('fs');

async function listar(params) {
    let limit = params.limit || 10; 
    let page = (params.page || 0) * limit;

    return await executarNoBanco(`SELECT * FROM produtos LIMIT ${page},${limit}`);
}

function criar(produto) {
    let produtos = listar()
    produtos.push(produto);
    fs.writeFileSync('controllers/produto/produtos.chuchu', JSON.stringify(produtos))
    return listar()
}

function atualizar() {
    return "Atualizar produto"
}

function deletar(produto_id) {
    produtos = produtos.filter((prod) => prod.id != produto_id)
    return JSON.stringify(produtos)
}

module.exports = {
    listar: listar,
    criar: criar,
    atualizar: atualizar,
    deletar: deletar
}