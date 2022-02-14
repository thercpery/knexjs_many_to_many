const knex = require("../db/config");

/* 
    Get all posts 
    Business Logic:
    1. Get all the posts in the database.
    2. Display all the data.
*/
exports.viewAllPosts = (req, res) => {
    knex.select().from("posts")
        .then(posts => res.status(200).send(posts))
        .catch(err => {
            console.log(err);
            res.status(500).send(false);
        });
};

/* 
    Get post categories by ID.
    Business Logic:
    1. Get the post ID through the request parameter.
    2. Find the post with its ID.
    3. Join the tables categories_posts that mat.ches the posts.ID and categories that matches the categories_posts.categories_id
    4. If post is found, display the data with its categories.
    5. If not, return false.
*/
exports.getPostCategoriesById = (req, res) => {
    knex.select("posts.*", "categories.title as category_title")
        .from("posts")
        .leftJoin("categories_posts", {"categories_posts.post_id": "posts.id"})
        .leftJoin("categories", {"categories_posts.category_id": "categories.id"})
        .where({
            "posts.id": req.params.id
        })
        .then(post => {
            if(post !== 0){
                // If data found.
                res.status(200).send(post);
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


// /* 
//     View post by post ID.
//     Business Logic:
//     1. Get the post ID by the request parameter in the URL.
//     2. Find the post by the post ID.
//     3. 
// */
// exports.viewPostById = (req, res) => {

// };