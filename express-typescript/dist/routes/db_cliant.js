"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db_cliant = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const db_cliant = new sequelize_typescript_1.Sequelize('postgress://postgress:postgress@localhost/');
exports.db_cliant = db_cliant;
