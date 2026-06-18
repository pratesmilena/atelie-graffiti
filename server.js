import express from 'express';
import dotenv from 'dotenv';
import produtosRoutes from  './produtosRoutes.js';
dotenv.config();

const app = express();
app.use(express.json());
app.use('/produtos', produtosRoutes);



const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`Servidor rodando em http://localhost:$[PORT]`);
})
