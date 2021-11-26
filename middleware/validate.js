// validate the request
function validate (validator){
    return (req, res, next) => {
        const result = validator(req.body);
        if(result.error){
            // Bad request
            return res.status(400).send(result.error.details[0].message);
        }
        next();
    }
}

export default validate;