import knex from 'knex';

/**
 * @param { knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable('printers', (table) => {
    table.increments('id').primary();
    table.string('client').notNullable();
    table.string('serial_number').notNullable().unique();
    table.integer('etiquetas_inicial').notNullable(); // Número de etiquetas impressas inicialmente
    table.text('description');
    table.enu('status', ['Danificada', 'Verificada', 'Pronta para Enviar', 'Enviada']).notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
}

/**
 * @param { knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema.dropTable('printers');
}
