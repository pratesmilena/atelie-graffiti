// Pega os elementos do HTML do carrinho
const containerCarrinho = document.getElementById('container-carrinho');
const campoTotal = document.getElementById('valor-total');

// Pega os itens salvos no navegador
let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

function exibirCarrinho() {
    containerCarrinho.innerHTML = ''; // Limpa a tela antes de desenhar
    let somaTotal = 0;

    if (carrinho.length === 0) {
        containerCarrinho.innerHTML = '<p style="color: gray;">Seu carrinho está vazio.</p>';
        campoTotal.innerText = '0.00';
        return;
    }

    // Passa por cada produto do carrinho
    carrinho.forEach((item, index) => {
        const subtotal = item.preco * item.quantidade;
        somaTotal += subtotal;

        containerCarrinho.innerHTML += `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; background: #1a1a1a; padding: 15px; border-radius: 5px; border-left: 4px solid #adff2f;">
                <div>
                    <strong style="color: #fff; font-size: 1.1rem;">${item.nome}</strong> <br>
                    <span style="color: #aaa;">R$ ${item.preco.toFixed(2)} cada</span>
                </div>
                
                <div style="display: flex; align-items: center; gap: 15px;">
                    <div style="display: flex; align-items: center; background: #222; border-radius: 5px; padding: 5px;">
                        <button onclick="alterarQuantidade(${index}, -1)" style="background: none; border: none; color: #adff2f; font-weight: bold; cursor: pointer; padding: 0 10px;">-</button>
                        <span style="color: #fff; padding: 0 5px;">${item.quantidade}</span>
                        <button onclick="alterarQuantidade(${index}, 1)" style="background: none; border: none; color: #adff2f; font-weight: bold; cursor: pointer; padding: 0 10px;">+</button>
                    </div>
                    
                    <div style="color: #fff; text-align: right; min-width: 100px;">
                        <strong style="color: #adff2f;">R$ ${subtotal.toFixed(2)}</strong>
                    </div>

                    <button onclick="removerItem(${index})" style="background: #ff4d4d; border: none; color: white; padding: 5px 10px; border-radius: 3px; cursor: pointer; font-weight: bold;">
                        🗑️
                    </button>
                </div>
            </div>
        `;
    });

    // Atualiza o valor total na tela
    campoTotal.innerText = somaTotal.toFixed(2);
}

// Função para aumentar ou diminuir a quantidade
function alterarQuantidade(index, mudanca) {
    carrinho[index].quantidade += mudanca;

    // Se a quantidade chegar a 0, remove o item automaticamente
    if (carrinho[index].quantidade <= 0) {
        removerItem(index);
        return;
    }

    // Salva as alterações no navegador e recarrega a tela
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    exibirCarrinho();
}

// Função para deletar o produto do carrinho de vez
function removerItem(index) {
    // Remove 1 item da lista baseado na posição dele (index)
    carrinho.splice(index, 1); 

    // Salva a lista atualizada no navegador e recarrega a tela
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    exibirCarrinho();
}

// Executa a função assim que a página abre
exibirCarrinho();

// Função para alternar visualmente entre Pix e Cartão
function alternarMetodoPagamento(metodo) {
    const divPix = document.getElementById('conteudo-pix');
    const divCartao = document.getElementById('conteudo-cartao');

    if (metodo === 'pix') {
        divPix.style.display = 'block';
        divCartao.style.display = 'none';
    } else if (metodo === 'cartao') {
        divPix.style.display = 'none';
        divCartao.style.display = 'block';
    }
}

// Função para simular o encerramento da compra
function finalizarCompra() {
    // 1. Verifica se o carrinho não está vazio
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio! Adicione algum produto antes de finalizar.");
        return;
    }

    // 2. Descobre qual método estava selecionado
    const metodoSelecionado = document.querySelector('input[name="forma-pagamento"]:checked').value;

    if (metodoSelecionado === 'pix') {
        alert("Pedido recebido! Aguardando a confirmação do pagamento via Pix. 🎨");
    } else {
        alert("Pagamento aprovado com sucesso no Cartão de Crédito! Obrigado pela compra. 🎨");
    }

    // 3. Limpa o carrinho no navegador após a compra fictícia ser concluída
    localStorage.removeItem('carrinho');
    
    // 4. Redireciona de volta para a Home/Página inicial
    window.location.href = "index.html";
}