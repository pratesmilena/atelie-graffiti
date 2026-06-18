// Cria o carrinho vazio ou recupera o que já estava salvo
let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

// Seleciona todos os botões que têm a classe 'btn-comprar'
const botoesComprar = document.querySelectorAll('.btn-comprar');

botoesComprar.forEach(botao => {
    botao.addEventListener('click', (evento) => {
        // Pega as informações do botão que foi clicado
        const id = evento.target.getAttribute('data-id');
        const nome = evento.target.getAttribute('data-nome');
        const preco = parseFloat(evento.target.getAttribute('data-preco'));

        // Monta o objeto do produto
        const produto = { id, nome, preco, quantidade: 1 };

        // Verifica se o produto já está no carrinho
        const itemExistente = carrinho.find(item => item.id === id);

        if (itemExistente) {
            itemExistente.quantidade++; // Se já existe, só aumenta a quantidade
        } else {
            carrinho.push(produto); // Se é novo, adiciona na lista
        }

        // Salva a lista atualizada na memória do navegador (LocalStorage)
        localStorage.setItem('carrinho', JSON.stringify(carrinho));

        // Alerta rápido para você ver funcionando
        alert(`${nome} foi adicionado ao carrinho!`);
    });
});