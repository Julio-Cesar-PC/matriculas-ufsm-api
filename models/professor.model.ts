import {DataTypes, Sequelize} from 'sequelize';

export default function (sequelize: Sequelize) {
  return sequelize.define('Professor', {
    Matricula: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    nome: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    centro: {
      type: DataTypes.STRING(10),
      allowNull: false
    }
  }, {
    tableName: 'Professor'
  });
}