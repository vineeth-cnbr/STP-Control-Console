const User = require('./models/User');
const auth = require('./tools/auth');
const tank = require('./models/tank');
// User.create({username: "prado98", password: "234", name: "Pradeep"})
//     .catch( err => {
//         console.log(Err)
//     });
// User.update({password: '123'}, {where: {username: 'vineeth-cnbr'} });

// User.create({ password: '123' },{where: { username: 'vineeth-cnbr'} });
tank.create({ id: 'AR101'});

