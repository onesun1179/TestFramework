const mode = process.env.NODE_ENV === "development" ? "DEV_DB_" : "PRO_DB_";

export const sequelizeStoreConfig = {
	database: `${process.env[`${mode}NAME`]}`,
	dialect: `${process.env[`${mode}TYPE`]}` as any,
	username: `${process.env[`${mode}USER`]}`,
	password: `${process.env[`${mode}PASSWORD`]}`,
};
