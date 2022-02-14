/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('posts').del()
  await knex('posts').insert([
    {
      id: 1, 
      title: 'Post # 1',
      post: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit sunt laborum similique earum adipisci at laboriosam ullam magni dicta unde deleniti animi iure eaque, veniam alias atque aut corrupti harum, libero fuga tempora commodi quas. Illo et sed a velit impedit tempore accusantium ratione atque culpa, minima mollitia odio laudantium inventore corrupti voluptatem porro commodi suscipit nam numquam sit quam adipisci. Similique quod sit quam vel id ipsa minus beatae quisquam eum illum rem quis officia explicabo placeat, error maxime, molestias veritatis fugiat, praesentium accusamus modi eligendi! Incidunt adipisci, nemo eos aspernatur nisi, aliquam tenetur perferendis sint architecto, atque suscipit.",
      user_id: 1
    },
    {
      id: 2, 
      title: 'Post # 2',
      post: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit sunt laborum similique earum adipisci at laboriosam ullam magni dicta unde deleniti animi iure eaque, veniam alias atque aut corrupti harum, libero fuga tempora commodi quas. Illo et sed a velit impedit tempore accusantium ratione atque culpa, minima mollitia odio laudantium inventore corrupti voluptatem porro commodi suscipit nam numquam sit quam adipisci. Similique quod sit quam vel id ipsa minus beatae quisquam eum illum rem quis officia explicabo placeat, error maxime, molestias veritatis fugiat, praesentium accusamus modi eligendi! Incidunt adipisci, nemo eos aspernatur nisi, aliquam tenetur perferendis sint architecto, atque suscipit.",
      user_id: 2
    },
    {
      id: 3, 
      title: 'Post # 3',
      post: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit sunt laborum similique earum adipisci at laboriosam ullam magni dicta unde deleniti animi iure eaque, veniam alias atque aut corrupti harum, libero fuga tempora commodi quas. Illo et sed a velit impedit tempore accusantium ratione atque culpa, minima mollitia odio laudantium inventore corrupti voluptatem porro commodi suscipit nam numquam sit quam adipisci. Similique quod sit quam vel id ipsa minus beatae quisquam eum illum rem quis officia explicabo placeat, error maxime, molestias veritatis fugiat, praesentium accusamus modi eligendi! Incidunt adipisci, nemo eos aspernatur nisi, aliquam tenetur perferendis sint architecto, atque suscipit.",
      user_id: 2
    },
    {
      id: 4, 
      title: 'Post # 4',
      post: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit sunt laborum similique earum adipisci at laboriosam ullam magni dicta unde deleniti animi iure eaque, veniam alias atque aut corrupti harum, libero fuga tempora commodi quas. Illo et sed a velit impedit tempore accusantium ratione atque culpa, minima mollitia odio laudantium inventore corrupti voluptatem porro commodi suscipit nam numquam sit quam adipisci. Similique quod sit quam vel id ipsa minus beatae quisquam eum illum rem quis officia explicabo placeat, error maxime, molestias veritatis fugiat, praesentium accusamus modi eligendi! Incidunt adipisci, nemo eos aspernatur nisi, aliquam tenetur perferendis sint architecto, atque suscipit.",
      user_id: 5
    },
    {
      id: 5, 
      title: 'Post # 5',
      post: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit sunt laborum similique earum adipisci at laboriosam ullam magni dicta unde deleniti animi iure eaque, veniam alias atque aut corrupti harum, libero fuga tempora commodi quas. Illo et sed a velit impedit tempore accusantium ratione atque culpa, minima mollitia odio laudantium inventore corrupti voluptatem porro commodi suscipit nam numquam sit quam adipisci. Similique quod sit quam vel id ipsa minus beatae quisquam eum illum rem quis officia explicabo placeat, error maxime, molestias veritatis fugiat, praesentium accusamus modi eligendi! Incidunt adipisci, nemo eos aspernatur nisi, aliquam tenetur perferendis sint architecto, atque suscipit.",
      user_id: 3
    }
  ]);
  
  await knex.raw("select setval('posts_id_seq', max(posts.id)) from posts");
};
