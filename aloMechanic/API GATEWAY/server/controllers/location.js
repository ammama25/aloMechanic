const db = require('../../config/sequelize');
var sequelize = db.sequelize ;

function getAllCities(req, res ,next) {
    sequelize.query("SELECT *" +
        " FROM dbo.cities " +
        " ORDER BY name" ,
        {type: sequelize.QueryTypes.SELECT})
        .then(cities => {
            console.log(cities)
            res.json(cities)
        })

}

function getAllDistricts(req, res ,next) {
    sequelize.query("SELECT * FROM dbo.districts Dist " +
        " WHERE cityId = :cid"  ,
        { replacements: {cid : req.query.cityId}, type: sequelize.QueryTypes.SELECT })
        .then(districts => {
            console.log(districts)
            res.json(districts)
        })

}

export default {getAllCities , getAllDistricts}