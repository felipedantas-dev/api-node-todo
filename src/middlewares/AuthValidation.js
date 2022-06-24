const jwt = require('jsonwebtoken');

const AuthValidation = async (req, res, next) => {

    try {

        var token = req.headers['x-access-token'];

        if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
        
        jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
        
            if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
            
            req.userId = decoded.id;
            
            next();

        });

    } catch {

        return res.status(500).json({auth: false});

    }

}

module.exports = AuthValidation;