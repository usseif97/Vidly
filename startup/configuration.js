import config from 'config'; // config is a function

function configuration() {
    // config Intialization
    if(!config.get('jwtPrivateKey')){
        throw new Error('FATAL ERROR: jwtPrivateKey is not defined !!');
    }

    // according to the environmnet (development - production)
    console.log(`Application Name: ${config.get('name')}`);
    console.log(`Mail Server: ${config.get('mail.host')}`);
}

export default configuration;
