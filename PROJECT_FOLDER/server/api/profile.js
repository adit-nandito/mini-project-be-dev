const Router = require('express').Router();
const PreHandler = require('../handler/preHandler');
const ValidationRequest = require('../handler/validatorRequest');
const ProfileController = require('../controller/profileController');
const ResponseHandler = require('../handler/errorResponse');

const createEmployeeProfile = async (request, reply) => {
  try {
    console.log('request.body====', request.body, request.query, request.params, request.file);
    ValidationRequest.createUpdateEmployeeProfileValidation(request.body);

    const { employeeId, placeOfBirth, dateOfBirth, gender, isMarried } = request.body;
    const userName = request.body.userName || null;
    const profPict = request?.file?.buffer || null;
    const response = await ProfileController.createDataEmployeeProfile({
      employeeId,
      placeOfBirth,
      dateOfBirth,
      gender,
      isMarried,
      userName,
      profPict
    });

    return reply.send(response);
  } catch (err) {
    console.log('err===', err);
    return reply.send(ResponseHandler.errorResponse(err));
  }
};

const listEmployeeProfile = async (request, reply) => {
  try {
    const response = await ProfileController.getListEmployeeProfile();
    return reply.send(response);
  } catch (err) {
    console.log('err===', err);
    return reply.send(ResponseHandler.errorResponse(err));
  }
};

const updateEmployeeProfile = async (request, reply) => {
  try {
    ValidationRequest.createUpdateEmployeeProfileValidation(request.body);

    const { employeeId, placeOfBirth, dateOfBirth, gender, isMarried } = request.body;
    const userName = request.body.userName || null;
    const profPict = request?.file?.buffer || null;
    const response = await ProfileController.updateDataEmployeeProfile({
      employeeId,
      placeOfBirth,
      dateOfBirth,
      gender,
      isMarried,
      userName,
      profPict
    });

    return reply.send(response);
  } catch (err) {
    console.log('err===', err);
    return reply.send(ResponseHandler.errorResponse(err));
  }
};

const deleteEmployeeProfile = async (request, reply) => {
  try {
    ValidationRequest.employeeIdValidation(request.body);

    const { employeeId } = request.body;
    const response = await ProfileController.deleteDataEmployeeProfile(employeeId);
    return reply.send(response);
  } catch (err) {
    console.log('err===', err);
    return reply.send(ResponseHandler.errorResponse(err));
  }
};

Router.post('/v1/create', PreHandler.uploadImage.single('profPict'), createEmployeeProfile);
Router.get('/v1/list', listEmployeeProfile);
Router.put('/v1/update', PreHandler.uploadImage.single('profPict'), updateEmployeeProfile);
Router.delete('/v1/delete', deleteEmployeeProfile);

module.exports = Router;
