const ServiceCategory = require("../models/serviceCategory.model.js");

exports.list = (req, res, next) => {
  console.log('listing categories.....')

  let selectFields = null;
  if(req.params.selFields == 'short')
    selectFields = ['id,title,type'];

  ServiceCategory.findAll(selectFields, ( err, data ) => {
    if ( err )
      res.send({
        success: 'false',
        msg: "Some error occurred while retrieving the data."
      });
    else {
      res.send({
        success: 'true',
        data: data
      });}
  });

  
};


exports.relpost = (req, res, next) => {
  console.log('listing relpost-categories .....')

  const{ types } = req.params; //types is like this type: 3,4,5,9,10,13...
  const _types = types.split(',').map(Number);
console.log(_types);
  ServiceCategory.findByTypes( _types, ( err, data ) => {
    if ( err )
      res.send({
        success: 'false',
        msg: "Some error occurred while retrieving the data."
      });
    else {
      res.send({
        success: 'true',
        data: data
      });}
  })
};



