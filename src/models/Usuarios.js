const {DataTypes} = require('sequelize');
const bcrypt = require('bcrypt-nodejs')

const db = require('../config/db.js');



const Proyectos = require('../models/Proyectos');


const Usuarios = db.define('Usuarios',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement: true
    },
    email:{
        type: DataTypes.STRING(60),
        allowNull:false,
        validate:{
            isEmail:{
                msg: 'Agrega un coreo valido'
            }
        },
        unique:{
            args: true,
            msg: 'Este Usuario Ya esta Registrasdo'
        },
        
        notEmpty:{
            msg: 'el Email no deve de ir vacia'
        } 

    },
    password:{
        type: DataTypes.STRING(60),
        allowNull: true,
        validate:{
            notEmpty:{
                msg: 'La contraseñ no deve de ir vacia'
            } 
        }
    }

},{
    hooks:{
        beforeCreate(usuario){
            usuario.dataValues.password = bcrypt.hashSync(usuario.dataValues.password,bcrypt.genSaltSync(10))
        }
    }
});
// Metodos personalizados
Usuarios.prototype.verificarPassword = function(password){
    return bcrypt.compareSync(password, this.password)
}


Usuarios.hasMany(Proyectos);

module.exports = Usuarios;