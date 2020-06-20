var db = require('./index.js');

var seed = function() {
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

  var add = function(count = 0) {
    if (count < output.length) {
      return db.addOne(output[count])
        .then(() => {
          return add(count + 1);
        });
    }
    return;
  };
  return add();
};

seed();