import bcrypt from 'bcrypt';
import User from '../models/User.js';
import jwt from 'jsonwebtoken'
export const registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body; //Dados que serão importados da tela de login do front-end
        if (!name || !email || !password) { //Caso um dos campos não seja preenchido
            return res.status(400).json({error: 'Todos os campos são obrigatórios!'});
        }
        const verificaEmail = await User.findOne({
            where: {email}
        });
        if (verificaEmail) {
            return res.status(409).json({error: 'E-mail já existe no sistema!'});
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const novoUsuario = await User.create({name, email, password: hashPassword}); //Cadastro de novo usuário no banco de dados
        const {password: _, ...userData} = novoUsuario.toJSON();
        res.status(201).json({message: 'Usuário registrado com sucesso!', user: userData}); 
        
    } catch (err) {
        res.status(500).json({error: 'Erro ao registrar usuário!'}); 
    }
};
export const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({where: {email}}); //Procura pelo usuário no banco de dados
        if (!user) {
            return res.status(401).json({error: 'E-mail ou senha inválidos!'});
        }
        if (password.length < 8) {
            return res.status(400).json({ 
                error: 'A senha deve ter no mínimo 8 caracteres' 
            });
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).json({error: 'Senha incorreta!'});
        }
        const {password: _, ...userData} = user.toJSON();
        // Gerar token JWT
        const secret = process.env.JWT_SECRET || "a_raposa_invadiu_o_galinheiro";
        const token = jwt.sign(
            { id: user.id, email: user.email }, 
              secret,             
            { expiresIn: '7d' }
        );
        res.json({message: 'Login feito com sucesso!', user: userData, token});
    } catch (err) {
        console.error("Erro no login: ", err);
        res.status(500).json({error: 'Erro ao fazer login!'});
    }
};
