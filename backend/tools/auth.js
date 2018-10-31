const User = require('../models/User')
const errMessages = require('./errorMessages');
exports.authenticate = (username, password) => {
    return new Promise( (resolve, reject) => {
;        User.findByPk(username)
            .then( user => {
                // console.log(user)
                if( user==null || user == undefined){
                    throw new Error(errMessages.NOUSER);
                }
                user = user['dataValues'];
                console.log(user)
                if(password == user.password) {
                    resolve(user);
                }else {
                    throw new Error(errMessages.WRONGPASSWORD);
                }
                
            })
            .catch( err => {
                // console.log(err['message']);
                reject(err['message']);
            })
    })
}

exports.signup = (user) => {
    const { name, username, password, email, role, phone } = user;
    return new Promise((resolve, reject) => {
        User.create({ username, name, password, email, role, phone })
            .then( user => {
                console.log(user);
            })
            .catch( err => {
                console.log(err);
            })
    })

}