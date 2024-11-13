import {DataTypes, Sequelize} from 'sequelize';

export default function (sequelize: Sequelize) {
  return sequelize.define('Sala', {
    centro: {
      type: DataTypes.STRING(10),
      allowNull: false,
      primaryKey: true
    },
    numero: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    capacidade_alunos: {
      type: DataTypes.TINYINT,
      allowNull: false
    },
    tipo: {
      type: DataTypes.ENUM('Laboratório', 'Sala'),
      allowNull: false
    }
  }, {
    tableName: 'Sala',
    indexes: [
      {
        unique: true,
        fields: ['centro', 'numero']
      }
    ]
  });
}