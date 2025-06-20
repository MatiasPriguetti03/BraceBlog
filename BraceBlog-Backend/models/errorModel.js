class HttpError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
    }
}

module.exports = HttpError;
// This class can be used to create custom HTTP errors throughout the application.