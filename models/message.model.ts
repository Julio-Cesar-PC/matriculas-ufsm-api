import {DataTypes, Sequelize} from 'sequelize'

export default function (sequelize: Sequelize) {
  return sequelize.define('message', {
    text: {
      type: DataTypes.STRING,
      allowNull: false
    }
  })
}