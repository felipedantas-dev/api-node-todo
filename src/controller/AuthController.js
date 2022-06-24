const { SECRET_USER, SECRET_PASSWORD, SECRET_KEY } = process.env;

const jwt = require('jsonwebtoken');

class AuthController {

    async create (req, res) {

        const id = 1;

        if (!req.body.user || !req.body.password) {
            return res.status(500).json({auth: false});
        }

        if (req.body.user === process.env.SECRET_USER && req.body.password === process.env.SECRET_PASSWORD) {
            
            try {

                var token = await jwt.sign({ id }, SECRET_KEY, {
                    expiresIn: 30
                });
    
                return res.status(200).json({ auth: true, token: token });
            
            } catch {

                return res.status(500).json({auth: false});

            }
        
        }

        return res.status(500).json({auth: false});

    }
    
}

module.exports = new AuthController();