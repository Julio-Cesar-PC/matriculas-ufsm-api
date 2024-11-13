import {DataTypes, Sequelize} from 'sequelize';

export default function (sequelize: Sequelize) {
  return sequelize.define('Aluno', {
    matricula: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    nome: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    id_curso: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Curso',
        key: 'id'
      }
    }
  }, {
    tableName: 'Aluno'
  });
}