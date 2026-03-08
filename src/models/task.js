import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { User } from "./user.js";

export const Task = sequelize.define('tasks', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Ingrese nombre de tarea'
            }
        }
    },

    done: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
});

User.hasMany(Task,
    {
        foreignKey: 'userId',
        sourceKey: 'id'
    });

Task.belongsTo(User,
    {
        foreignKey: 'userId',
        targetKey: 'id'
    });