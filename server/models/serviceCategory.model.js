const db = require("./mysqldb.js");

const tblName = 'servicecategories';
const tblFields = [
  'title', 'summary', 'images', 'url', 'type','site_title'
]

// constructor
const ServiceCategory = function(ServiceCategory) {
  for(let i=0; i<tblFields.length; i++) 
    this[tblFields[i]] = ServiceCategory[tblFields[i]];
};

ServiceCategory.create = (newServiceCategory, callback) => {
  db.query(`INSERT INTO ${tblName} SET ?`, newServiceCategory, (err, res) => {
    if (err) {
      console.log("error: ", err);
      callback(err, null);
    } else {
      callback(null, { id: res.insertId, ...newServiceCategory });
    }
  });
};

ServiceCategory.findById = (id, callback) => {
  db.query(`SELECT * FROM ${tblName} WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      callback(err, null);
    } else {
      if(res.length > 0) callback(null, res[0]);
      else callback(null, null);
    }
  });
};

ServiceCategory.findAll = (selectFields, callback) => {
    let selFields = "";
    if(selectFields && selectFields.length > 0) {
      for(let i = 0; i<selectFields.length; i++) {
        if(i > 0) selFields += ",";
        selFields += selectFields[i];
      }
    } else {
      selFields = "*";
    }

    let query = `SELECT ${selFields} FROM ${tblName} ORDER BY sort;`;
    db.query(query, (err, res) => {
        if (err) {
          console.log("error: ", err);
          callback(err, null);
        } else {
          callback(null, res);
        }
    });
}

ServiceCategory.findByType = (type, callback) => {
  let query = `SELECT * FROM ${tblName} where type=${type}`;
  db.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      callback(err, null);
    } else {
      callback(null, res);
    }
  });
};

ServiceCategory.findByTypes = (types, callback) => {
  let query = `SELECT * FROM ${tblName}`;

  const isArray = types instanceof Array;
  if(!isArray) {
    console.log('Category types is invalid...');
    callback(err, null);
    return;
  }

  if(types.length > 0) {
    query += ' WHERE';
    for(let i = 0; i < types.length-1; i++) {
      query += ` type=${types[i]} OR`;
    }
    query += ` type=${types[types.length - 1]}`;
  }

  query += ' ORDER BY type ASC, title ASC'
  console.log(query);

  db.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      callback(err, null);
    } else {
      callback(null, res);
    }
  });
};

ServiceCategory.updateById = (id, serviceCategory, callback) => {
  let updtFields = '';
  for(let i=0; i<tblFields.length; i++) {
    if( i > 0) updtFields += ',';
    updtFields += `${tblFields[i]}="${serviceCategory[tblFields[i]]}"`
  }

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

      console.log("updated ServiceCategory: ", { id: id, ...ServiceCategory });
      callback(null, { id: id, ...ServiceCategory });
    }
  );
};

ServiceCategory.remove = (id, callback) => {
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

    console.log("deleted ServiceCategory with id: ", id);
    callback(null, id);
  });
};

module.exports = ServiceCategory;
