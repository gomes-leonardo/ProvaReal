import {
  NotFoundError,
  UnauthorizedError,
  ValidationError,
  InternalServerError,
  MethodNotAllowedError,
} from "./error";

function onNoMatchHandler(request: any, response: any) {
  const publicErrorObject = new MethodNotAllowedError();
  response.status(publicErrorObject.status_code).json(publicErrorObject);
}

function onErrorHandler(error: any, request: any, response: any) {
  if (
    error instanceof ValidationError ||
    error instanceof NotFoundError ||
    error instanceof UnauthorizedError ||
    error instanceof MethodNotAllowedError
  ) {
    return response.status(error.status_code).json(error);
  }
  const publicErrorObject = new InternalServerError({
    cause: error,
  });

  return response.status(publicErrorObject.status_code).json(publicErrorObject);
}

const controller = {
  errorHandlers: {
    onNoMatch: onNoMatchHandler,
    onError: onErrorHandler,
  },
};
export default controller;