import db from '../config/db.js';

export const listarprodutos = (req, res)=>{

   db.query('SELECT * FROM produtos', (err, results)=>{

    if(err) return res.status(500).json( {erro: 'Erro ao buscar produtos'});
    res.json(results);

   });
}



app.post('/carrinho/adicionar', async (req, res) => {

    try {

        const usuario = req.session.usuario;

        if (!usuario) {
            return res.status(401).json({
                sucesso: false,
                erro: 'Faça login'
            });
        }

        const { produto_id } = req.body;

        await pool.query(
            `
            INSERT INTO carrinho
            (usuario_id, produto_id, quantidade)
            VALUES ($1, $2, 1)
            `,
            [usuario.id, produto_id]
        );

        res.json({
            sucesso: true
        });

    } catch (erro) {

        console.error(erro);

        res.status(500).json({
            sucesso: false,
            erro: 'Erro ao adicionar produto'
        });

    }

});

async function carregarCarrinho() {

    try {

        const resposta = await fetch(
            'http://127.0.0.1:5500/carrinho.html',
            {
                credentials: 'include'
            }
        );

        if (!resposta.ok) {

            document.getElementById('listaCarrinho').innerHTML =
                '<p>Faça login para visualizar seu carrinho.</p>';

            return;
        }

        const produtos = await resposta.json();

        let html = '';

        let total = 0;

        produtos.forEach(produto => {

            const subtotal =
                produto.preco * produto.quantidade;

            total += subtotal;

            html += `
                <div class="produto">

                    <div>

                        <h3>${produto.nome}</h3>

                        <p>
                            Quantidade:
                            ${produto.quantidade}
                        </p>

                    </div>

                    <span>
                        R$ ${subtotal.toFixed(2)}
                    </span>

                </div>
            `;

        });

        if (produtos.length === 0) {

            html =
                '<p>Seu carrinho está vazio.</p>';

        }

        document.getElementById('listaCarrinho').innerHTML =
            html;

        document.getElementById('valorTotal').innerHTML =
            `R$ ${total.toFixed(2)}`;

    } catch (erro) {

        console.error(erro);

        document.getElementById('listaCarrinho').innerHTML =
            '<p>Erro ao carregar carrinho.</p>';

    }

}

function finalizarCompra() {

    alert(
        'Compra finalizada com sucesso!'
    );

}

carregarCarrinho();