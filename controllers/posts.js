const knex = require("../db/config");
const auth = require("../auth");

/* 
    Get all posts 
    Business Logic:
    1. Get all the posts in the database.
    2. Include the users who posted the post.
    2. Display all the posts data including the username.
*/
exports.viewAllPosts = (req, res) => {
    knex.select("posts.*", "users.username as username")
        .from("posts")
        .innerJoin("users", {"users.id": "posts.user_id"})
        .then(posts => res.status(200).send(posts))
        .catch(err => {
            console.log(err);
            res.status(500).send(false);
        });
};

/* 
    Create a post
    Business Logic:
    1. Get the user ID from the authorization token.
    2. Save the post to the database.
*/
exports.createAPost = (req, res) => {
    const userData = auth.decode(req.headers.authorization);
    const postData = {
        title: req.body.title,
        post: req.body.post,
        user_id: userData.id
    };
    knex("posts").insert(postData)
        .then(saved => res.status(201).send(true))
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
    3. Join the tables categories_posts that matches the posts.ID and categories that matches the categories_posts.categories_id
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