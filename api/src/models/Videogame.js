const { DataTypes, STRING } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    ID: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type : DataTypes.TEXT,
      allowNull: false,
    },
    releaseDate : {
      type : DataTypes.DATE, 
    },
    rating:{
      type: DataTypes.FLOAT,

    },
    platforms : {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },

  },
  {
    timestamps: false,
  });
};
