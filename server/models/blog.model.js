const db = require("./mysqldb.js");

const tblName = 'blogs';
const tblFields = [
  'title', 'summary', 'images','postdt', 'relpost', 'author', 
]

// constructor
const Blog = function(blog) {
  for(let i=0; i<tblFields.length; i++) 
    this[tblFields[i]] = blog[tblFields[i]];
};

Blog.create = (newBlog, callback) => {

  db.query(`INSERT INTO ${tblName} SET ?`, newBlog, (err, res) => {
    if (err) {
      console.log("error: ", err);
      callback(err, null);
    } else {
      callback(null, { id: res.insertId, ...newBlog });
    }
  });
};
Blog.findTotalCount = ({},callback) =>{
 
  let sql = `SELECT COUNT(*) as total FROM ${tblName}`;
  db.query(sql,(err,res)=>{
    if (err) {
      console.log("error: ", err);
      callback(err, null);
    } else {  
      callback(null, res[0].total);
    }
  });
};
Blog.findByPaginate = (offset,limit,searchkey,cond,callback)=>{
  let sql='';
  let field = Object.keys(cond)[0];
  console.log(field);
  let value = cond[field];
  if(field == undefined){
    if(searchkey == '' || searchkey == undefined)
      sql = `SELECT SQL_CALC_FOUND_ROWS * FROM ${tblName} order by postdt desc LIMIT ${limit} OFFSET ${offset}`;
    else
      sql = `SELECT SQL_CALC_FOUND_ROWS * FROM ${tblName} WHERE title like '%${searchkey}%' or summary like '%${searchkey}%' order by postdt desc LIMIT ${limit} OFFSET ${offset}`;
  }
  else{
    if(searchkey == '' || searchkey == undefined)
      sql = `SELECT SQL_CALC_FOUND_ROWS *  FROM ${tblName} where ${field} like '${value}%' order by postdt desc LIMIT ${limit} OFFSET ${offset}`;
    else
      sql = `SELECT SQL_CALC_FOUND_ROWS *  FROM ${tblName} WHERE ${field} like '${value}%' AND (title like '%${searchkey}%' or summary like '%${searchkey}%') order by postdt desc LIMIT ${limit} OFFSET ${offset}`;
  }
    
  console.log(sql);
 
  db.query(sql, (err, res) => {
    if (err) {
      console.log("error: ", err);
      callback(err, null);
    } else {      
      
      let data={};
      data.data = res;
      sql = 'SELECT FOUND_ROWS() as total';
      db.query(sql,(err,res)=>{
        if(err){
          console.log("error: ", err);
          callback(err, null);
        }
        else{
          if(res.length > 0){
            data.search_total = res[0].total;
            callback(null, data);
          } 
          else callback(null, null);
        }
      })
      
      
    }
  });
}

Blog.findById = (id, callback) => {
  db.query(`SELECT 
              prev.id AS prev_id,
              prev.title as prev_title, 
              target.id AS target_id,
              target.title AS target_title, 
              target.summary AS target_summary,
              target.images AS target_images,
              target.postdt AS target_postdt,
              target.relpost AS target_relpost,
              target.author AS target_author,
              next.id AS next_id,
              next.title as next_title
            FROM 
              ${tblName} target
            LEFT JOIN 
              ${tblName} prev ON prev.postdt < target.postdt AND prev.id != target.id 
            LEFT JOIN 
              ${tblName} next ON next.postdt > target.postdt AND next.id != target.id 
            WHERE 
              target.id = ${id}
            ORDER BY prev.postdt DESC, next.postdt ASC LIMIT 1`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      callback(err, null);
    } else {
      console.log(res);
      if(res.length > 0) callback(null, res[0]);
      else callback(null, null);
    }
  });
};
Blog.findAllDateAndRooms = ({},callback) =>{
  db.query(`SELECT postdt,relpost FROM ${tblName} order by postdt desc`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      callback(err, null);
    } else {
      callback(null, res);
    }
  });
}

Blog.findByCatId = (catId, callback) => {
  let query = `SELECT * FROM ${tblName} where catId=${catId} order by id`;
  db.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      callback(err, null);
    } else {
      callback(null, res);
    }
  });
};

Blog.findByTitle = (title, callback) => {
  db.query(`SELECT * FROM ${tblName} WHERE title = "${title}"`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      callback(err, null);
    } else {
      callback(null, res);
    }
  });
};

Blog.findByDtRage = (from_dt, to_dt, callback) => {

  let query = `SELECT * FROM ${tblName}`

  if( from_dt != null && to_dt != null ) {
    query = `SELECT * FROM ${tblName} WHERE postdt BETWEEN "${from_dt}" AND "${to_dt}"`
  } else if( from_dt != null ) {
    query = `SELECT * FROM ${tblName} WHERE postdt >= "${from_dt}"`
  } else if( to_dt != null ) {
    query = `SELECT * FROM ${tblName} WHERE postdt <= "${to_dt}"`
  }

  query += ' ORDER BY postdt DESC'

  db.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      callback(err, null);
    } else {
      callback(null, res);
    }
  });
};

Blog.updateById = (id, blog, callback) => {
  let updtFields = '';
  for(let i=0; i<tblFields.length; i++) {
    if( i > 0) updtFields += ',';
    updtFields += `${tblFields[i]}="${blog[tblFields[i]]}"`
  }

  console.log(`UPDATE ${tblName} SET ${updtFields} WHERE id = ${id}`);
  db.query(
    `UPDATE ${tblName} SET ${updtFields} WHERE id = ${id}`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        callback(err, null);
        return;
      }

      if (res.affectedRows == 0) {
        callback({ kind: "not_found" }, null);
        return;
      }

      console.log("updated blog: ", { id: id, ...blog });
      callback(null, { id: id, ...blog });
    }
  );
};

Blog.remove = (id, callback) => {
  db.query(`DELETE FROM ${tblName} WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      callback(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      callback(null, { kind: "not_found" });
      return;
    }

    console.log("deleted blog with id: ", id);
    callback(null, id);
  });
};

module.exports = Blog;
