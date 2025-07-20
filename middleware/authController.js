const jwt = require('jsonwebtoken');

const loginCheck = (req, res, next) => {
    const authHeader = req.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: `Token is missing or wrong!!` })
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.id;
        next();
    } catch (error) {
        return res.status(401).json({ message: `Invald Token!!`, error: error.message })
    }
}

module.exports = loginCheck;