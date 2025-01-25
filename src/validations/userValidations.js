const Joi = require('joi');

const registerSchema = Joi.object({
  username: Joi.string()
    .min(3)
    .max(30)
    .required()
    .messages({
      'string.empty': 'Kullanıcı adı boş olamaz',
      'string.min': 'Kullanıcı adı en az 3 karakter olmalıdır',
      'string.max': 'Kullanıcı adı en fazla 30 karakter olmalıdır',
      'any.required': 'Kullanıcı adı zorunludur'
    }),
  
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.empty': 'E-posta adresi boş olamaz',
      'string.email': 'Geçerli bir e-posta adresi giriniz',
      'any.required': 'E-posta adresi zorunludur'
    }),
  
  password: Joi.string()
    .min(6)
    .required()
    .messages({
      'string.empty': 'Şifre boş olamaz',
      'string.min': 'Şifre en az 6 karakter olmalıdır',
      'any.required': 'Şifre zorunludur'
    })
});

const loginSchema = Joi.object({
  login: Joi.string()
    .required()
    .messages({
      'string.empty': 'Kullanıcı adı veya e-posta adresi boş olamaz',
      'any.required': 'Kullanıcı adı veya e-posta adresi zorunludur'
    }),
  
  password: Joi.string()
    .required()
    .messages({
      'string.empty': 'Şifre boş olamaz',
      'any.required': 'Şifre zorunludur'
    })
});

module.exports = {
  registerSchema,
  loginSchema
}; 