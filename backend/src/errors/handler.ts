import { ErrorRequestHandler } from "express";
import { ValidationError } from "yup";

interface ValidationErrors {
	[field: string]: string[];
}

const errorHandler: ErrorRequestHandler = (error, request, response, next) => {
	console.log(error);

	let statusCode: number;

	if (error instanceof ValidationError) {
		let errors: ValidationErrors = {};

		error.inner.forEach((e) => {
			errors[e.path] = e.errors;
		});

		statusCode = 400;
		return response.status(statusCode).json({
			message: "Validation error",
			errors,
			statusCode,
		});
	}

	statusCode = 500;
	return response.status(statusCode).json({
		message: "Internal Server Error",
		statusCode,
	});
};

export default errorHandler;
