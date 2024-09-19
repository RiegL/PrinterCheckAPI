import express from 'express';
import dotenv from 'dotenv';
import knex from './config/database.js';
import cors from 'cors';
import bearerToken from 'express-bearer-token';

// Carregar variáveis de ambiente
dotenv.config();

// Importar rotas
import userRouter from './modules/user/user.route.js';   // rotas para usuários
import authRouter from './modules/auth/auth.route.js'; // rotas para auth
import repairsRouter from './modules/repairs/repairs.route.js'; // rotas para metas
import printersRouter from './modules/printers/printers.route.js'; // rotas para impressoras 
// import logsRouter from './modules/logs/activity_logs.route.js'; // rotas para logs de atividades

const app = express();

// Configurar middlewares
app.use(express.json()); // Para parsing de JSON
app.use(cors()); // Permitir cross-origin requests
app.use(bearerToken()); // Para validação de tokens

// Configurar rotas
app.use('/users', userRouter); // Rotas para usuários
app.use('/auth', authRouter); // Rotas para autenticação
app.use('/repairs', repairsRouter); // Rotas para metas
app.use('/printers', printersRouter); // Rotas para impressoras
// app.use('/logs', logsRouter); // Rotas para logs de atividades

// Iniciar o servidor
app.listen(8080, async () => {
    try {
        await knex.raw('SELECT 1+1 AS result');
        console.log('Database connection successful');
    } catch (err) {
        console.error('Database connection failed', err);
    }
    console.log('Server rodando na porta 8080');
});
