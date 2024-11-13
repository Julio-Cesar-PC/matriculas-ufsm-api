import {DataTypes, Sequelize} from 'sequelize';

export default function (sequelize: Sequelize) {
  return sequelize.define('Curso', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nome: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    campus: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    ementa: {
      type: DataTypes.STRING(220)
    },
    centro: {
      type: DataTypes.STRING(10),
      allowNull: false
    }
  }, {
    tableName: 'Curso'
  });
}