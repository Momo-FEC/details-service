const db = require('./database/index.js');
const Models = require('./database/models.js');
const axios = require('axios');
const adapter = require('axios/lib/adapters/http');
var { sequelize } = Models;
var { Phone, Capacity, Carrier, Color } = Models;
var { PhonesCapacities, PhonesCarriers, PhonesColors } = Models;

// this line is needed to prevent error after jest runs
require('mysql2/node_modules/iconv-lite').encodingExists('foo');

// // resets the database (tears down and rebuilds)
beforeEach(() => {
  return require('./database/build.js');
})

it('should add data to all tables for first record added', () => {
  // expect.assertions(4);
  return db.addOne({
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
  .catch(() => {
    console.log('an error was caught');
  });
});

// test('should add 100 more phone records after seed', async () => {
//   await require('./database/seed.js')
//   expect.assertions(4);
//   return Promise.all([Phone.findAll(),
//         Capacity.findAll(),
//         Carrier.findAll(),
//         Color.findAll()])
//     .then(([phones, capacities, carriers, colors]) => {
//       expect(phones.length).toBe(101);
//       expect(capacities.length).toBeLessThan(10);
//       expect(carriers.length).toBeLessThan(10);
//       expect(colors.length).toBeLessThan(10);
//     })
//     .catch(() => {})
// })

it('should retrieve data for a given ID', () => {
  expect.assertions(1);
  return db.addOne({
    name: 'string',
    productCode: 'also string',
    capacities: ['small', 'big'],
    carriers: ['carrierOne', 'carrierTwo'],
    colors: ['red', 'blue', 'green']
  })
    .then(() => {
      axios.get('http://localhost:3002/phones/1', { adapter })
    })
    .then((response) => {
      console.log(response.data);
      expect(typeof(response.data)).toBe('object');
    })
    .catch((err) => {
      expect(err).toBe('undefined');
    })
})