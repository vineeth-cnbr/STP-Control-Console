const Stp = require('./models/Stp');
const Tank = require('./models/Tank');
const Notification = require('./models/Notification')

let stpId = 'STP110'

simulate = async (stpId) => {
    try {
        let stp = await Stp.findByPk(stpId)
        stp = stp['dataValues'];
        let tanks = await Tank.findAll({ where: { stpId }})
        // tanks = tanks.map( tank => tank['dataValues'])
        // console.log(tanks);
        tanks.map( (tank,i) => {
                
            setTimeout(() => {
                tank.update({ status: true, level: '0'});
            },12000*i+2000)
            setTimeout(()=> {
                tank.update({ level: '20'})
            },12000*i+4000)
            setTimeout(()=> {
                tank.update({ level: '50'})
            },12000*i+6000); 
            setTimeout(()=> {
                tank.update({ level: '90'})
            },12000*i+8000);           
            setTimeout(()=> {
                tank.update({ level: '100', status: false})
            },12000*i+10000); 
            setTimeout(()=> {
                Notification.create({ code: '202', msg: `Tank ${tank.dataValues.id} is Full`})
                Notification.create({ code: '202', msg: `Tank ${tank.dataValues.id} is turned OFF`})
            },12000*i+12000); 
        })
    }catch(err) {
        console.log(err)
    }

}

simulate(stpId)




