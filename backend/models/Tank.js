var Sequelize = require('sequelize');
var sequelize = new Sequelize('stp', 'root', 'root', { dialect: 'mysql' });
var Stp = require('./Stp');

var Tank = sequelize.define('tank', {
	id: {
		type: Sequelize.STRING,
		primaryKey: true
	},
	length: {
		type: Sequelize.INTEGER,
		defaultValue: null
	},
	breadth: {
		type: Sequelize.INTEGER,
		defaultValue: null
	},
	height: {
		type: Sequelize.INTEGER,
		defaultValue: null
	},
	status: {
		type: Sequelize.BOOLEAN,
		defaultValue: false
	},
	level: {
		type: Sequelize.INTEGER,
		validate: {
			max: 100,
			min: 0
		},
		defaultValue: null
	}
});
Tank.belongsTo(Stp);
Tank.sync();

// sequelize.sync().then(function() {
//   return User.create({
//     username: 'janedoe',
//     birthday: new Date(1980, 6, 20)
//   });
// }).then(function(jane) {
//   console.log(jane.get({
//     plain: true
//   }));
// });
// Tank.create({id: 'C101', length: 1200, breadth: 5600, height: 8700, status: false, level: 30});
addTank = async () => {
	try {
		let STP = await Stp.create({ id: 'STP107', name: "Amrita"});
		let tank = await Tank.create({id: 'C108', length: 3200, breadth: 5630, height: 8750, status: true, level: 0});
		tank.setStp(STP);
	}catch(err) {
		console.log(err);
	}

}




// Tank.create({id: 'C107', length: 3200, breadth: 5630, height: 8750, status: true, level: 0})
// 	.then( tank => {
// 		console.log("update stp")
// 		tank.setStp(STP)
// 	});

module.exports = Tank;