'use strict';
module.exports = (sequelize, DataTypes) => {
    const doctors = sequelize.define('doctors', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: DataTypes.TEXT,
      createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
        deletedAt: DataTypes.DATE,
    })
    doctors.associate = function (models) {
     // define association here
    }
    return doctors;
};