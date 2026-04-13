// 1. Importação das bibliotecas (Monolito - Tudo em um só lugar)
const express = require('express');
const cors = require('cors');

// 2. Inicialização do App
const app = express();
const PORTA = 3000; // Porta que o servidor vai escutar

// 3. Configuração dos Middlewares (Regras Globais)
app.use(cors());            // Habilita CORS para qualquer origem
app.use(express.json());    // Permite receber JSON no body (bom para futuras rotas POST)

// 4. --- DEFINIÇÃO DAS ROTAS (API REST) ---
//    Rota GET de Boas-Vindas (Ponto de Entrada Raiz)
app.get('/', (requisicao, resposta) => {
    // Lógica do endpoint
    console.log('📡 Alguém acessou a rota /'); // Log no terminal do VS Code

    // Resposta no formato JSON (Padrão REST)
    resposta.status(200).json({
        mensagem: 'Bem-vindo à API REST monolítica!',
        versao: '1.0.0',
        autor: 'Engenheiro de Software',
        instrucao: 'Tente acessar /saudacao?nome=SeuNome'
    });
});

//    Rota GET com Parâmetro de Query (Opcional)
//    Exemplo: http://localhost:3000/saudacao?nome=Lucas
app.get('/saudacao', (requisicao, resposta) => {
    const nome = requisicao.query.nome || 'Visitante';
    
    resposta.status(200).json({
        saudacao: `Olá, ${nome}!`,
        mensagem: 'API funcionando perfeitamente com Node + Express + CORS.'
    });
});

//    Rota Padrão para caminhos não encontrados (404)
app.use((requisicao, resposta) => {
    resposta.status(404).json({
        erro: 'Rota não encontrada',
        dica: 'Tente acessar apenas a raiz (/)'
    });
});

// 5. Subida do Servidor (Listen)
app.listen(PORTA, () => {
    console.log('=========================================');
    console.log(`🚀 Servidor rodando na porta ${PORTA}`);
    console.log(`🌐 Acesse: http://localhost:${PORTA}`);
    console.log('=========================================');
});