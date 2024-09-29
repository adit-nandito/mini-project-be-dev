const Boom = require('@hapi/boom');
const { EmployeeProfile } = require('../../database/models');

/*
 * PUBLIC FUNCTION
 */
const createDataEmployeeProfile = async (dataObject) => {
  const { employeeId, placeOfBirth, dateOfBirth, gender, isMarried, userName, profPict } = dataObject;
  try {
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

    await EmployeeProfile.create(insertEmployeeProfile);
    return {
      message: 'SUCCESSFULLY_INSERT_DATA'
    };
  } catch (error) {
    return Promise.reject(error);
  }
};

const getListEmployeeProfile = async () => {
  try {
    const result = await EmployeeProfile.findAll({
      attributes: { exclude: ['id'] },
      order: [['employee_id', 'ASC']]
    });
    return result;
  } catch (error) {
    return Promise.reject(error);
  }
};

const updateDataEmployeeProfile = async (dataObject) => {
  const { employeeId, placeOfBirth, dateOfBirth, gender, isMarried, userName, profPict } = dataObject;
  try {
    const updateEmployeeProfile = {
      place_of_birth: placeOfBirth,
      date_of_birth: dateOfBirth,
      gender,
      is_married: isMarried,
      prof_pict: profPict,
      updated_by: userName,
      updated_at: new Date()
    };

    const [result] = await EmployeeProfile.update(updateEmployeeProfile, { where: { employee_id: employeeId } });
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

const deleteDataEmployeeProfile = async (employeeId) => {
  try {
    const result = await EmployeeProfile.destroy({
      where: {
        employee_id: employeeId
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
  createDataEmployeeProfile,
  getListEmployeeProfile,
  updateDataEmployeeProfile,
  deleteDataEmployeeProfile
};
