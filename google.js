app.post('/login-google', async (req, res) => {

    const { google_id, nome, email} = req.body;

    let usuario = await pool.query(
        'SELECT * FROM usuarios WHERE email = $1',
        [email]
    );

    if(usuario.rows.length === 0){

        usuario = await pool.query(
            `INSERT INTO usuarios
            (google_id,nome,email)
            VALUES ($1,$2,$3)
            RETURNING *`,
            [google_id,nome,email]
        );

    }

    req.session.usuario = usuario.rows[0];

    res.json({
        sucesso:true
    });
});

function handleCredentialResponse(response){

    const payload =
    JSON.parse(
        atob(response.credential.split('.')[1])
    );

    fetch('/login-google',{

        method:'POST',

        headers:{
            'Content-Type':'application/json'
        },

        body:JSON.stringify({

            google_id: payload.sub,
            nome: payload.name,
            email: payload.email,

        })

    })
    .then(res=>res.json())
    .then(()=>{

        window.location.href =
        "index.html";

    });
}