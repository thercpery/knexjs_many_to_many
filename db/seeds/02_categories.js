/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('categories').del()
  await knex('categories').insert([
    {id: 1, title: 'HTML'},
    {id: 2, title: 'CSS'},
    {id: 3, title: 'Javascript'},
    {id: 4, title: 'Python'},
    {id: 5, title: 'Web programming'}
  ]);

  await knex.raw("select setval('categories_id_seq', max(categories.id)) from categories");
};
