const Joi = require('joi');
const Boom = require('@hapi/boom');

const createEmployeeValidation = (data) => {
  const schema = Joi.object({
    nik: Joi.string().required(),
    name: Joi.string().required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
    userName: Joi.string().optional().allow('')
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const createBiodataEmployeeValidation = (data) => {
  const schema = Joi.object({
    nik: Joi.string().required(),
    name: Joi.string().required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
    userName: Joi.string().optional().allow(''),
    placeOfBirth: Joi.string().required(),
    dateOfBirth: Joi.date().required(),
    gender: Joi.string().valid('Laki-laki', 'Perempuan').required(),
    isMarried: Joi.boolean().required(),
    profPict: Joi.string().optional().allow(''),
    familyData: Joi.array()
      .items(
        Joi.object({
          name: Joi.string().required(),
          identifier: Joi.string().required(),
          job: Joi.string().optional().allow(''),
          relationStatus: Joi.string().valid('Suami', 'Istri', 'Anak', 'Anak Sambung').required(),
          placeOfBirth: Joi.string().required(),
          dateOfBirth: Joi.date().required(),
          religion: Joi.string().valid('Islam', 'Katolik', 'Budha', 'Protestan', 'Konghucu').required(),
          isLife: Joi.boolean().required(),
          isDivorced: Joi.boolean().required()
        })
      )
      .optional(),
    educationData: Joi.array()
      .items(
        Joi.object({
          name: Joi.string().required(),
          level: Joi.string().valid('Tk', 'Sd', 'Smp', 'Sma', 'Strata 1', 'Strata 2', 'Doktor', 'Profesor').required(),
          description: Joi.string().optional().allow('')
        })
      )
      .optional()
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const idValidation = (data) => {
  const schema = Joi.object({
    id: Joi.number().required()
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const employeeIdValidation = (data) => {
  const schema = Joi.object({
    employeeId: Joi.number().required()
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const updateEmployeeValidation = (data) => {
  const schema = Joi.object({
    id: Joi.number().required(),
    nik: Joi.string().required(),
    name: Joi.string().required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
    userName: Joi.string().optional().allow('')
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const updateBiodataEmployeeValidation = (data) => {
  const schema = Joi.object({
    id: Joi.number().required(),
    nik: Joi.string().required(),
    name: Joi.string().required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
    userName: Joi.string().optional().allow(''),
    placeOfBirth: Joi.string().required(),
    dateOfBirth: Joi.date().required(),
    gender: Joi.string().valid('Laki-laki', 'Perempuan').required(),
    isMarried: Joi.boolean().required(),
    profPict: Joi.string().optional().allow(''),
    familyData: Joi.array()
      .items(
        Joi.object({
          name: Joi.string().required(),
          identifier: Joi.string().required(),
          job: Joi.string().optional().allow(''),
          relationStatus: Joi.string().valid('Suami', 'Istri', 'Anak', 'Anak Sambung').required(),
          placeOfBirth: Joi.string().required(),
          dateOfBirth: Joi.date().required(),
          religion: Joi.string().valid('Islam', 'Katolik', 'Budha', 'Protestan', 'Konghucu').required(),
          isLife: Joi.boolean().required(),
          isDivorced: Joi.boolean().required()
        })
      )
      .optional(),
    educationData: Joi.array()
      .items(
        Joi.object({
          name: Joi.string().required(),
          level: Joi.string().valid('Tk', 'Sd', 'Smp', 'Sma', 'Strata 1', 'Strata 2', 'Doktor', 'Profesor').required(),
          description: Joi.string().optional().allow('')
        })
      )
      .optional()
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const createUpdateEmployeeProfileValidation = (data) => {
  const schema = Joi.object({
    employeeId: Joi.number().required(),
    placeOfBirth: Joi.string().required(),
    dateOfBirth: Joi.date().required(),
    gender: Joi.string().valid('Laki-laki', 'Perempuan').required(),
    isMarried: Joi.boolean().required(),
    profPict: Joi.string().optional().allow(''),
    userName: Joi.string().optional().allow('')
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const createEmployeeFamilyValidation = (data) => {
  const schema = Joi.object({
    employeeId: Joi.number().required(),
    name: Joi.string().required(),
    identifier: Joi.string().required(),
    job: Joi.string().optional().allow(''),
    relationStatus: Joi.string().valid('Suami', 'Istri', 'Anak', 'Anak Sambung').required(),
    placeOfBirth: Joi.string().required(),
    dateOfBirth: Joi.date().required(),
    religion: Joi.string().valid('Islam', 'Katolik', 'Budha', 'Protestan', 'Konghucu').required(),
    isLife: Joi.boolean().required(),
    isDivorced: Joi.boolean().required(),
    userName: Joi.string().optional().allow('')
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const updateEmployeeFamilyValidation = (data) => {
  const schema = Joi.object({
    id: Joi.number().required(),
    name: Joi.string().required(),
    identifier: Joi.string().required(),
    job: Joi.string().optional().allow(''),
    relationStatus: Joi.string().valid('Suami', 'Istri', 'Anak', 'Anak Sambung').required(),
    placeOfBirth: Joi.string().required(),
    dateOfBirth: Joi.date().required(),
    religion: Joi.string().valid('Islam', 'Katolik', 'Budha', 'Protestan', 'Konghucu').required(),
    isLife: Joi.boolean().required(),
    isDivorced: Joi.boolean().required(),
    userName: Joi.string().optional().allow('')
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const createEmployeeEducationValidation = (data) => {
  const schema = Joi.object({
    employeeId: Joi.number().required(),
    name: Joi.string().required(),
    level: Joi.string().valid('Tk', 'Sd', 'Smp', 'Sma', 'Strata 1', 'Strata 2', 'Doktor', 'Profesor').required(),
    description: Joi.string().optional().allow(''),
    userName: Joi.string().optional().allow('')
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const updateEmployeeEducationValidation = (data) => {
  const schema = Joi.object({
    id: Joi.number().required(),
    name: Joi.string().required(),
    level: Joi.string().valid('Tk', 'Sd', 'Smp', 'Sma', 'Strata 1', 'Strata 2', 'Doktor', 'Profesor').required(),
    description: Joi.string().optional().allow(''),
    userName: Joi.string().optional().allow('')
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

module.exports = {
  createEmployeeValidation,
  createBiodataEmployeeValidation,
  idValidation,
  employeeIdValidation,
  updateEmployeeValidation,
  updateBiodataEmployeeValidation,
  createUpdateEmployeeProfileValidation,
  createEmployeeFamilyValidation,
  updateEmployeeFamilyValidation,
  createEmployeeEducationValidation,
  updateEmployeeEducationValidation
};
