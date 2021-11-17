import config from 'config'; // config is a function

function configuration() {
    // config Intialization
    if(!config.get('jwtPrivateKey')){
        throw new Error('FATAL ERROR: jwtPrivateKey is not defined !!');
    }
}

export default configuration;
