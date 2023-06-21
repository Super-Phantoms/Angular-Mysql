const db = require("./mysqldb.js");

const tblName = 'team';
const tblFields = [
  'firstName', 'lastName', 'image','major', 'summary'
]

// constructor
const Service = function(service) {
  for(let i=0; i<tblFields.length; i++) 
    this[tblFields[i]] = service[tblFields[i]];
};

Service.create = (newService, callback) => {
  db.query(`INSERT INTO ${tblName} SET ?`, newService, (err, res) => {
    if (err) {
      console.log("error: ", err);
      callback(err, null);
    } else {
      callback(null, { id: res.insertId, ...newService });
    }
  });
};

Service.findById = (id, callback) => {
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

Service.findAll = (callback) => {
  db.query(`SELECT * FROM ${tblName}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      callback(err, null);
    } else {
      if(res.length > 0) callback(null, res);
      else callback(null, null);
    }
  });
};

Service.findByCatId = (catId, callback) => {
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

Service.findByName = (firstName, callback) => {
  db.query(`SELECT * FROM ${tblName} WHERE firstName = "${firstName}"`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      callback(err, null);
    } else {
      callback(null, res);
    }
  });
};

Service.updateById = (id, service, callback) => {
  let updtFields = '';
  for(let i=0; i<tblFields.length; i++) {
    if( i > 0) updtFields += ',';
    updtFields += `${tblFields[i]}="${service[tblFields[i]]}"`
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

      console.log("updated service: ", { id: id, ...service });
      callback(null, { id: id, ...service });
    }
  );
};

Service.remove = (id, callback) => {
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

    console.log("deleted service with id: ", id);
    callback(null, id);
  });
};

module.exports = Service;
