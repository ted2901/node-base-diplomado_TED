import bcrypt from 'bcrypt';
import env from '../config/env.js';
import logger from '../logs/logger.js';

export const encriptar = async (text) => {
    try {
        const saltRounds = env.bcrypt_salt_rounds;
        return await bcrypt.hash(text, Number(saltRounds) || 10);
    }
    catch (error) {
        logger.error(error)
        throw new Error('error al encriptar el texto')
    }
}

export const comparar = async (text, hash) => {
    try {
        return await bcrypt.compare(text, hash)
    } catch (error) {
        logger.error(error);
        throw new Error('error al encriptar el texto')
    }

}
