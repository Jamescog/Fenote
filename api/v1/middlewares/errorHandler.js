exports.errorHandler = (err, req, res, next) => {
  if (err.name === "SequelizeValidationError") {
    const { path, message } = err.errors[0];
    let errorMessage = `Validation error for field '${path}': ${message}`;

    res.status(400).json({
      success: false,
      error: errorMessage,
    });
  } else if (err.name === "SequelizeUniqueConstraintError") {
    const { path } = err.errors[0];
    let errorMessage = `Unique constraint error for field '${path}': Value must be unique.`;

    res.status(400).json({
      success: false,
      error: errorMessage,
    });
  } else if (err.name === "SequelizeForeignKeyConstraintError") {
    const { table, key } = err.index;
    let errorMessage = `Foreign key constraint error on table '${table}': '${key}' does not exist.`;

    res.status(400).json({
      success: false,
      error: errorMessage,
    });
  } else if (err.name === "SequelizeDatabaseError") {
    const errorMessage = err.message;

    res.status(500).json({
      success: false,
      error: errorMessage,
    });
  } else {
    console.error(err);

    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};
