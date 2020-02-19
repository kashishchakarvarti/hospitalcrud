'use strict';
module.exports = (sequelize, DataTypes) => {
    const speciality = sequelize.define('specialities', {
        specialityId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: DataTypes.TEXT,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
        deletedAt: DataTypes.DATE
    })
    speciality.associate = function (models) {
     // define association for speciality
    }
    return speciality;
};