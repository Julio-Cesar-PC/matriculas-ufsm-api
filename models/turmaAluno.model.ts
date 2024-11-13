import {DataTypes, Sequelize} from 'sequelize';

export default function (sequelize: Sequelize) {
  return sequelize.define('TurmaAluno', {
    ano_turma: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    semestre_turma: {
      type: DataTypes.ENUM('1', '2'),
      allowNull: false,
      primaryKey: true
    },
    codigo_disciplina: {
      type: DataTypes.STRING(10),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Disciplina',
        key: 'codigo_disciplina'
      }
    },
    Matricula_Aluno: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Aluno',
        key: 'matricula'
      }
    },
    Matricula_Professor: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'Professor',
        key: 'Matricula'
      }
    },
    situacao_aluno: {
      type: DataTypes.ENUM('Matricula', 'Aprovado com nota', 'Reprovado por Frequência', 'Reprovado com Nota')
    }
  }, {
    tableName: 'Turma_Aluno'
  });
}