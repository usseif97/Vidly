function admin(req, res, next){
    // Forbidden
    if(!req.user.isAdmin) return res.status(403).send('Access denied.');
    // pass control to the next request processing pipeline (Route Handler)
    next();
}

export default admin;


// 401 Unauthorized  (inValid JWT)
// 403 Forbidden     (Valid JWT but not admin)