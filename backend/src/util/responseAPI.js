
export const success = (message = "Success", results = null, statusCode = 200) => ({
  message,
  error: false,
  code: statusCode,
  results
});

export const error = (message = "Internal Server Error", statusCode = 500, errors = null) => ({
  message,
  error: true,
  code: statusCode,
  errors
});

export const validation = (message = "Validation failed", errors = null) => ({
  message,
  error: true,
  code: 422,
  errors
});
