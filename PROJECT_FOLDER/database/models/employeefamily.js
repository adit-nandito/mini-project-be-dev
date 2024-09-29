const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class EmployeeFamily extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Employee, { foreignKey: 'employee_id', as: 'employeeFamily', onDelete: 'CASCADE' });
    }
  }
  EmployeeFamily.init(
    {
      employee_id: DataTypes.INTEGER,
      name: DataTypes.STRING,
      identifier: DataTypes.STRING,
      job: DataTypes.STRING,
      place_of_birth: DataTypes.STRING,
      date_of_birth: DataTypes.DATEONLY,
      religion: DataTypes.ENUM('Islam', 'Katolik', 'Budha', 'Protestan', 'Konghucu'),
      is_life: DataTypes.BOOLEAN,
      is_divorced: DataTypes.BOOLEAN,
      relation_status: DataTypes.ENUM('Suami', 'Istri', 'Anak', 'Anak Sambung'),
      created_by: DataTypes.STRING,
      updated_by: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'EmployeeFamily',
      tableName: 'employee_family',
      underscored: true
    }
  );
  return EmployeeFamily;
};
