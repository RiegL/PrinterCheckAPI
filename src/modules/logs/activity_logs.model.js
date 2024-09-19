import knex from '../../db/knex.js';

export const getAll = () => {
  return knex('activity_logs').select('*');
};

export const getById = (id) => {
  return knex('activity_logs').where({ id }).first();
};

export const create = (logEntry) => {
  return knex('activity_logs').insert(logEntry).returning('*');
};

export const remove = (id) => {
  return knex('activity_logs').where({ id }).del();
};
