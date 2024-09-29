const Router = require('express').Router();
const ValidationRequest = require('../handler/validatorRequest');
const EducationController = require('../controller/educationControler');
const ResponseHandler = require('../handler/errorResponse');

const createEmployeeEducation = async (request, reply) => {
  try {
    ValidationRequest.createEmployeeEducationValidation(request.body);

    const { employeeId, name, level } = request.body;
    const userName = request.body.userName || null;
    const description = request.body.description || null;
    const response = await EducationController.createDataEmployeeEducation({
      employeeId,
      name,
      level,
      userName,
      description
    });

    return reply.send(response);
  } catch (err) {
    console.log('err===', err);
    return reply.send(ResponseHandler.errorResponse(err));
  }
};

const listEmployeeEducation = async (request, reply) => {
  try {
    const response = await EducationController.getListEmployeeEducation();
    return reply.send(response);
  } catch (err) {
    console.log('err===', err);
    return reply.send(ResponseHandler.errorResponse(err));
  }
};

const updateEmployeeEducation = async (request, reply) => {
  try {
    ValidationRequest.updateEmployeeEducationValidation(request.body);

    const { id, name, level } = request.body;
    const userName = request.body.userName || null;
    const description = request.body.description || null;
    const response = await EducationController.updateDataEmployeeEducation({
      id,
      name,
      level,
      userName,
      description
    });

    return reply.send(response);
  } catch (err) {
    console.log('err===', err);
    return reply.send(ResponseHandler.errorResponse(err));
  }
};

const deleteDataEmployeeEducation = async (request, reply) => {
  try {
    ValidationRequest.idValidation(request.body);

    const { id } = request.body;
    const response = await EducationController.deleteDataEmployeeEducation(id);
    return reply.send(response);
  } catch (err) {
    console.log('err===', err);
    return reply.send(ResponseHandler.errorResponse(err));
  }
};

Router.post('/v1/create', createEmployeeEducation);
Router.get('/v1/list', listEmployeeEducation);
Router.put('/v1/update', updateEmployeeEducation);
Router.delete('/v1/delete', deleteDataEmployeeEducation);

module.exports = Router;
