var { sequelize } = require('./models.js');

sequelize.sync({ force: true })
  .then(() => {
    return sequelize.close();
  });