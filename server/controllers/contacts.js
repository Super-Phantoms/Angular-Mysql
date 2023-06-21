const Contact = require("../models/contact.model.js");
const auth = require("../middleware/auth.js");
const path = require('path');
var fs = require('fs');
exports.list = (req, res, next) => {
  console.log('listing contacts.....')

  let catId = req.params.catId;

  Contact.findAll( ( err, data ) => {
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
  let contact = req.body;
  console.log(contact);
  
  console.log('contact updating..... id=' + contact.id);

  Contact.updateById(contact.id, contact, ( err, data ) => {
    if (err) {
      res.send({
        success: 'false',
        msg: "Some error occurred while updating the data."
      })
    } else {

      console.log('all contacts update with compary title...')
      Contact.updateAll('company_title', contact, (err, data) => {
        if (err) {
          res.send({
            success: 'false',
            msg: "Some error occurred while updating the data."
          })
        } else {
          res.send({
            success: 'true',
            data: data,
            msg: 'Update Successful'
          })
        }
      })
    }
  })
};

exports.add = ( req, res, next ) => {
  console.log('creating a new contact....');
  const {catId, title} = req.body;

  // To check whether the same title already exists
  console.log('checking whether the same title already exists.....');
  Contact.findByTitle(title, function(err, data) {
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
      console.log('creating a new contact.....');
      // To create a new contact
      serv = {
        catId,
        title,
        summary: '',
        images: JSON.stringify([{title: 'New Image', img: ''},]),
        media: '',
        gallery: 0,
      }
      console.log(serv);
    
      Contact.create( serv, ( err, serv ) => {
        if( err ) {
          res.send({
            success: 'false',
            msg: "Some error occurred while creating the data."
          })
        } else {
          res.send({
            success: 'true',
            data: serv,
            msg: 'Added successfully.'
          });
        }
      });
    }
  })
};

exports.del = ( req, res, next ) => {
  id = req.params.id;
  console.log('deleting contact..... id=' + id);

  Contact.remove( id, ( err, data ) => {
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

exports.list_intro = (req, res, next) => {
  console.log('listing introduction.....')

  let catId = req.params.catId;

  Category.findById( catId, ( err, data ) => {
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

exports.update_intro = ( req, res, next ) => {
  let category = req.body;

  console.log('category updating..... id=' + category.id);

  Category.updateById(category.id, category, ( err, data ) => {
    if (err) {
      res.send({
        success: 'false',
        msg: "Some error occurred while updating the data."
      })
    } else {
      res.send({
        success: 'true',
        data: data,
        msg: 'Update successfully.'
      })
    }
  })

};

