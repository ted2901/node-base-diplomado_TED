import { sequelize } from '../database/database.js'
import { DataTypes } from 'sequelize';
import { Status } from '../constants/index.js';

import { encriptar } from '../common/byscript.js';

export const User = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'El nombre de usuario es obligatorio'
            }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'La contraseña es obligatoria'
            }
        }
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: Status.ACTIVE,
        validate: {
            isIn: {
                args: [[Status.ACTIVE, Status.INACTIVE]],
                msg: 'El estado debe ser ACTIVO o INACTIVO'
            }
        }
    }
});


User.beforeCreate(async (user) => {
    user.password = await encriptar(user.password)
});

