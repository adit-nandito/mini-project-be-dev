const Router = require('express').Router();
const PreHandler = require('../handler/preHandler');
const ValidationRequest = require('../handler/validatorRequest');
const EmployeeControler = require('../controller/employeeControler');
const ResponseHandler = require('../handler/errorResponse');

const createEmployee = async (request, reply) => {
  try {
    ValidationRequest.createEmployeeValidation(request.body);

    const { nik, name, startDate, endDate } = request.body;
    const userName = request.body.userName || null;
    const response = await EmployeeControler.createDataEmployee({
      nik,
      name,
      startDate,
      endDate,
      userName
    });
    return reply.send(response);
  } catch (err) {
    console.log('err===', err);
    return reply.send(ResponseHandler.errorResponse(err));
  }
};

const createBiodataEmployee = async (request, reply) => {
  try {
    request.body.familyData = request.body.familyData ? JSON.parse(request.body.familyData) : null;
    request.body.educationData = request.body.educationData ? JSON.parse(request.body.educationData) : null;
    ValidationRequest.createBiodataEmployeeValidation(request.body);

    const { nik, name, startDate, endDate, placeOfBirth, dateOfBirth, gender, isMarried, familyData, educationData } =
      request.body;
    const userName = request.body.userName || null;
    const profPict = request?.file?.buffer || null;
    const response = await EmployeeControler.createBiodataDataEmployee({
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
    });
    return reply.send(response);
  } catch (err) {
    console.log('err===', err);
    return reply.send(ResponseHandler.errorResponse(err));
  }
};

const listEmployee = async (request, reply) => {
  try {
    const response = await EmployeeControler.getListEmployee();
    return reply.send(response);
  } catch (err) {
    console.log('err===', err);
    return reply.send(ResponseHandler.errorResponse(err));
  }
};

const detailEmployee = async (request, reply) => {
  try {
    ValidationRequest.employeeIdValidation(request.body);

    const { employeeId } = request.body;
    const response = await EmployeeControler.getDetailEmployee(employeeId);
    return reply.send(response);
  } catch (err) {
    console.log('err===', err);
    return reply.send(ResponseHandler.errorResponse(err));
  }
};

const updateEmployee = async (request, reply) => {
  try {
    ValidationRequest.updateEmployeeValidation(request.body);

    const { id, nik, name, startDate, endDate } = request.body;
    const userName = request.body.updatedBy || null;
    const response = await EmployeeControler.updateDataEmployee({
      id,
      nik,
      name,
      startDate,
      endDate,
      userName
    });
    return reply.send(response);
  } catch (err) {
    console.log('err===', err);
    return reply.send(ResponseHandler.errorResponse(err));
  }
};

const updateBiodataEmployee = async (request, reply) => {
  try {
    request.body.familyData = request.body.familyData ? JSON.parse(request.body.familyData) : null;
    request.body.educationData = request.body.educationData ? JSON.parse(request.body.educationData) : null;
    ValidationRequest.updateBiodataEmployeeValidation(request.body);

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
      familyData,
      educationData
    } = request.body;
    const userName = request.body.userName || null;
    const profPict = request?.file?.buffer || null;
    const response = await EmployeeControler.updateBiodataDataEmployee({
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
    });
    return reply.send(response);
  } catch (err) {
    console.log('err===', err);
    return reply.send(ResponseHandler.errorResponse(err));
  }
};

const deleteEmployee = async (request, reply) => {
  try {
    ValidationRequest.employeeIdValidation(request.body);

    const { employeeId } = request.body;
    const response = await EmployeeControler.deleteDataEmployee(employeeId);
    return reply.send(response);
  } catch (err) {
    console.log('err===', err);
    return reply.send(ResponseHandler.errorResponse(err));
  }
};

const reportEmployee = async (request, reply) => {
  try {
    const response = await EmployeeControler.getReportEmployee();
    return reply.send(response);
  } catch (err) {
    console.log('err===', err);
    return reply.send(ResponseHandler.errorResponse(err));
  }
};

Router.post('/v1/create', createEmployee);
Router.post('/v1/create-biodata', PreHandler.uploadImage.single('profPict'), createBiodataEmployee);
Router.put('/v1/update-biodata', PreHandler.uploadImage.single('profPict'), updateBiodataEmployee);
Router.get('/v1/list', listEmployee);
Router.post('/v1/detail', detailEmployee);
Router.put('/v1/update', updateEmployee);
Router.delete('/v1/delete', deleteEmployee);
Router.get('/v1/report', reportEmployee);

module.exports = Router;
