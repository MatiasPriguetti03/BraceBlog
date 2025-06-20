const jwt = require('jsonwebtoken');
const HttpError = require('../models/errorModel');


// Middleware to check if the user is authenticated
const authMiddleware = (req, res, next) => {
    const Authorization = req.headers.authorization || req.headers.Authorization; // Check both lowercase and capitalized headers
    if (!Authorization || !Authorization.startsWith('Bearer ')) {
        return next(new HttpError(401, "Authentication token is missing."));
    }

    const token = req.headers.authorization?.split(' ')[1]; // Extract token from Authorization header

    if (!token) {
        return next(new HttpError(401, "Authentication token is missing."));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user info to request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        return next(new HttpError(401, "Invalid authentication token."));
    }
};


module.exports = authMiddleware;