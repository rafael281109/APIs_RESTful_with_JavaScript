// Controller de Usuários
let usuarios = [
    {
        id: 1,
        nome: "João Silva",
        email: "joao@email.com",
        telefone: "(87) 99999-9999",
        dataCadastro: new Date()
    },
    {
        id: 2,
        nome: "Maria Santos",
        email: "maria@email.com",
        telefone: "(87) 98888-8888",
        dataCadastro: new Date()
    }
];

// @desc    Listar todos os usuários
// @route   GET /api/usuarios
exports.listarUsuarios = (req, res) => {
    try {
        res.status(200).json({
            success: true,
            count: usuarios.length,
            data: usuarios
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Erro ao listar usuários",
            error: error.message
        });
    }
};

// @desc    Buscar um usuário por ID
// @route   GET /api/usuarios/:id
exports.buscarUsuarioPorId = (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const usuario = usuarios.find(u => u.id === id);
        
        if (!usuario) {
            return res.status(404).json({
                success: false,
                message: `Usuário com id ${id} não encontrado`
            });
        }
        
        res.status(200).json({
            success: true,
            data: usuario
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Erro ao buscar usuário",
            error: error.message
        });
    }
};

// @desc    Criar novo usuário
// @route   POST /api/usuarios
exports.criarUsuario = (req, res) => {
    try {
        const { nome, email, telefone } = req.body;
        
        // Validação dos campos obrigatórios
        if (!nome || !email) {
            return res.status(400).json({
                success: false,
                message: "Por favor, informe nome e email"
            });
        }
        
        // Verificar se email já existe
        const emailExistente = usuarios.find(u => u.email === email);
        if (emailExistente) {
            return res.status(400).json({
                success: false,
                message: "Este email já está cadastrado"
            });
        }
        
        // Criar novo usuário
        const novoUsuario = {
            id: usuarios.length + 1,
            nome,
            email,
            telefone: telefone || "",
            dataCadastro: new Date()
        };
        
        usuarios.push(novoUsuario);
        
        res.status(201).json({
            success: true,
            message: "Usuário criado com sucesso",
            data: novoUsuario
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Erro ao criar usuário",
            error: error.message
        });
    }
};

// @desc    Atualizar um usuário
// @route   PUT /api/usuarios/:id
exports.atualizarUsuario = (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const index = usuarios.findIndex(u => u.id === id);
        
        if (index === -1) {
            return res.status(404).json({
                success: false,
                message: `Usuário com id ${id} não encontrado`
            });
        }
        
        const { nome, email, telefone } = req.body;
        
        // Verificar se email já existe (se estiver sendo alterado)
        if (email && email !== usuarios[index].email) {
            const emailExistente = usuarios.find(u => u.email === email);
            if (emailExistente) {
                return res.status(400).json({
                    success: false,
                    message: "Este email já está em uso por outro usuário"
                });
            }
        }
        
        // Atualizar apenas os campos fornecidos
        usuarios[index] = {
            ...usuarios[index],
            nome: nome || usuarios[index].nome,
            email: email || usuarios[index].email,
            telefone: telefone !== undefined ? telefone : usuarios[index].telefone
        };
        
        res.status(200).json({
            success: true,
            message: "Usuário atualizado com sucesso",
            data: usuarios[index]
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Erro ao atualizar usuário",
            error: error.message
        });
    }
};

// @desc    Deletar um usuário
// @route   DELETE /api/usuarios/:id
exports.deletarUsuario = (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const index = usuarios.findIndex(u => u.id === id);
        
        if (index === -1) {
            return res.status(404).json({
                success: false,
                message: `Usuário com id ${id} não encontrado`
            });
        }
        
        const usuarioDeletado = usuarios[index];
        usuarios.splice(index, 1);
        
        res.status(200).json({
            success: true,
            message: "Usuário deletado com sucesso",
            data: usuarioDeletado
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Erro ao deletar usuário",
            error: error.message
        });
    }
};