const restify = require('restify'),
  Sequelize = require('sequelize'),
  config = require('./tools/config'),
  Tank = require('./models/Tank'),
  Stp = require('./models/Stp'),
  User = require('./models/User'),
  Notification = require('./models/Notification');
  auth = require('./tools/auth'),
  rjwt = require('restify-jwt-community'),
  jwt = require('jsonwebtoken');
  var sequelize = new Sequelize('stp', 'root', 'root', {
    dialect: 'mysql'
  })

const corsMiddleware = require('restify-cors-middleware')
 
const cors = corsMiddleware({
  allowHeaders: ['Authorization'],
})
 

var server = restify.createServer();

server.pre((req, res, next) => { console.log("hey", req.headers.authorization); next()})
server.use(restify.plugins.queryParser({ mapParams: true }));
server.use(restify.plugins.bodyParser({ mapParams: true }));
server.use(restify.plugins.acceptParser(server.acceptable));
server.pre(cors.preflight)
server.use(cors.actual);
// server.pre( (req, res, next) => { res.header("Access-Control-Allow-Origin", "*"); res.header("Access-Control-Allow-Headers", "X-Requested-With"); });
// server.use(rjwt(config.jwt).unless({ path: ['/auth'] }));

server.get("/tank/:id", (req, res) => {
  console.log("GET TANK ID");
  var { id } = req.params;
  Tank.findById(id)
    .then(tank => {
      console.log(tank)
      res.send(tank)
    })
    .catch(err => res.send(err));

});

server.post("/tank/:id", (req, res) => {
  var { status } = req.body;
  var { id } = req.params;
  Tank.update({ status }, { where: { id } })
    .then((tank) => {
      res.send("OK");
    })
    .catch(err => {
      res.send(err);
    });
})


server.post('/auth', (req, res, next) => {
  let { username, password } = req.body;
  console.log(username,password)
  auth.authenticate(username, password).then(data => {
    console.log(data);
    let token = jwt.sign(data , config.jwt.secret, {
      expiresIn: '15d' // token expires in 15 days
    });

    // retrieve issue and expiration times
    let { iat, exp } = jwt.decode(token);
    res.send({ code: 0, iat, exp, token });
  }).catch( err => {
    res.send( {
      code: 1,
      message: err
    });
  });
});

//for android app 
server.post("/login", (req, res) => {
  let { username, password } = req.body;
  console.log(username,password)
  auth.authenticate(username, password)
    .then(user => {
      res.send(user)
    })
    .catch(err => {
      res.send(err);
    })

})

server.post("/signup", (req, res) => {
  var userBody = req.body;
  auth.signup(userBody)
      .then( user => {
        res.send(user);
      })
      .catch( err => {
        res.send(err);
      })

})

server.get('/user', (req, res, next) => {
  console.log("autho",req.headers.authorization);
  if(req.user) {
    res.send({ code: 0, user: req.user });
  }else {
    res.send({ code: 1, message: "You are not authenticated." })
  }
});

server.post("/isAuthenticated", (req, res) => {
  const { token } = req.body;
  res.send()
})


server.listen(8080, function () {
  console.log('%s listening at %s', server.name, server.url);
});