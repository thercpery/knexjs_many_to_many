const knex = require("../db/config");

/* 
    Get all categories
    Business Logic:
    1. Get all the categories data from the database.
    2. Display the data.
*/
exports.viewAllCategories = (req, res) => {
    knex.select().from("categories")
        .then(categories => res.status(200).send(categories))
        .catch(err => {
            console.log(err);
            res.status(500).send(false);
        });
};

/* 
    Add a category
    Business Logic:
    1. Check the categories database if the given category exists.
    2. If it does, return false.
    3. If it doesn't, save it to the database.
*/

exports.createCategory = (req, res) => {
    const categoryData = req.body;
    knex.select().from("categories").where({
        title: categoryData.title
    })
        .then(category => {
            if(category.length !== 0){
                // If it exists.
                res.status(200).send(false);
            }
            else{
                // If it does not exist.
                knex("categories").insert(categoryData)
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
    Attach a category into the post.
    Business Logic:
    1. Get the post ID from the request body and category ID from the request parameter.
    2. Insert the data into the categories_posts table.
*/
exports.attachPostCategory = (req, res) => {
    const ids = {
        post_id: req.body.post_id,
        category_id: req.params.id
    };
    knex("categories_posts").insert(ids)
        .then(saved => res.status(201).send(true))
        .catch(err => {
            console.log(err);
            res.status(500).send(false);
        });
};

/* 
    Get categories by title list
    Business Logic:
    1. Get the title from the request parameter / URL.
    2. Find the category thru its title.
    3. If found, return the data.
    4. If not, return false.
*/
exports.getCategoryByTitle = (req, res) => {
    const title = req.params.title
    knex.select().from("categories").where({
        title: title
    })
        .then(category => {
            if(category.length !== 0){
                // If data found
                res.status(200).send(category)
            }
            else{
                // If empty
                res.status(400).send(false);
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).send(false);
        });
};

