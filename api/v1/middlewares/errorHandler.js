exports.errorHandler = (err, req, res, next) => {
  if (err.name === "SequelizeValidationError") {
    const { path, message } = err.errors[0];
    let errorMessage = `Validation error for field '${path}': ${message}`;

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
  } else if (err.parent && err.parent.code === 'ER_DUP_ENTRY') {
    const errorMessage = err.parent.sqlMessage;

    res.status(400).json({
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
