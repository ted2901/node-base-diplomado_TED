import joi from 'joi';


export const createSchema = joi.object({
    username: joi.string().alphanum().min(3).max(30).required(),
    password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
});

export const statusSchema = joi.object({
    status: joi.string().valid('ACTIVO', 'INACTIVO').required()
});