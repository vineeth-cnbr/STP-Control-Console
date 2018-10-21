const User = require('./models/User');
const auth = require('./tools/auth');
// User.create({username: "abc", password: "234", name: "Pradeep"});
// User.update({password: '123'}, {where: {username: 'vineeth-cnbr'} });

auth.authenticate('absc','134')
    .then( user => {
        console.log(user);
    })
    .catch( err => {
        console.log(err);
    })

