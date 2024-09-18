import knex from 'knex';

/**
 * @param { knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable('activity_logs', (table) => {
    table.increments('id').primary();
    table.integer('user_id').unsigned().notNullable();
    table.foreign('user_id').references('users.id').onDelete('CASCADE');
    table.string('action').notNullable();
    table.integer('printer_id').unsigned();
    table.foreign('printer_id').references('printers.id').onDelete('CASCADE');
    table.integer('repair_id').unsigned();
    table.foreign('repair_id').references('repairs.id').onDelete('CASCADE');
    table.timestamp('timestamp').defaultTo(knex.fn.now());
  });
}

/**
 * @param { knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema.dropTable('activity_logs');
}
