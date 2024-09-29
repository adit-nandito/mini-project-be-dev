const Boom = require('@hapi/boom');
const { EmployeeFamily } = require('../../database/models');

/*
 * PUBLIC FUNCTION
 */
const createDataEmployeeFamily = async (dataObject) => {
  const {
    employeeId,
    name,
    identifier,
    relationStatus,
    placeOfBirth,
    dateOfBirth,
    religion,
    gender,
    isLife,
    isDivorced,
    userName,
    job
  } = dataObject;
  try {
    const insertEmployeeFamily = {
      employee_id: employeeId,
      name,
      identifier,
      job,
      place_of_birth: placeOfBirth,
      date_of_birth: dateOfBirth,
      religion,
      gender,
      is_life: isLife,
      is_divorced: isDivorced,
      relation_status: relationStatus,
      created_by: userName,
      updated_by: userName,
      created_at: new Date(),
      updated_at: new Date()
    };

    await EmployeeFamily.create(insertEmployeeFamily);
    return {
      message: 'SUCCESSFULLY_INSERT_DATA'
    };
  } catch (error) {
    return Promise.reject(error);
  }
};

const getListEmployeeFamily = async () => {
  try {
    const result = await EmployeeFamily.findAll();
    return result;
  } catch (error) {
    return Promise.reject(error);
  }
};

const updateDataEmployeeFamily = async (dataObject) => {
  const {
    id,
    name,
    identifier,
    relationStatus,
    placeOfBirth,
    dateOfBirth,
    religion,
    gender,
    isLife,
    isDivorced,
    userName,
    job
  } = dataObject;
  try {
    const updateEmployeeFamily = {
      name,
      identifier,
      job,
      place_of_birth: placeOfBirth,
      date_of_birth: dateOfBirth,
      religion,
      gender,
      is_life: isLife,
      is_divorced: isDivorced,
      relation_status: relationStatus,
      updated_by: userName,
      updated_at: new Date()
    };

    const [result] = await EmployeeFamily.update(updateEmployeeFamily, { where: { id } });
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

const deleteDataEmployeeFamily = async (id) => {
  try {
    const result = await EmployeeFamily.destroy({
      where: {
        id
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

module.exports = {
  createDataEmployeeFamily,
  getListEmployeeFamily,
  updateDataEmployeeFamily,
  deleteDataEmployeeFamily
};
