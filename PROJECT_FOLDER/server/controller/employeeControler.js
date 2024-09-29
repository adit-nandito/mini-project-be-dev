const Moment = require('moment');
const Boom = require('@hapi/boom');
const { Employee, EmployeeProfile, EmployeeFamily, Education, sequelize } = require('../../database/models');

/*
 * PUBLIC FUNCTION
 */
const createDataEmployee = async (dataObject) => {
  const { nik, name, startDate, endDate, userName } = dataObject;
  const isActive = Moment().isBetween(startDate, endDate);
  const insertEmployee = {
    nik,
    name,
    is_active: isActive,
    start_date: Moment(startDate).format('YYYY-MM-DD'),
    end_date: Moment(endDate).format('YYYY-MM-DD'),
    created_by: userName,
    updated_by: userName,
    created_at: new Date(),
    updated_at: new Date()
  };

  try {
    await Employee.create(insertEmployee);
    return {
      message: 'SUCCESSFULLY_INSERT_DATA'
    };
  } catch (error) {
    return Promise.reject(error);
  }
};

const createBiodataDataEmployee = async (dataObject) => {
  const {
    nik,
    name,
    startDate,
    endDate,
    placeOfBirth,
    dateOfBirth,
    gender,
    isMarried,
    profPict,
    familyData,
    educationData,
    userName
  } = dataObject;
  const transaction = await sequelize.transaction();

  try {
    const isActive = Moment().isBetween(startDate, endDate);
    const insertEmployee = {
      nik,
      name,
      is_active: isActive,
      start_date: Moment(startDate).format('YYYY-MM-DD'),
      end_date: Moment(endDate).format('YYYY-MM-DD'),
      created_by: userName,
      updated_by: userName,
      created_at: new Date(),
      updated_at: new Date()
    };

    const dataEmployee = await Employee.create(insertEmployee, { transaction });
    const employeeId = dataEmployee.id;

    const insertEmployeeProfile = {
      employee_id: employeeId,
      place_of_birth: placeOfBirth,
      date_of_birth: dateOfBirth,
      gender,
      is_married: isMarried,
      prof_pict: profPict,
      created_by: userName,
      updated_by: userName,
      created_at: new Date(),
      updated_at: new Date()
    };

    const insertFamilyData = familyData.map((item) => {
      item.employee_id = employeeId;
      item.relation_status = item.relationStatus;
      item.place_of_birth = item.placeOfBirth;
      item.date_of_birth = item.dateOfBirth;
      item.is_life = item.isLife;
      item.is_divorced = item.isDivorced;
      item.created_by = userName;
      item.updated_by = userName;
      item.created_at = new Date();
      item.updated_at = new Date();

      return item;
    });

    const insertEducationData = educationData.map((item) => {
      item.employee_id = employeeId;
      item.created_by = userName;
      item.updated_by = userName;
      item.created_at = new Date();
      item.updated_at = new Date();

      return item;
    });

    await Promise.all([
      EmployeeProfile.create(insertEmployeeProfile, { transaction }),
      EmployeeFamily.bulkCreate(insertFamilyData, { transaction }),
      Education.bulkCreate(insertEducationData, { transaction })
    ]);
    await transaction.commit();
    return {
      message: 'SUCCESSFULLY_INSERT_DATA'
    };
  } catch (error) {
    await transaction.rollback();
    return Promise.reject(error);
  }
};

const getListEmployee = async () => {
  try {
    const result = await Employee.findAll({
      include: [
        {
          model: EmployeeProfile,
          as: 'employeeProfile',
          attributes: ['place_of_birth', 'date_of_birth', 'gender', 'is_married', 'prof_pict']
        },
        {
          model: EmployeeFamily,
          as: 'employeeFamily',
          attributes: [
            'name',
            'identifier',
            'job',
            'place_of_birth',
            'date_of_birth',
            'religion',
            'is_life',
            'is_divorced',
            'relation_status'
          ]
        },
        { model: Education, as: 'employeeEducation', attributes: ['name', 'level', 'description'] }
      ],
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      order: [['id', 'ASC']]
    });
    return result;
  } catch (error) {
    return Promise.reject(error);
  }
};

const getDetailEmployee = async (employeeId) => {
  try {
    const result = await Employee.findByPk(employeeId, {
      include: [
        {
          model: EmployeeProfile,
          as: 'employeeProfile',
          attributes: ['place_of_birth', 'date_of_birth', 'gender', 'is_married', 'prof_pict']
        },
        {
          model: EmployeeFamily,
          as: 'employeeFamily',
          attributes: [
            'name',
            'identifier',
            'job',
            'place_of_birth',
            'date_of_birth',
            'religion',
            'is_life',
            'is_divorced',
            'relation_status'
          ]
        },
        { model: Education, as: 'employeeEducation', attributes: ['name', 'level', 'description'] }
      ],
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    });

    return result;
  } catch (error) {
    return Promise.reject(error);
  }
};

const updateDataEmployee = async (dataObject) => {
  const { id, nik, name, startDate, endDate, userName } = dataObject;
  try {
    const isActive = Moment().isBetween(startDate, endDate);
    const updateEmployee = {
      id,
      nik,
      name,
      is_active: isActive,
      start_date: Moment(startDate).format('YYYY-MM-DD'),
      end_date: Moment(endDate).format('YYYY-MM-DD'),
      updated_by: userName,
      updated_at: new Date()
    };

    const [result] = await Employee.update(updateEmployee, { where: { id } });
    if (result === 0) {
      throw Boom.notFound('DATA_NOT_FOUND');
    }

    return {
      message: 'SUCCESSFULLY_UPDATE_DATA'
    };
  } catch (error) {
    return Promise.reject(error);
  }
};

const updateBiodataDataEmployee = async (dataObject) => {
  const {
    id,
    nik,
    name,
    startDate,
    endDate,
    placeOfBirth,
    dateOfBirth,
    gender,
    isMarried,
    profPict,
    familyData,
    educationData,
    userName
  } = dataObject;

  const transaction = await sequelize.transaction();
  try {
    const isActive = Moment().isBetween(startDate, endDate);
    const insertEmployee = {
      nik,
      name,
      is_active: isActive,
      start_date: Moment(startDate).format('YYYY-MM-DD'),
      end_date: Moment(endDate).format('YYYY-MM-DD'),
      updated_by: userName,
      updated_at: new Date()
    };

    const insertEmployeeProfile = {
      place_of_birth: placeOfBirth,
      date_of_birth: dateOfBirth,
      gender,
      is_married: isMarried,
      prof_pict: profPict,
      updated_by: userName,
      updated_at: new Date()
    };

    const insertFamilyData = familyData.map((item) => {
      item.relation_status = item.relationStatus;
      item.place_of_birth = item.placeOfBirth;
      item.date_of_birth = item.dateOfBirth;
      item.is_life = item.isLife;
      item.is_divorced = item.isDivorced;
      item.updated_by = userName;
      item.updated_at = new Date();

      return item;
    });

    const insertEducationData = educationData.map((item) => {
      item.updated_by = userName;
      item.updated_at = new Date();

      return item;
    });

    await Promise.all([
      Employee.update(insertEmployee, { where: { id }, transaction }),
      EmployeeProfile.update(insertEmployeeProfile, { where: { employee_id: id }, transaction }),
      EmployeeFamily.update(insertFamilyData, { where: { employee_id: id }, transaction }),
      Education.update(insertEducationData, { where: { employee_id: id }, transaction })
    ]);

    await transaction.commit();
    return {
      message: 'SUCCESSFULLY_UPDATE_DATA'
    };
  } catch (error) {
    await transaction.rollback();
    return Promise.reject(error);
  }
};

const deleteDataEmployee = async (employeeId) => {
  try {
    const result = await Employee.destroy({
      where: {
        id: employeeId
      }
    });

    if (result === 0) {
      throw Boom.notFound('DATA_NOT_FOUND');
    }

    return {
      message: 'SUCCESSFULLY_DELETE_DATA'
    };
  } catch (error) {
    return Promise.reject(error);
  }
};

const getReportEmployee = async () => {
  try {
    const [result] = await sequelize.query(
      `
      WITH relation_counts AS (
        SELECT
          employee_id,
          relation_status AS status,
          COUNT(relation_status) AS count
        FROM employee_family
        GROUP BY employee_id, relation_status
      ),
      education_employee AS (
        SELECT DISTINCT ON (employee_id)
          employee_id,
          level,
          name,
          CASE
            WHEN level = 'Profesor' THEN '1'
            WHEN level = 'Doktor' THEN '2'
            WHEN level = 'Strata 2' THEN '3'
            WHEN level = 'Strata 1' THEN '4'
            WHEN level = 'Sma' THEN '5'
            WHEN level = 'Smp' THEN '6'
            WHEN level = 'Sd' THEN '7'
            ELSE '8'
          END AS level_priority
        FROM education
        GROUP BY employee_id, level, name
        ORDER BY employee_id, level_priority
      )

      SELECT
        e.id AS employee_id,
        e.nik,
        e.name,
        e.is_active,
        ep.gender,
        DATE_PART('year', AGE(ep.date_of_birth)) || ' Years Old' AS age,
        ee.name AS school_name,
        ee.level,
        COALESCE(STRING_AGG(rc.count || ' ' || rc.status, ' & '), '-') AS family_data
      FROM employee e
      JOIN employee_profiles ep ON ep.employee_id = e.id
      LEFT JOIN education_employee ee ON ee.employee_id = e.id
      LEFT JOIN relation_counts rc ON rc.employee_id = e.id
      GROUP BY e.id, ep.gender, ep.date_of_birth, ee.name, ee.level
      ORDER BY e.id
    `
    );

    return result;
  } catch (error) {
    return Promise.reject(error);
  }
};

module.exports = {
  createDataEmployee,
  createBiodataDataEmployee,
  getListEmployee,
  getDetailEmployee,
  updateDataEmployee,
  updateBiodataDataEmployee,
  deleteDataEmployee,
  getReportEmployee
};
