// Arquivo de Rotas da API - CORRIGIDO
const express = require('express');
const router = express.Router();

// Importa os controladores
const cardapioController = require('../controllers/cardapio.controller');
const comandasController = require('../controllers/comandas.controller');
const usuariosController = require('../controllers/usuarios.controller');

// ========== ROTAS DO CARDÁPIO ==========
// GET /api/cardapio - Retorna todo o cardápio
router.get('/cardapio', cardapioController.listarcardapio);

// Se você tiver a função getCardapioItem no controller, descomente abaixo:
// router.get('/cardapio/:id', cardapioController.getCardapioItem);

// ========== ROTAS DAS COMANDAS ==========
// GET /api/comandas - Retorna todas as comandas
router.get('/comandas', comandasController.getComandas);

// POST /api/comandas - Cria uma nova comanda
router.post('/comandas', comandasController.createComanda);

// PATCH /api/comandas/:id - Atualiza o status de uma comanda (ex: pendente -> pronto)
router.patch('/comandas/:id', comandasController.updateComandaStatus);

// DELETE /api/comandas/:id - Deleta uma comanda
router.delete('/comandas/:id', comandasController.deleteComanda);

// ========== ROTAS DOS USUÁRIOS ==========
// GET /api/usuarios - Retorna todos os usuários
router.get('/usuarios', usuariosController.listarUsuarios);  // Alterado de getUsuarios para listarUsuarios

// GET /api/usuarios/:id - Retorna um usuário específico
router.get('/usuarios/:id', usuariosController.buscarUsuarioPorId);

// POST /api/usuarios - Cria um novo usuário
router.post('/usuarios', usuariosController.criarUsuario);

// PUT /api/usuarios/:id - Atualiza um usuário
router.put('/usuarios/:id', usuariosController.atualizarUsuario);

// DELETE /api/usuarios/:id - Deleta um usuário
router.delete('/usuarios/:id', usuariosController.deletarUsuario);

// Exporta o router para ser usado no server.js
module.exports = router;