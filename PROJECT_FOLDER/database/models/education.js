const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Education extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Employee, { foreignKey: 'employee_id', as: 'employeeEducation', onDelete: 'CASCADE' });
    }
  }
  Education.init(
    {
      employee_id: DataTypes.INTEGER,
      name: DataTypes.STRING,
      level: {
        type: DataTypes.ENUM('Tk', 'Sd', 'Smp', 'Sma', 'Strata 1', 'Strata 2', 'Doktor', 'Profesor'),
        get() {
          let rawValue = this.getDataValue('level');
          if (rawValue === 'Tk' || rawValue === 'Sd' || rawValue === 'Smp' || rawValue === 'Sma') {
            rawValue = rawValue.toUpperCase();
          }
          return rawValue;
        }
      },
      description: DataTypes.STRING,
      created_by: DataTypes.STRING,
      updated_by: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Education',
      tableName: 'education',
      underscored: true
    }
  );
  return Education;
};
