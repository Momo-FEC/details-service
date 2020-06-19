const { Phone, Capacity, Carrier, Color, PhonesCapacities, PhonesCarriers, PhonesColors } = require('./models.js');
const dbModelOptions = { timestamps: false };

module.exports.getOne = function(id) {
  return Phone.findAll({
    where: { id },
    attributes: ['name', 'productCode'],
    include: [{
      model: Capacity,
      attributes: ['size'],
      through: { attributes: [] }
    }]
  });
};

module.exports.seed = function() {
  var names = ['Galaxy S20 5G', 'Galaxy S20+ 5G', 'Galaxy S20 Ultra 5G'];
  var productCodes = ['SM-G981UZAAXAA', 'SM-G986UZAAXAA', 'SM-G988UZAAXAA'];
  var carriers = ['Unlocked', 'Verizon', 'AT&T', 'T-Mobile', 'Sprint', 'U.S. Cellular'];
  var capacities = ['128GB', '512GB'];
  var colors = ['White', 'Cosmic Gray', 'Cloud Blue', 'Cloud Pink'];
  var output = [];
  for (var i = 0; i < 100; i++) {
    var carrierCount = Math.floor(Math.random() * carriers.length + 1);
    var indivCarriers = {};
    for (var j = 0; j < carrierCount; j++) {
      var randomCarrier = carriers[Math.floor(Math.random() * carriers.length)];
      indivCarriers[randomCarrier] = true;
    }
    var capacitiesCount = Math.floor(Math.random() * capacities.length + 1);
    var indivCapacities = {};
    for (var k = 0; k < capacitiesCount; k++) {
      var randomCapacity = capacities[Math.floor(Math.random() * capacities.length)];
      indivCapacities[randomCapacity] = true;
    }
    var colorCount = Math.floor(Math.random() * colors.length + 1);
    var indivColors = {};
    for (var l = 0; l < colorCount; l++) {
      var randomColor = colors[Math.floor(Math.random() * colors.length)];
      indivColors[randomColor] = true;
    }
    var phone = {
      name: names[Math.floor(Math.random() * names.length)],
      productCode: productCodes[Math.floor(Math.random() * productCodes.length)],
      carriers: Object.keys(indivCarriers),
      capacities: Object.keys(indivCapacities),
      colors: Object.keys(indivColors)
    };
    output.push(phone);
  }
  console.log(output);
  for (var m = 0; m < output.length; m++) {
    var phone = output[m];
    connection.query(`
      INSERT INTO Phones(name, productCode) VALUES ("${phone.name}", "${phone.productCode})`,
      (err, results) => {
        if (err) {
          console.log('Error: ',err);
          return;
        }

      });
  }
};
module.exports.addOne = function({ name, productCode, carriers, capacities, colors }) {
  var phoneId;
  var capacityIds = [];
  var carrierIds = [];
  var colorIds = [];
  // create phone in database, save the id of where phone was inserted
  return Phone.create({ name, productCode })
    .then((phone) => {
      phoneId = phone.id;
      // convert capacities array of strings into array of promises that push
      // the id into our array
      return Promise.all(capacities.map((capacity) => {
        return Capacity.findOne({ where: { size: capacity }})
          .then((dbCapacity) => {
            if (dbCapacity) {
              return capacityIds.push(dbCapacity.id);
            } else {
              return Capacity.create({ size: capacity })
                .then((capacityInsert) => {
                  return capacityIds.push(capacityInsert.id);
                });
            }
          });
      }));
    })
    .then(() => {
      // use promises to get ids of carriers for the phone
      return Promise.all(carriers.map((carrier) => {
        return Carrier.findOne({ where: { name: carrier }})
          .then((dbCarrier) => {
            if (dbCarrier) {
              return carrierIds.push(dbCarrier.id);
            } else {
              return Carrier.create({ name: carrier })
                .then((carrierInsert) => {
                  return carrierIds.push(carrierInsert.id);
                });
            }
          });
      }));
    })
    .then(() => {
      // use promises to get ids of colors for the phone
      return Promise.all(colors.map((color) => {
        return Color.findOne({ where: { name: color }})
          .then((dbColor) => {
            if (dbColor) {
              return colorIds.push(dbColor.id);
            } else {
              return Color.create({ name: color })
                .then((colorInsert) => {
                  return colorIds.push(colorInsert.id);
                });
            }
          });
      }));
    })
    .then(() => {
      // populate join tables
      // console.log(phoneId, capacityIds, carrierIds, colorIds);
      return Promise.all(capacityIds.map((capacityId) => {
        return PhonesCapacities.create({ capacityId, phoneId });
      }))
    })
    .then(() => {
      return Promise.all(carrierIds.map((carrierId) => {
        return PhonesCarriers.create({ carrierId, phoneId });
      }))
    })
    .then(() => {
      return Promise.all(colorIds.map((colorId) => {
        return PhonesColors.create({ colorId, phoneId });
      }))
    })
};