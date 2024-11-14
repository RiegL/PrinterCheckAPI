import jwt from 'jsonwebtoken';
import { getById } from '../modules/user/index.js';

export const authMiddleware = async (req, res, next) => {
  try {
    const isValid = jwt.verify(req.token, process.env.JWT_SECRET); //verifica o token
    const user = await getById(isValid.id);
    req.user = user;
    next();
} catch (error) {
    return res.status(403).json({ message: 'Token inválido'});
}
};

export default authMiddleware;

