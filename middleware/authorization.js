import jwt from 'jsonwebtoken'; // bcrypt is a function
import config from 'config'; // config is a function

function authorization(req, res, next){
    const token = req.header('x-auth-token');

    // unauthorized user
    if(!token) return res.status(401).send('Access denied. No token provided !!');

    try {
        const decodedPayload = jwt.verify(token, config.get('jwtPrivateKey'));
        req.user = decodedPayload;
        //req.params.user = decodedPayload;
    } catch (error){
        // bad request
        return res.status(400).send('Invalid Token !!');
    }
    // pass control to the next request processing pipeline (Route Handler)
    next();
}

export default authorization;