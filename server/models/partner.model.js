const db = require("./mysqldb.js");

const tblName = 'partners';
const tblFields = [
  'title', 'img'
]

// constructor
const Partner = function(partner) {
  for(let i=0; i<tblFields.length; i++) 
    this[tblFields[i]] = partner[tblFields[i]];
};

Partner.create = (newPartner, callback) => {
  db.query(`INSERT INTO ${tblName} SET ?`, newPartner, (err, res) => {
    if (err) {
      console.log("error: ", err);
      callback(err, null);
    } else {
      callback(null, { id: res.insertId, ...newPartner });
    }
  });
};

Partner.findById = (id, callback) => {
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

Partner.findByTitle = (title, callback) => {
  db.query(`SELECT * FROM ${tblName} WHERE title = "${title}"`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      callback(err, null);
    } else {
      callback(null, res);
    }
  });
};

Partner.findByRange = (from, to, callback) => {
  _from = from.toLowerCase();
  _to = to.toLowerCase();
  db.query(`SELECT * FROM ${tblName} WHERE LOWER(LEFT(title, 1)) BETWEEN '${_from}' AND '${_to}' ORDER BY title`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      callback(err, null);
    } else {
      if(res.length > 0) callback(null, res);
      else callback(null, null);
    }
  });
}

Partner.updateById = (id, partner, callback) => {
  let updtFields = '';
  for(let i=0; i<tblFields.length; i++) {
    if( i > 0) updtFields += ',';
    updtFields += `${tblFields[i]}="${partner[tblFields[i]]}"`
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

      console.log("updated partner: ", { id: id, ...partner });
      callback(null, { id: id, ...partner });
    }
  );
};

Partner.remove = (id, callback) => {
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

    console.log("deleted partner with id: ", id);
    callback(null, id);
  });
};

module.exports = Partner;
