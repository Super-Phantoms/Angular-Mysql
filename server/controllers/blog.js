const { compare, compareSync } = require("bcrypt");
const Blog = require("../models/blog.model.js");
const { getLastDayOfMonth } = require("../utils/date.handler.js");
const { compose } = require("async");

exports.list = (req, res, next) => {
  console.log('listing blogs.....')
  const {year, month, day} = req.params;

  var from_dt = null;
  var to_dt = null;
  if(day) {
    from_dt = `${year}-${month}-${day}`;
    to_dt = `${year}-${month}-${day}`;
  } else if(month) {
    from_dt = `${year}-${month}-01`;
    to_dt = getLastDayOfMonth(year, month);
  } else if(year) {
    from_dt = `${year}-01-01`;
    to_dt = `${year}-12-31`;
  } 

  Blog.findByDtRage( from_dt, to_dt, ( err, data ) => {
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
exports.paginate = (req, res, next) => {
  console.log('listing paginate.....')
  let {page, limit, searchkey} = req.params;
  let cond = req.query.cond;
  if(cond != '')
    cond = JSON.parse(cond);  
  const offset = (page - 1) * limit;
  if(searchkey == undefined){
    searchkey = '';
  }
  Blog.findByPaginate(offset,limit,searchkey,cond,(err,blog)=>{
    if ( err )
      res.send({
        success: 'false',
        msg: "Some error occurred while retrieving the data."
      });
    else {
      let data={};
      data.data = blog;
      Blog.findTotalCount('',(err,totalCount)=>{
        if(err)
          res.send({
            success: 'false',
            msg: "Some error occurred while retrieving the data."
          });
        else{
          data.totalCount = totalCount;
          Blog.findAllDateAndRooms('',(err,datas)=>{
            if(err)
              res.send({
                success: 'false',
                msg: "Some error occurred while retrieving the data."
              });
            else{
              data.dateAndPosts = datas; 
              res.send({        
                success: 'true',
                data: data
              });
            }
          })
          
        }
      })
     
    }
  })
};

exports.detail = (req, res, next) =>{
  const {id} = req.params;
  Blog.findById(id, ( err, blog ) =>{
    if ( err )
      res.send({
        success: 'false',
        msg: "Some error occurred while retrieving the data."
      });
    else {      
      let data={};
      data.blog = blog;
      console.log(data);
      Blog.findAllDateAndRooms('',(err,datas)=>{
        if(err)
          res.send({
            success: 'false',
            msg: "Some error occurred while retrieving the data."
          });
        else{
          
          data.data = datas;
          res.send({        
            success: 'true',
            data: data
          });
        }
      })      
    }
  })
}

exports.update = ( req, res, next ) => {

  let blog = req.body;
   
  console.log('blog updating..... id=' + blog.id);

  Blog.updateById(blog.id, blog, ( err, data ) => {
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

};

exports.add = ( req, res, next ) => {
  console.log('creating a new blog....');
  const {title, postdt} = req.body;

  let _post = new Date(postdt);

  // To create a new blog
  serv = {
    title,
    summary: '',
    images: JSON.stringify([{title: 'New Image', img: ''},]),
    postdt: _post,
    relpost: '',
    author: '',
  }
  console.log(serv);

  Blog.create( serv, ( err, serv ) => {
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
};

exports.del = ( req, res, next ) => {

  id = req.params.id;

  console.log('deleting blog..... id=' + id);

  Blog.remove( id, ( err, data ) => {
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
