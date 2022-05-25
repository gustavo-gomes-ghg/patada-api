const https = require('https');
require('dotenv').config();

module.exports = validateCaptcha;

async function validateCaptcha( catpcha = null ) {

    // validate captcha
    let captcha_secret_key = process.env.CAPTCHA_SECRET_KEY;
    var options = {
        hostname: 'google.com',
        path: `/recaptcha/api/siteverify?secret=${captcha_secret_key}&response=${params.captcha_usp}`,
        method: 'GET',
        port: 443
    };
      
    const req = https.request(options, res => {
        console.log(`statusCode: ${res.statusCode}`);
        
        res.on('data', d => {
            process.stdout.write(d);
            return d;
        });
    });
        
    req.on('error', error => {
        //console.error(error);
        return error;
    });
    
    req.write(data);
    req.end();
}