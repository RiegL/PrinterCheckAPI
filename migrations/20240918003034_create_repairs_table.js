import knex from 'knex';

/**
 * @param { knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable('repairs', (table) => {
    table.increments('id').primary();
    table.integer('printer_id').unsigned().notNullable();
    table.foreign('printer_id').references('printers.id').onDelete('CASCADE');
    table.string('codigo_identificador'); // Código interno gerado pela empresa
    table.text('repair_description').notNullable(); // Descrição do que foi feito
    table.enu('status', ['Danificada', 'Verificada', 'Pronta para Enviar', 'Enviada']).notNullable();
    table.integer('user_id').unsigned().notNullable();
    table.foreign('user_id').references('users.id').onDelete('CASCADE');
    table.timestamp('repair_date').defaultTo(knex.fn.now());
  });
}

/**
 * @param { knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema.dropTable('repairs');
}
