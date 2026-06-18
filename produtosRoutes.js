import express from 'express';
import{ 
    listarprodutos
} from '../carrinho.js'

const router = express.Router();

router.get('/', listarprodutos);

export default router;
