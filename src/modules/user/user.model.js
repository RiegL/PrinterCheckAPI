import bcrypt from "bcrypt";
import knex from "../../config/database.js";

export const getAll = async () => {
  return knex("users").select(
    "id",
    "name",
    "email",
    "created_at",
    "updated_at",
    "password"
  );
}; // lista todos os usuarios

export const getById = async (id) => {
  return knex("users")
    .where({ id })
    .select("id", "name","password", "email", "created_at", "updated_at")
    .first();
};// busca um usuario pelo id

export const create = async (params) => {
  params.password = await bcrypt.hash(params.password, 10);
  return knex("users").insert(params);
};// cria um novo usuario

export const remove = async (id) => {
  return knex("users").where({ id }).delete();
};// deleta um usuario pelo id

export const update = async (id, params) => {
  return knex("users").where({ id }).update(params);
};// atualiza um usuario pelo id

export const getByEmail = async (email) => {
  return knex("users").where({ email }).first();
};// busca um usuario pelo email
