const Service = require("../models/team.model.js");

exports.list = (req, res, next) => {
  console.log('listing team members.....')

  let catId = req.params.catId;

  Service.findAll( ( err, data ) => {
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

exports.update = ( req, res, next ) => {
  let service = req.body;

  console.log('member updating..... id=' + service.id);

  Service.updateById(service.id, service, ( err, data ) => {
    if (err) {
      res.send({
        success: 'false',
        msg: "Some error occurred while updating the data."
      })
    } else {
      res.send({
        success: 'true',
        data: data,
        msg: 'Updated successfully.'
      })
    }
  })

};

exports.add = ( req, res, next ) => {
  console.log('creating a new service....');
  const {firstName} = req.body;

  // To check whether the same title already exists
  console.log('checking whether the same title already exists.....');
  Service.findByName(firstName, function(err, data) {
    if(err) {
      res.send({
        success: 'false',
        msg: 'Some error occured in db operation.'
      });
    } /*else if(data.length > 0) {
      res.send({
        success: 'false',
        msg: 'The same title already exists.'
      })
    }*/ else {
      console.log('creating a new service.....');
      // To create a new service
      serv = {
        firstName,
        lastName: '',
        major: '',
        summary: '',
        image: ''
      }
    
      Service.create( serv, ( err, serv ) => {
        if( err ) {
          res.send({
            success: 'false',
            msg: "Some error occurred while creating the data."
          })
        } else {
          res.send({
            success: 'true',
            data: serv,
            msg: 'Added successfully'
          });
        }
      });
    }
  })
};

exports.del = ( req, res, next ) => {
  id = req.params.id;
  console.log('deleting service..... id=' + id);

  Service.remove( id, ( err, data ) => {
    if( err ) {
      res.send({
        success: 'false',
        msg: "Can't find the data."
      });
    } else if( typeof data == "object") {
        res.send({
          success: 'false',
          msg: "There isn't the data"
        })
    } else {
      res.send({
        success: 'true',
        data: data,
        msg: 'Deleted successfully.'
      })
    }
  });
};

exports.upload = ( req, res, next ) => {
  res.send({
    success: 'true',
  })
};

