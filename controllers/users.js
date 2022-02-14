const knex = require("../db/config");

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
        email: req.body.email
    };

    console.l
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
    View posts by user ID
    Business Logic:
    1. Get the username through the URL.
    2. Find the user's data in the database thru the username.
    3. If not found, return false.
    4. If found, return the data including its posts.
*/
exports.viewUserByUsername = (req, res) => {
    const username = req.params.username;
    knex.select().from("users").where({
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