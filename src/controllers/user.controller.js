import { User } from "../models/user.js";
import { Task } from "../models/task.js";
import { Op } from "sequelize";
import logger from "../logs/logger.js";
import { Status } from "../constants/index.js";
import { encriptar } from "../common/byscript.js";


async function create(req, res) {
  const { username, password } = req.body;

  try {
    const newUser = await User.create({
      username,
      password
    });
    return res.json(newUser)
  } catch (error) {
    logger.error(error)
    return res.json(error.message)
  }
};




async function get(req, res) {
  try {
    const users = await User.findAndCountAll({
      attributes: ['id', 'username', 'password', 'status'],
      order: [['id', 'DESC']],
      where: {
        status: Status.ACTIVE
      }
    });
    res.json({
      total: users.count,
      data: users.rows,
    })
  } catch (error) {
    logger.error(error)
    return res.json(error.message)
  }
} // <- Cerramos la funcion get

async function find(req, res) {
  const { id } = req.params;
  try {
    const user = await User.findOne({
      attributes: ['username', 'status'],
      where: {
        id,
      }
    });
    if (!user)
      return res.status(404).json({ message: 'usuario no encontrado' });
    res.json(user);
  } catch (error) {
    logger.error(error)
    return res.json(error.message)
  }
}


const update = async (req, res) => {
  const { id } = req.params;
  const { username, password } = req.body;
  const passwordHash = await encriptar(password)
  try {
    const user = await User.update(
      {
        username,
        password: passwordHash,
      },
      { where: { id } },
    );
    return res.json(user);
  } catch (error) {
    logger.error(error)
    return res.json(error.message)
  }
}


const activateInactivate = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  if (!status) {
    return res.status(400).json({ message: 'el estado no existe' });
  }

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'usuario no encontrado' });
    }

    if (user.status === status) {
      return res.status(409).json({ message: 'el usuario ya se encuentra en el estado solicitado' });
    }

    user.status = status;
    await user.save();
    res.json(user);
  } catch (error) {
    logger.error(error)
    return res.json(error.message)
  }
};



const eliminar = async (req, res) => {
  const { id } = req.params;
  try {
    await User.destroy({
      where: {
        id,
      }
    });
    return res.sendStatus(204);

  } catch (error) {
    logger.error(error)
    return res.json(error.message)
  }
}

async function getUsersPagination(req, res) {
  const { page = 1, limit = 10, search = '', orderBy = 'id', orderDir = 'DESC' } = req.query;

  try {
    const offset = (parseInt(page) - 1) * parseInt(limit);
    const where = {};
    if (search) {
      where.username = {
        [Op.iLike]: `%${search}%`
      };
    }

    const { count, rows } = await User.findAndCountAll({
      attributes: ['id', 'username', 'status'],
      where,
      order: [[orderBy, orderDir]],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    const pages = Math.ceil(count / limit);

    res.json({
      total: count,
      page: parseInt(page),
      pages,
      data: rows
    });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ message: error.message });
  }
}

export default {
  create,
  get,
  find,
  update,
  eliminar,
  activateInactivate,
  getUsersPagination,
}