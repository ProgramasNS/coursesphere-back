import jwt from 'jsonwebtoken';
/*
* Este módulo foi criado para autenticar o usuário admin, o qual é o único que possui autorização para criar e 
* criar e editar cursos.
*/
export default function authMiddleware(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if(!token) {
        return res.status(401).json({error: "Token não fornecido"});
    }

    try {
        const secret = process.env.JWT_SECRET || "a_raposa_invadiu_o_galinheiro";
        const decoded = jwt.verify(token, secret);
        req.user = decoded; 
        next();

    } catch (err) {
        return res.status(401).json({error: 'Token inválido!'})
    }
}

