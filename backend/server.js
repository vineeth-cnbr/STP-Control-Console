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
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      idle: 20000,
      acquire: 20000
      }
  })

const corsMiddleware = require('restify-cors-middleware')

const cors = corsMiddleware({
  allowHeaders: ['Authorization'],
  origins: ['*']
})

var idit = 103;
var server = restify.createServer();

server.pre((req, res, next) => { console.log("hey", req.headers.authorization); next()})
server.use(restify.plugins.queryParser({ mapParams: true }));
server.use(restify.plugins.bodyParser({ mapParams: true }));
server.use(restify.plugins.acceptParser(server.acceptable));
server.pre(cors.preflight)
server.use(cors.actual);
// server.pre( (req, res, next) => { res.header("Access-Control-Allow-Origin", "*"); res.header("Access-Control-Allow-Headers", "X-Requested-With"); });
server.use(rjwt(config.jwt).unless({ path: ['/auth',"/username", "/signup", "/Tankdata"] }));

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
    res.send({ code: 0, iat, exp, token, user: data });
  }).catch( err => {
    res.send( {
      code: 1,
      message: err
    });
  });
});

server.post("/signup", (req, res) => {
  var userBody = req.body;
  console.log(userBody);
  auth.signup(userBody)
      .then( user => {
        console.log(user);
        res.send( {
          code: 0,
          user: user
        });
      })
      .catch( err => {
        res.send({
          code:1,
          err
        });
      })

})

server.get('/user', async (req, res, next) => {
  console.log("autho", req.user);
  try {
    let user = await User.findByPk(req.user.username)
    user = user['dataValues'];
    if(user.stpId!=null) {
      var stp = await Stp.findByPk(user.stpId);
      stp = stp['dataValues'];
      let tanks = await Tank.findAll({ where: { stpId: user.stpId }});
      let notifs = await Notification.findAll({ where: { stpId: user.stpId }});
      
      var newtanks = tanks.map( (tank) => {
        return tank['dataValues'];
      });
      var newnotifs = notifs.map( notif => {
        return notif['dataValues'];
      })
      console.log(newnotifs);
    }
    res.send({ code: 0, user, stp, tanks: newtanks, notifications: newnotifs });
  }catch(err) {
    console.log(err);
    res.send({ code: 1, message: "You are not authenticated." })
  }
});

server.post('/stp/add', async (req, res) => {
  try {
    const { name, street, state, pincode, tanks, tankObjects, username  } = req.body;
    console.log("username", username);
    let userInstance = await User.findByPk(username);
    let stpCount = await Stp.count();
    let id = 'STP' + String(Number(100+stpCount+1));
    let stp = await Stp.create({ id, name, street, state, pincode });
    userInstance.setStp(stp);
    var tankResults;
    if(tankObjects.length != 0) {
      let tankCount = await Tank.count();
      tankResults = tankObjects.map(async (tank, i) => {
        let { tankType, length, breadth, height } = tank;
        let id = tankType + String(Number(100+tankCount+i+1));
        let tankInstance = await Tank.create({ id, type: tankType, length, breadth, height, level: 0, status: false });
        tankInstance.setStp(stp);
        return tankInstance['dataValues']

      });
    }
    console.log(stp['dataValues']);
    res.send({
      stp: stp['dataValues'],
      tankResults
    });
  }catch(err) {
    console.log(err);
    res.send(err);
  }
})

server.post('/profile/update', (req,res) =>{
    const {name, email, phone, username} = req.body;
    console.log(name,email,username,phone, 'are the details')
    User.update(
      {
        name: name,
        email: email,
        phone: phone
      },
      {where: {username: username} }
    )
    .then((rows) =>{
      if(rows!=0){
        // console.log(newUser, 'is the new user');
        console.log(rows);
        User.findByPk(username).then( user =>{
          console.log(user['dataValues']);
          // console.log(user['dataValues']);
          res.send({
            code: 200,
            updated: user['dataValues'],
          })
        })
      }
      else{
        return {err: 'no values updated'}
      }
      
    })
  
  .catch(err =>{
    console.log(err);
    res.send(err);
  })
})

server.post("/username", (req, res) => {
    const { username } = req.body;
    User.findByPk(username).then(user => {
        console.log(user);
        res.send(user);
    }).catch( err => {
        console.log(err);
        res.send(err);
    })

});

server.get("/notifications/:stpId", (req, res) => {
  const { stpId } = req.params;
  Notification.findAll({ where: { stpId }})
    .then( notifications => {
      allNotifications = notifications.map( notification => {
        return notification.dataValues;
      });
      res.send( allNotifications );
    })
    .catch( err => {
      res.send(err) 
    });
})


server.get("/tanks/:id", (req, res) => {
  console.log("GET TANK ID");
  var { id } = req.params;
  Tank.findById(id)
    .then(tank => {
      console.log(tank)
      res.send(tank)
    })
    .catch(err => res.send(err));

});

server.post("/settank", (req, res) => {
  var { height } = req.params;
  var { length } = req.params;
  var { breadth } = req.params;
  var { level } = req.params;
  var { stpid } = req.params;
  Tank.count()
    .then( count => {
      count = count+1;
      var id = "C" + String(100+count);
      console.log(id)
      Tank.create({id:id , length:length, breadth:breadth, height:height,level:level,stpId:stpid})
        .then((tank) => {
          User.update
          res.send(id);
        })
        .catch(err => {
          res.send(err);
        });
    })

})

server.post("/setstp", (req, res) => {
  var { name } = req.params;
  var { street } = req.params;
  var { state } = req.params;
  var { pin } = req.params;
  var { user } = req.params;
  Stp.count()
    .then( count => {
      count = count+1;
      var id = "STP" + String(100+count);
      console.log(id)
      User.update({ stpId: id}, {where: {username:user}}).catch(err => {
        res.send(err);
      });
      Stp.create({id:id , name:name,street:street, state:state, pincode:pin})
        .then((tank) => {
          rkes.send({"id":id});
        })
        .catch(err => {
          res.send(err);
        });
    })

}) 

server.post('/tank/add', async(req,res) =>{
 try{
  let {length, breadth, height, stpid, tank_type} = req.body;
  let tankCount = await Tank.count();
  // tankResults = tankObjects.map(async (tank, i) => {
    // let { tankType, length, breadth, height } = tank;
    let id = tank_type + String(Number(100+tankCount+1));
    let tankInstance = await Tank.create({ id, type: tank_type, length, breadth, height, level: 0, status: false, stpId: stpid });
    // tankInstance.setStp(stp);
    // return tankInstance['dataValues'];
    // });
  
    res.send({data: tankInstance, code: 200});
}
 catch (err){
  console.log(err);
  res.send(null);
 }
});

server.post("/tanks/:id", (req, res) => {
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



//for android app
server.post("/login", (req, res) => {
  console.log("/login")
  let { username, password } = req.body;
  console.log(username,password)
  auth.authenticate(username, password)
    .then(user => {
      var result = {
        code: 0,
        message: user
      }
      res.send(result)
    })
    .catch(err => {
      var result = {
        code: 1,
        message: err
      }
      res.send(result);
    })

});

server.get("/stps", (req, res) => {
  Stp.findAll()
    .then( stps => {
      console.log("STPs", stps);
      stps = stps.map( stp => {
        return stp.dataValues;
      })
      res.send(stps);
    })
    .catch( err => {
      console.log(err);
      res.send(err);
    })
});

server.post("/stp/set", (req, res) => {
  var { stpId, username } = req.body;
  User.update({ stpId }, { where: { username } })
    .then( data => {
      res.send(data);
    })
    .catch( err => {
      console.log(err);
      res.send(err);
    })
})

server.post("/Tankdata", (req,res) => {
  console.log(req.body.trigger);
  var { trigger, tankId, gas } = req.body;
  if(trigger == 0)
    trigger = false;
  else
    trigger = true;
  Tank.update({ gas, trigger }, { where: { id: tankId } })
    .then((tank) => {
      res.send("OK");
    })
    .catch(err => {
      res.send(err);
    });
  // res.send("Received data", level);
})


server.listen(8080, function () {
  console.log('%s listening at %s', server.name, server.url);
});
