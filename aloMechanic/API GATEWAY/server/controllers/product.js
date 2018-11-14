const db = require('../../config/sequelize');
var sequelize = db.sequelize ;

function getAllCategories(req, res ,next) {
    sequelize.query("SELECT *" +
        " FROM dbo.productServices " +
        " WHERE type = 1 " +
        " ORDER BY name" ,
        {type: sequelize.QueryTypes.SELECT})
        .then(categories => {
            console.log(categories)
            res.json(categories)
        }).catch(
            function(err){
                console.log(err);
                next (err)
    
            }
        ) 
}

function getAllServices(req, res ,next) {
    sequelize.query("SELECT * FROM dbo.productServices " +
        " WHERE type = 2 and parentId = :categoryId"  ,
        { replacements: {categoryId : req.query.categoryId}, type: sequelize.QueryTypes.SELECT })
        .then(services => {
            console.log(services)
            res.json(services)
        }).catch(
            function(err){
                console.log(err);
                next (err)
            }
        )
}

function getAllProducts(req, res ,next) {
    sequelize.query("SELECT * FROM dbo.productServices " +
        "  WHERE type = 3 and parentId = :serviceId "  ,
        { replacements: {serviceId : req.query.serviceId}, type: sequelize.QueryTypes.SELECT })
        .then(products => {
            console.log(products)
            res.json(products)
        }).catch(
            function(err){
                 console.log*(err);
                next (err)
            }
        )
}

export default {getAllCategories, getAllServices, getAllProducts}