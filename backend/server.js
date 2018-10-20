var restify = require('restify');
var Sequelize = require('sequelize')
var Tank = require('./models/Tank')
var sequelize = new Sequelize('stp', 'root', 'root', {
  dialect: 'mysql'
})


var server = restify.createServer();

server.use(restify.plugins.queryParser({  mapParams: true }));
server.use(restify.plugins.bodyParser({  mapParams: true }));
server.use(restify.plugins.acceptParser(server.acceptable));

server.get("/tank/:id", (req, res) => {
  console.log("GET TANK ID");
  var { id } = req.params;
  Tank.findById(id)
    .then( tank => {
      console.log(tank)
      res.send(tank)
    } )
    .catch(err => res.send(err));

});

server.post("/tank/:id", (req,res) => {
  var { status } = req.body;
  var { id } = req. params;
  Tank.update({ status }, { where: { id }})
    .then((tank)=> {
      res.send("OK");
    })
    .catch( err => {
      res.send(err);
    });
})


server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});