const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class EmployeeProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Employee, { foreignKey: 'employee_id', as: 'employeeProfile', onDelete: 'CASCADE' });
    }
  }
  EmployeeProfile.init(
    {
      employee_id: DataTypes.INTEGER,
      place_of_birth: DataTypes.STRING,
      date_of_birth: DataTypes.DATEONLY,
      gender: DataTypes.ENUM('Laki-laki', 'Perempuan'),
      is_married: DataTypes.BOOLEAN,
      prof_pict: {
        type: DataTypes.BLOB('long'),
        get() {
          const rawValue = this.getDataValue('prof_pict');
          return rawValue?.toString('base64');
        }
      },
      created_by: DataTypes.STRING,
      updated_by: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'EmployeeProfile',
      tableName: 'employee_profiles',
      underscored: true,
      indexes: [
        {
          fields: ['employee_id'],
          unique: true
        }
      ]
    }
  );
  return EmployeeProfile;
};
