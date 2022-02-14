/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {
      id: 1, 
      username: 'johndoe',
      email: "johndoe@mail.com"
    },
    {
      id: 2, 
      username: 'janedoe',
      email: "janedoe@mail.com"
    },
    {
      id: 3, 
      username: 'rcpery',
      email: "rcpery@mail.com"
    },
    {
      id: 4, 
      username: 'iamrcpery',
      email: "iamrcpery@gmail.com"
    },
    {
      id: 5, 
      username: 'jondope',
      email: "iamdope@mail.com"
    }
  ]);

  await knex.raw("select setval('users_id_seq', max(users.id)) from users");
};
