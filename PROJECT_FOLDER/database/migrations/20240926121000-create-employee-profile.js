/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface
      .createTable('employee_profiles', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        employee_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: 'employee',
            key: 'id'
          },
          onDelete: 'CASCADE'
        },
        place_of_birth: {
          type: Sequelize.STRING
        },
        date_of_birth: {
          type: Sequelize.DATEONLY
        },
        gender: {
          type: Sequelize.ENUM('Laki-laki', 'Perempuan')
        },
        is_married: {
          type: Sequelize.BOOLEAN
        },
        prof_pict: {
          type: Sequelize.BLOB('long')
        },
        created_by: {
          type: Sequelize.STRING
        },
        updated_by: {
          type: Sequelize.STRING
        },
        created_at: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updated_at: {
          allowNull: false,
          type: Sequelize.DATE
        }
      })
      .then(() => queryInterface.addIndex('employee_profiles', ['employee_id'], { unique: true }));
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('employee_profiles');
  }
};
