export const User = (sequelize, DataTypes) => {
    sequelize.define('users', {
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
                args: [[Status.ACTIVE, Status.INACTIVE]],
                msg: 'El estado debe ser Status.ACTIVE o Status.INACTIVE'
            }
        }
    })
}