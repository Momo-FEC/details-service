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
  return sequelize.sync({ force: true });
});

afterAll(() => {
  return sequelize.close();
});

it('should add data to all tables for first record added', () => {
  expect.assertions(4);
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
        Color.findAll()]);
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

it('should add 100 more phone records after seed', () => {
  expect.assertions(4);
  return require('./database/seed.js')()
    .then(() => {
      return Promise.all([Phone.findAll(),
        Capacity.findAll(),
        Carrier.findAll(),
        Color.findAll()]);
    })
    .then(([phones, capacities, carriers, colors]) => {
      expect(phones.length).toBe(50);
      expect(capacities.length).toBeLessThan(10);
      expect(carriers.length).toBeLessThan(10);
      expect(colors.length).toBeLessThan(10);
    })
    .catch(() => {});
});

it('should retrieve data for a given ID', () => {
  expect.assertions(3);
  return db.addOne({
    name: 'string',
    productCode: 'also string',
    capacities: ['small', 'big'],
    carriers: ['carrierOne', 'carrierTwo'],
    colors: ['red', 'blue', 'green']
  })
    .then(() => {
      return axios.get('http://localhost:3002/phones/1', { adapter });
    })
    .then((response) => {
      expect(typeof(response.data[0])).toBe('object');
      expect(response.data[0].name).toBe('string');
      expect(response.data[0].capacities.length).toBe(3);
    })
    .catch((err) => {
      expect(err).toBe('undefined');
    });
});