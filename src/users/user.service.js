const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const validateCaptcha = require('_middleware/validate-captcha');

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

    // validate part 1
    if (   !params.login_usp 
        || !params.email_usp 
        || !params.senha_usp 
        || !params.captcha_usp 
        )
    {
        throw 'Insufficient data';
    }

    // validate part 2 - Email
    if (await db.User.findOne({ where: { email_usp: params.email_usp } })) {
        throw 'Email "' + params.email_usp + '" is already registered';
    }

    // validate part 3 - captcha
    if (   params.captcha_usp === null 
        || params.captcha_usp === undefined 
        || params.captcha_usp === NaN ) 
    {
        throw 'Inconsistent captcha data';
    }    

    // validate part 4 - captcha
    const status = await validateCaptcha( params.captcha_usp );
    if ( status.success === false ) {
        throw 'Invalid captcha';
    }

    // instantiate user object
    const user = new db.User(params);
    
    // hash password
    user.password_usp = await bcrypt.hash(params.password_usp, 10);

    // save user
    await user.save();
}

async function update(id, params) {
    const user = await getUser(id);

    // validate
    const emailChanged = params.email && user.email !== params.email;
    if (emailChanged && await db.User.findOne({ where: { email: params.email } })) {
        throw 'Email "' + params.email + '" is already registered';
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
    if (!user) throw 'User not found';
    return user;
}
