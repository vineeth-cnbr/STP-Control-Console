var Sequelize = require('sequelize');
var sequelize = new Sequelize('stp', 'root', 'root', { dialect: 'mysql' });

var Stp = sequelize.define('stp', {
	id: {
		type: Sequelize.STRING,
		primaryKey: true
	},
	name: {
		type: Sequelize.STRING,
		defaultValue: null
	},
	street: {
		type: Sequelize.STRING,
		defaultValue: null
	},
	state: {
		type: Sequelize.STRING,
		defaultValue: null
	},
	pincode: {
		type: Sequelize.STRING,
		defaultValue: false
	}
});


Stp.sync();


// Stp.create({id: 'STP101', name: 'SHOBHA STP', street: '18th Main', state: 'Karnataka', pincode: '560054' });

module.exports = Stp;