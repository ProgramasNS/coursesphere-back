import {DataTypes} from 'sequelize';
import sequelize from "../config/db.js";
//Criação do modelo User para o usuário
const User = sequelize.define('User', {
    name: {type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, allowNull: false, unique: true},
    password: {type: DataTypes.STRING, allowNull: false}
});
export default User;