import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('clients', table => {
    table.string('id').primary();
    table.string('name', 120).notNullable();
    table.string('phone', 20);
    table.string('email', 120);
    table.text('notes');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('clients');
}
