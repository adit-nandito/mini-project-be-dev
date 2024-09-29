/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    return queryInterface.bulkInsert('employee_profiles', [
      {
        employee_id: 1,
        place_of_birth: 'Jakarta',
        date_of_birth: new Date('1997-05-02'),
        gender: 'Laki-laki',
        is_married: true,
        created_by: 'admin',
        updated_by: 'admin',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        employee_id: 2,
        place_of_birth: 'Sukabumi',
        date_of_birth: new Date('1995-05-21'),
        gender: 'Laki-laki',
        is_married: false,
        created_by: 'admin',
        updated_by: 'admin',
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('employee_profiles', null, {});
  }
};
