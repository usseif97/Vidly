// return async route handler
// This returned route handler use the passed argumnet handler 
function asyncMiddleware(handler){
    return async(req, res, next) => {
        try{
            await handler(req, res, next);
        } catch (ex){
            // pass the control to the next request pipeline (Error Handler)
            next(ex);
        }
    }
}

export default asyncMiddleware;
