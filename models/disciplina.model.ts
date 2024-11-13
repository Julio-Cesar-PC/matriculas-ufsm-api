import {DataTypes, Sequelize} from 'sequelize';

export default function (sequelize: Sequelize) {
  return sequelize.define('Disciplina', {
    codigo_disciplina: {
      type: DataTypes.STRING(10),
      allowNull: false,
      primaryKey: true
    },
    nome: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    semestre_disciplina: {
      type: DataTypes.TINYINT,
      allowNull: false
    },
    ementa: {
      type: DataTypes.STRING(220)
    },
    carga_horaria: {
      type: DataTypes.INTEGER
    }
  }, {
    tableName: 'Disciplina'
  });
}