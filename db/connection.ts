import { Sequelize } from 'sequelize'


const db = new Sequelize('node','root','fmuller',{
    host:'localhost',
    dialect:'mariadb',
    logging: false
});


export default  db;


