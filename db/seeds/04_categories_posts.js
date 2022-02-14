/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('categories_posts').del()
  await knex('categories_posts').insert([
    {
      id: 1, 
      post_id: 1,
      category_id: 1
    },
    {
      id: 2, 
      post_id: 2,
      category_id: 2
    },
    {
      id: 3, 
      post_id: 3,
      category_id: 2
    },
    {
      id: 4, 
      post_id: 4,
      category_id: 5
    },
    {
      id: 5, 
      post_id: 5,
      category_id: 5
    },
    {
      id: 6, 
      post_id: 2,
      category_id: 5
    }
  ]);

  await knex.raw("select setval('categories_posts_id_seq', max(categories_posts.id)) from categories_posts");
};
