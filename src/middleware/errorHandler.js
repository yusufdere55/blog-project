const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  const status = err.status || 500;
  const message = err.message || 'Bir şeyler ters gitti';

  res.status(status).json({
    success: false,
    error: {
      message,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    }
  });
};

class AppError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

module.exports = { errorHandler, AppError }; 