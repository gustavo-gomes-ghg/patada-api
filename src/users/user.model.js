const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        id_usp: {
            type: DataTypes.INTEGER, 
            autoIncrement: true, 
            primaryKey: true 
        },
        name_usp: { 
            type: DataTypes.STRING, 
            allowNull: false
        },
        login_usp: { 
            type: DataTypes.STRING, 
            allowNull: false 
        },
        first_name_usp: { 
            type: DataTypes.STRING, 
            allowNull: false 
        },
        last_name_usp: { 
            type: DataTypes.STRING, 
            allowNull: false 
        },
        nick_name_usp: { 
            type: DataTypes.STRING, 
            allowNull: false 
        },
        email_usp: { 
            type: DataTypes.STRING, 
            allowNull: false 
        },
        password_usp: { 
            type: DataTypes.STRING, 
            allowNull: false 
        },
        token_usp: { 
            type: DataTypes.STRING, 
            allowNull: false 
        },
        avatar_usp: { 
            type: DataTypes.STRING,  
        },
        points_usp: { 
            type: DataTypes.INTEGER, 
            allowNull: false, 
            defaultValue: 0 
        },
        level_usp: { 
            type: DataTypes.INTEGER, 
            allowNull: false, 
            defaultValue: 1 
        },
        register_date_usp: { 
            type: DataTypes.DATE, 
            allowNull: false 
        },
        last_access_usp: { 
            type: DataTypes.DATE, 
            allowNull: false 
        },
        role_usp: { 
            type: DataTypes.INTEGER, 
            allowNull: false, 
            defaultValue: 2 
        },
        validation_usp: { 
            type: DataTypes.STRING 
        },
        demonstration_usp: { 
            type: DataTypes.BOOLEAN, 
            allowNull: false, 
            defaultValue: false 
        },
        email_receive_usp: { 
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true 
        },
        payment_usp: { 
            type: DataTypes.TEXT 
        },
        passw_recovery_usp: { 
            type: DataTypes.TEXT 
        },        
    };

    const options = {
        defaultScope: {
            // exclude password hash by default
            attributes: { exclude: ['passwordHash'] }
        },
        scopes: {
            // include hash with this scope
            withHash: { attributes: {}, }
        }
    };

    return sequelize.define('User', attributes, options);
}