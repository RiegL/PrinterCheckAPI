import knex from "../../config/database.js";

const TABLE = 'printers';

export const getAll = async () => {
  return knex(TABLE).select("*");
};

export const getById = async (id) => {
  return knex(TABLE)
    .where({ id })
    .select('*')
    .first();
};

export const create = async (params) => {
  return knex(TABLE).insert(params);
};

export const remove = async (id) => {
  return knex(TABLE).where({ id }).del();
};

export const update = async (id, params) => {
  return knex(TABLE).where({ id }).update(params);
};
