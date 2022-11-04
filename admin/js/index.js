function buscarProdutos(page) {
    let limit = select_limit.value;

    tabela_produtos.innerHTML = ''; 
    
    fetch(`http://localhost:3000/produtos?limit=${limit}&page=${page}`)
        .then(res => res.json())
        .then(dados => {
            dados.map(cadaProduto => {
                tabela_produtos.innerHTML += `
                    <tr>
                        <td>${cadaProduto.id}</td>
                        <td>${cadaProduto.nome}</td>
                        <td>${cadaProduto.categoria}</td>
                        <td>${cadaProduto.valor}</td>
                        <td>${cadaProduto.tamanho}</td>
                    </tr>
                ` 
            })
        });
}

buscarProdutos(0);