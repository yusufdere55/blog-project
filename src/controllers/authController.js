const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { AppError } = require('../middleware/errorHandler');
const { Op } = require('sequelize');

const generateToken = (user) => {
  return jwt.sign(
    { 
      id: user.id, 
      username: user.username,
      role: user.role 
    },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
};

exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ username }, { email }]
      }
    });

    if (existingUser) {
      throw new AppError('Bu kullanıcı adı veya e-posta adresi zaten kullanımda', 400);
    }

    // Create new user
    const user = await User.create({
      username,
      email,
      password
    });

    // Generate token
    const token = generateToken(user);

    res.status(201).json({
      success: true,
      data: {
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
          status: user.status,
          createDate: user.createDate
        },
        token
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { login, password } = req.body;

    // Find user by email or username
    const user = await User.findOne({
      where: {
        [Op.or]: [
          { email: login },
          { username: login }
        ]
      }
    });

    if (!user) {
      throw new AppError('Geçersiz kullanıcı adı/e-posta veya şifre', 401);
    }

    // Check password
    const isValidPassword = await user.validatePassword(password);
    if (!isValidPassword) {
      throw new AppError('Geçersiz kullanıcı adı/e-posta veya şifre', 401);
    }

    // Check user status
    if (user.status !== 'active') {
      throw new AppError('Hesabınız aktif değil', 403);
    }

    // Update last login date
    await user.update({ lastLoginDate: new Date() });

    // Generate token
    const token = generateToken(user);

    res.json({
      success: true,
      data: {
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
          status: user.status,
          createDate: user.createDate,
          lastLoginDate: user.lastLoginDate
        },
        token
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.getMe = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      throw new AppError('Token bulunamadı', 401);
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Get user
    const user = await User.findByPk(decoded.id);
    
    if (!user) {
      throw new AppError('Kullanıcı bulunamadı', 404);
    }

    if (user.status !== 'active') {
      throw new AppError('Hesabınız aktif değil', 403);
    }

    res.json({
      success: true,
      data: {
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
          status: user.status,
          createDate: user.createDate,
          lastLoginDate: user.lastLoginDate
        }
      }
    });
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      next(new AppError('Geçersiz token', 401));
    } else {
      next(error);
    }
  }
}; 