const db = require('./database/index.js');
const Models = require('./database/models.js');
var { sequelize } = Models;
var { Phone, Capacity, Carrier, Color } = Models;
var { PhonesCapacities, PhonesCarriers, PhonesColors } = Models;

// this line is needed to prevent error after jest runs
require('mysql2/node_modules/iconv-lite').encodingExists('foo');


// need to empty db manually first: npm run dbEmpty
test('should add data to all tables for first record added', () => {
  db.addOne({
    name: 'string',
    productCode: 'also string',
    capacities: ['small', 'big'],
    carriers: ['carrierOne', 'carrierTwo'],
    colors: ['red', 'blue', 'green']
  })
  .then(() => {
    return Promise.all([Phone.findAll(),
      Capacity.findAll(),
      Carrier.findAll(),
      Color.findAll()])
  })
  .then(([phones, capacities, carriers, colors]) => {
    expect(phones.length).toBe(1);
    expect(capacities.length).toBe(2);
    expect(carriers.length).toBe(2);
    expect(colors.length).toBe(3);
  })
});

sequelize.close();