const User = require("../models/user.model.js");
const config = require("../config/db.config.js");
const bcrypt = require('bcrypt');
const async = require("async");
const jwt = require('jsonwebtoken');
const {errorHandler} = require("../utils/error.handler.js");

exports.chk_token = (req, res) => {
    const token = req.headers["x-access-token"];
    try {
        const decoded = jwt.verify(token, config.JWT_KEY);
        res.send({
            success: 'true',
            data: true
        })
      } catch (err) {
        res.send({
            success: 'true',
            data: false
        })
    }
}

exports.login = (req, res) => {
    const {username, password} = req.body;
    async.waterfall([
        // To find user by username
        function(done) {
            User.findByUsername(username, function(err, user) {
                if(err) {
                    done(err);
                } else if(user == null) {
                    res.send({
                        success: 'false',
                        msg: 'Username not exists!'
                    });
                    return;
                } else {
                    done(null, user);
                }
            });
        },
        // To check passwod
        function(user, done) {
            bcrypt.compare(password, user.password).then(equal => {
                if(!equal) {
                    res.send({
                        success: 'false',
                        msg: 'Password incorrect'
                    });
                    return;
                } else {
                    done(null, user);
                }
            })
        },
        // To check admin role
        function(user, done) {
            if(user.role.toUpperCase() != 'ADMIN') {
                res.send({
                    success: 'false',
                    msg: 'No Authority'
                });
                return;
            } else {
                done(null, user);
            }
        },
        // To generate user token
        function(user, done) {
            // Create token
            const token = jwt.sign(
                { id: user.id, username: user.username, email: user.email },
                config.JWT_KEY,
                {
                    expiresIn: "2h",
                }
            );
        
            // save user token
            user.token = token;
        
            // user
            res.send({
                success: 'true',
                data: user
            })
        }
    ],
    function(err) {
        errorHandler(err);
    })
};

exports.register = (req, res) => {
    const username = req.body.reg_username;
    const email = req.body.reg_email;
    const password = req.body.reg_password;

    async.series([
        // To check whether the same username already exists.
        function(done) {
            // console.log('checking whether the same username already exists...username=' + username);
            User.findByUsername(username, function(err, user) {
                if(err) {
                    done(err);
                } else if(user) {
                    res.send({
                        success: 'false',
                        msg: 'The same username already exists!'
                    });
                    return;
                } else {
                    done(null);
                }
            })    
        },
        // To register a new user.
        function(done) {
            // console.log('registering a new user.....');
            bcrypt.hash(password, 10).then( (enc_pass) => {
                const newUser = {
                    username,
                    password: enc_pass,
                    email,
                };
                // console.log(newUser);
                User.create(newUser, function(err, user) {
                    if(err) {
                        done(err);
                    }
                    else {
                        res.send({
                            success: 'true',
                            data: user
                        });
                        done(null);
                    }
                })
            });
        }
        ], 
        function(err, user) {
            if(err) {
                errorHandler(err, req, res);
            }
        }
    );
};

exports.updtPass = (req, res) => {
    const username = req.user.username;
    const {old_password, new_password} = req.body;

    async.waterfall([
        // To check whether the same username already exists.
        function(done) {
            User.findByUsernameAndPassword(username, old_password, function(err, user) {
                if(err) {
                    done(err);
                } else if(!user) {
                    res.send({
                        success: 'false',
                        msg: 'Please input correct old password.'
                    });
                    return;
                } else {
                    done(null, user);
                }
            })
        },
        // To update password
        function(user, done) {
            console.log('updating password .....');
            bcrypt.hash(new_password, 10).then( (enc_pass) => {
                user.password = enc_pass;
                User.updateById(user.id, user, function(err, updtUser) {
                    if(err) { 
                        done(err);
                    }
                    else if(!updtUser){
                        res.send({
                            success: 'false',
                            msg: 'Some errors occured during operation.'
                        });
                        return;
                    } else {
                        res.send({
                            success: 'true',
                            msg: 'Password was updated successfuly.'
                        })
                        return;
                    }
                })
            });
        }
    ],
    function(err) {
        if(err) {
            errorHandler(err, req, res);
        }
    });
};

exports.logout = (req, res) => {

}