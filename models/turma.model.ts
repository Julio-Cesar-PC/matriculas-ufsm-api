import {DataTypes, Sequelize} from 'sequelize';

export default function (sequelize: Sequelize) {
  return sequelize.define('Turma', {
    ano: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    semestre_turma: {
      type: DataTypes.ENUM('1', '2'),
      allowNull: false,
      primaryKey: true
    },
    N_vagas: {
      type: DataTypes.INTEGER
    },
    data_inicio: {
      type: DataTypes.DATE
    },
    data_fim: {
      type: DataTypes.DATE
    },
    codigo_disciplina: {
      type: DataTypes.STRING(10),
      allowNull: false,
      references: {
        model: 'Disciplina',
        key: 'codigo_disciplina'
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
    Centro_Sala: {
      type: DataTypes.STRING(10),
      allowNull: false,
      references: {
        model: 'Sala',
        key: 'centro'
      }
    },
    Numero_Sala: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Sala',
        key: 'numero'
      }
    },
    dia_semana: {
      type: DataTypes.ENUM('Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'),
      allowNull: false
    },
    hora_inicio: {
      type: DataTypes.TIME,
      allowNull: false
    },
    hora_fim: {
      type: DataTypes.TIME,
      allowNull: false
    }
  }, {
    tableName: 'Turma'
  });
}