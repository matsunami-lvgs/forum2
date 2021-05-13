import { Sequelize } from 'sequelize-typescript'
const db_cliant = new Sequelize(
    'postgress://postgress:postgress@localhost/'
);

export{db_cliant};
