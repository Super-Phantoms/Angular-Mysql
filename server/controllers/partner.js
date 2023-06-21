const Partner = require("../models/partner.model.js");

exports.list = (req, res, next) => {
  console.log('listing partners.....')

  const { from, to } = req.params;

  Partner.findByRange( from, to, ( err, data ) => {
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
  let partner = req.body;

  console.log(partner);
  console.log('partner updating..... id=' + partner.id);

  Partner.findByTitle(partner.title, function(err, data) {
    if(err) {
      res.send({
        success: 'false',
        msg: 'Some error occured in db operation.'
      });
    } else if(data.length > 0 && data[0].id != partner.id) {
      console.log(data)


      res.send({
        success: 'false',
        msg: 'The same title already exists.'
      })
    } else {
      Partner.updateById(partner.id, partner, ( err, data ) => {
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
  console.log('creating a new partner....');

  let defTitle = "New Partner Brand";
  let newTitle = defTitle;
  Partner.findByTitle(defTitle, function(err, data) {
    if(err) {
      res.send({
        success: 'false',
        msg: 'Some error occured in db operation.'
      });
    } else if(data.length > 0) {
      newTitle = defTitle + (data.length + 1);
    }

    partner = {
      title: newTitle,
      img: req.body.img,
    }
    console.log(partner);
  
    Partner.create( partner, ( err, partner ) => {
      if( err ) {
        res.send({
          success: 'false',
          msg: "Some error occurred while creating the data."
        })
      } else {
        res.send({
          success: 'true',
          data: partner,
          msg: 'Added successfully.'
        });
      }
    });
  });
};

exports.del = ( req, res, next ) => {
  id = req.params.id;
  console.log('deleting partner..... id=' + id);

  Partner.remove( id, ( err, data ) => {
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

// exports.upload = ( req, res, next ) => {
//   res.send({
//     success: 'true',
//   })
// };

// exports.list_intro = (req, res, next) => {
//   console.log('listing introduction.....')

//   let catId = req.params.catId;

//   Category.findById( catId, ( err, data ) => {
//     if ( err )
//       res.send({
//         success: 'false',
//         msg: "Some error occurred while retrieving the data."
//       });
//     else {
//       res.send({
//         success: 'true',
//         data: data
//       });}
//   });
// };

// exports.update_intro = ( req, res, next ) => {
//   let category = req.body;

//   console.log('category updating..... id=' + category.id);

//   Category.updateById(category.id, category, ( err, data ) => {
//     if (err) {
//       res.send({
//         success: 'false',
//         msg: "Some error occurred while updating the data."
//       })
//     } else {
//       res.send({
//         success: 'true',
//         data: data,
//         msg: 'Update successfully.'
//       })
//     }
//   })

// };

