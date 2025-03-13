function errorHandler(error, req, res, next) {
    console.log(error);
    switch (error.name) {
        case "SequelizeValidationError":
        case "SequelizeUniqueConstraintError":
            return res.status(400).json({ message: error.errors[0].message });
        case "BadRequest":
            return res.status(400).json({ message: error.message });
        case "Unauthorized":
            return res.status(401).json({ message: error.message });
        case "Forbidden":
            return res.status(403).json({ message: error.message });
        case "NotFound":
            return res.status(404).json({ message: error.message });
        case "JsonWebTokenError":
            return res.status(401).json({ message: "Invalid token" });
        default:
            return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = errorHandler;
