/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createTable("users", (table) => {
            table.increments("id").primary();
            table.string("username").unique().notNullable();
            table.string("email").unique().notNullable();
            table.string("password").notNullable();
            table.boolean("is_admin").defaultTo(false);
            table.timestamp("created_at").defaultTo(knex.fn.now());
            table.timestamp("updated_at").defaultTo(knex.fn.now());
        })
        .createTable("posts", (table) => {
            table.increments("id").primary();
            table.string("title").notNullable();
            table.text("post").notNullable();
            table.integer("user_id").references("id").inTable("users");
            table.timestamp("created_at").defaultTo(knex.fn.now());
            table.timestamp("updated_at").defaultTo(knex.fn.now());
        })
        .createTable("categories", (table) => {
            table.increments("id").primary();
            table.string("title").notNullable();
            
        })
        .createTable("categories_posts", (table) => {
            table.increments("id").primary();
            table.integer("post_id").references("id").inTable("posts");
            table.integer("category_id").references("id").inTable("categories");
            table.timestamp("created_at").defaultTo(knex.fn.now());
            table.timestamp("updated_at").defaultTo(knex.fn.now());
        })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists("categories_posts")
        .dropTableIfExists("posts")
        .dropTableIfExists("categories")
        .dropTableIfExists("users");
};
