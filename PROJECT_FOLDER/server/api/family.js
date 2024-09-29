const Router = require('express').Router();
const ValidationRequest = require('../handler/validatorRequest');
const FamilyController = require('../controller/familyController');
const ResponseHandler = require('../handler/errorResponse');

const createEmployeeFamily = async (request, reply) => {
  try {
    ValidationRequest.createEmployeeFamilyValidation(request.body);

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
      isDivorced
    } = request.body;
    const userName = request.body.userName || null;
    const job = request.body.job || null;
    const response = await FamilyController.createDataEmployeeFamily({
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
    });

    return reply.send(response);
  } catch (err) {
    console.log('err===', err);
    return reply.send(ResponseHandler.errorResponse(err));
  }
};

const listEmployeeFamily = async (request, reply) => {
  try {
    const response = await FamilyController.getListEmployeeFamily();
    return reply.send(response);
  } catch (err) {
    console.log('err===', err);
    return reply.send(ResponseHandler.errorResponse(err));
  }
};

const updateEmployeeFamily = async (request, reply) => {
  try {
    ValidationRequest.updateEmployeeFamilyValidation(request.body);

    const { id, name, identifier, relationStatus, placeOfBirth, dateOfBirth, religion, gender, isLife, isDivorced } =
      request.body;
    const userName = request.body.userName || null;
    const job = request.body.job || null;
    const response = await FamilyController.updateDataEmployeeFamily({
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
    });

    return reply.send(response);
  } catch (err) {
    console.log('err===', err);
    return reply.send(ResponseHandler.errorResponse(err));
  }
};

const deleteEmployeeFamily = async (request, reply) => {
  try {
    ValidationRequest.idValidation(request.body);

    const { id } = request.body;
    const response = await FamilyController.deleteDataEmployeeFamily(id);
    return reply.send(response);
  } catch (err) {
    console.log('err===', err);
    return reply.send(ResponseHandler.errorResponse(err));
  }
};

Router.post('/v1/create', createEmployeeFamily);
Router.get('/v1/list', listEmployeeFamily);
Router.put('/v1/update', updateEmployeeFamily);
Router.delete('/v1/delete', deleteEmployeeFamily);

module.exports = Router;
