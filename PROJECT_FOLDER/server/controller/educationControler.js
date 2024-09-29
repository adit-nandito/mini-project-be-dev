const Boom = require('@hapi/boom');
const { Education } = require('../../database/models');

/*
 * PUBLIC FUNCTION
 */
const createDataEmployeeEducation = async (dataObject) => {
  const { employeeId, name, level, userName, description } = dataObject;
  try {
    const insertEmployeeEducation = {
      employee_id: employeeId,
      name,
      level,
      description,
      created_by: userName,
      updated_by: userName,
      created_at: new Date(),
      updated_at: new Date()
    };

    await Education.create(insertEmployeeEducation);
    return {
      message: 'SUCCESSFULLY_INSERT_DATA'
    };
  } catch (error) {
    return Promise.reject(error);
  }
};

const getListEmployeeEducation = async () => {
  try {
    const result = await Education.findAll();
    return result;
  } catch (error) {
    return Promise.reject(error);
  }
};

const updateDataEmployeeEducation = async (dataObject) => {
  const { id, name, level, userName, description } = dataObject;
  try {
    const updateEmployeeEducation = {
      name,
      level,
      description,
      updated_by: userName,
      updated_at: new Date()
    };

    const [result] = await Education.update(updateEmployeeEducation, { where: { id } });
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

const deleteDataEmployeeEducation = async (id) => {
  try {
    const result = await Education.destroy({
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
  createDataEmployeeEducation,
  getListEmployeeEducation,
  updateDataEmployeeEducation,
  deleteDataEmployeeEducation
};
