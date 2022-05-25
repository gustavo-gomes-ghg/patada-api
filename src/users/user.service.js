const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
require('dotenv').config();
const validateCaptcha = require('_middleware/captcha/validate-captcha');
const Exception       = require('_middleware/exception');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await db.User.findAll();
}

async function getById(id) {
    return await getUser(id);
}

async function create(params) {

    if ( !(process.env.EMAIL_VALIDATION_SALT) ) {
        throw new Exception(500, 'Server error');
    }
    const validation_salt = (process.env.EMAIL_VALIDATION_SALT) ? process.env.EMAIL_VALIDATION_SALT : '';

    if ( va)

    // validate part 1
    if (   !params.login_usp 
        || !params.email_usp 
        || !params.senha_usp 
        || !params.captcha_usp 
        )
    {
        throw new Exception(412, 'Insufficient data');
    }

    // validate part 2 - Email
    if (await db.User.findOne({ where: { email_usp: params.email_usp } })) {
        throw new Exception(409, 'Email "' + params.email_usp + '" is already registered');

    } else if (await db.User.findOne({ where: { login_usp: params.login_usp } })) {
        throw new Exception(409, 'Login "' + params.login_usp + '" is already registered');
    }

    // validate part 3 - captcha
    if (   params.captcha_usp === null 
        || params.captcha_usp === undefined 
        || params.captcha_usp === NaN ) 
    {
        throw new Exception(412, 'Inconsistent captcha data');
    }    

    // validate part 4 - captcha
    const status = await validateCaptcha( params.captcha_usp );
    if ( status.success === false ) {
        throw new Exception(409, 'Invalid captcha');
    }

    // instantiate user object
    const user = new db.User(params);
    
    // hash password
    user.password_usp = await bcrypt.hash(params.password_usp, 10);

    // save user
    const saved_user = await user.save();

    // generate validation code
    const now = new Date().toString();
    const validation_code = window.btoa(`${validation_salt}${saved_user.id_usp}|${now}`)
    const validation = JSON.stringify({
        code: validation_code,
        status: false,
        date: null
    });

    // update user validation code
    await db.User.update({validation_usp: validation}, {
        where: {
            id_usp: saved_user.id_usp
        }
    });

    // send welcome email to new user
    
    
}

async function update(id, params) {
    const user = await getUser(id);

    // validate
    const emailChanged = params.email && user.email !== params.email;
    if (emailChanged && await db.User.findOne({ where: { email: params.email } })) {
        throw new Exception(409, 'Email "' + params.email + '" is already registered');
    }

    // hash password if it was entered
    if (params.password) {
        params.passwordHash = await bcrypt.hash(params.password, 10);
    }

    // copy params to user and save
    Object.assign(user, params);
    await user.save();
}

async function _delete(id) {
    const user = await getUser(id);
    await user.destroy();
}

// helper functions

async function getUser(id) {
    const user = await db.User.findByPk(id);
    if (!user) throw new Exception(409, 'User not found');
    return user;
}
