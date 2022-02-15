const knex = require("../db/config");
const bcrypt = require("bcrypt");
const auth = require("../auth");

/* 
    Check if username exists
    Business Logic
    1. Get the username from the request body.
    2. Check if the username exists from the database.
    3. If it exists, return true.
    4. If it is not, return false.
*/
exports.checkUsernameExists = (req, res) => {
    knex.select().from("users").where({
        username: req.body.username
    })
        .then(user => {
            if(user.length !== 0){
                // If user exists.
                res.status(200).send(true);
            }
            else{
                // If user does not exist.
                res.status(200).send(false);
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).send(false);
        });
};

/* 
    Register a user
    Business Logic:
    1. Get the user data from request body.
    1. Check if the username exists.
    2. If the username exists, return false.
    3. If the username does not exist, save the data to the database.
*/
exports.registerUser = (req, res) => {
    const userData = {
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        is_admin: req.body.is_admin || false
    };

    knex.select().from("users").where({
        username: userData.username
    })
        .then(user => {
            if(user.length !== 0) {
                // If user exists.
                res.status(200).send(false);
            }
            else{
                // If user does not exist.
                knex("users").insert(userData)
                    .then(saved => res.status(201).send(true))
                    .catch(err => {
                        console.log(err);
                        res.status(500).send(false);
                    });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).send(false);
        });
};

/* 
    Login User / User Authentication
    Business Logic:
    1. Check if the username exists in the database.
    2. If user exists, compare the password provided in the login form with the password stored in the database.
    3. Generate / return a jsonwebtoken if the user is successfully logged in. Return false if not.
*/
exports.loginUser = (req, res) => {
    const userData = {
        username: req.body.username,
        password: req.body.password
    };
    knex.select()
        .from("users")
        .where({
            username: userData.username
        })
        .then(user => {
            if(user.length !== 0){
                const isPasswordCorrect = bcrypt.compareSync(userData.password, user[0].password);
                if(isPasswordCorrect){
                    res.status(200).send({ accessToken: auth.createAccessToken(user[0]) });
                }
                else{
                    res.status(200).send(false);
                }
            }
            else{
                // User does not exist.
                res.status(200).send(false);
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).send(false);
        });
};

/* 
    Make user as an admin
    Business Logic:
    1. Get the user data that is logged in and request body.
    2. If the user logged in is admin, make the user in the request body an admin.
*/

exports.makeAdmin = (req, res) => {
    const sessionUser = auth.decode(req.headers.authorization);
    const userData = req.body;

    if(sessionUser.is_admin){
        // If user is admin
        knex
            .select()
            .from("users")
            .where({
                username: userData.username
            })
            .then(user => {
                if(user.length !== 0){
                    // If user is found
                    knex("users")
                        .update({
                            is_admin: !user.is_admin
                        })
                        .where({
                            username: userData.username
                        })
                        .then(saved => res.status(201).send(true))
                        .catch(err => {
                            console.log(err);
                            res.status(500).send(false);
                        });
                }
                else{
                    // If user is not found
                    res.status(200).send(false);
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).send(false);
            });
        // knex("users").
        //     update({
        //         is_admin: true
        //     })
        //     .where({
        //         username: userData.username
        //     })
        //     .then(user => {
        //         res.send(user);
        //     })
        //     .catch(err => {
        //         console.log(err);
        //         res.status(500).send(false);
        //     });
    }
    else{
        // If user is not an admin
        res.status(200).send(false);
    }
};


/* 
    View all users
    1. Get the session data from the JWT token.
    2. If user is an admin, return all the users data except the password.
    3. If not, return false.
*/
exports.viewAllUsers = (req, res) => {
    const sessionUser = auth.decode(req.headers.authorization);
    if(sessionUser.is_admin){
        // If user is an admin.
        knex
            .select("id", "username", "is_admin", "created_at", "updated_at")
            .from("users")
            .then(users => res.status(200).send(users))
            .catch(err => {
                console.log(err);
                res.status(500).send(false);
            });
    }
    else{
        // If user is not an admin.
        res.status(200).send(false);
    }
};

/* 
    View posts by user ID
    Business Logic:
    1. Get the username through the URL.
    2. Find the user's data in the database thru the username.
    3. If not found, return false.
    4. If found, return the data including its posts.
*/
exports.viewUserByUsername = (req, res) => {
    const username = req.params.username;
    knex.select("username", "email")
        .from("users")
        .where({
            username: username
        })
        .then(user => {
            if(user.length !== 0){
                // If user exists

                // const posts = {};
                // knex.select().from("posts").where({
                //     user_id: user.id
                // })
                //     .then(post => {
                //         console
                //     })
                //     .catch(err => {
                //         console.log(err);
                //         res.status(500).send(false);
                //     });
                // console.log(posts);

                res.status(200).send(user);
            }
            else{
                // If user does not exist
                res.status(400).send(false);
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).send(false);
        });
};