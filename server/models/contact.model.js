const db = require("./mysqldb.js");

const tblName = 'contacts';
const tblFields = [
  'address', 'phone', 'mail','company_title'
]

// constructor
const Contact = function(contact) {
  for(let i=0; i<tblFields.length; i++) 
    this[tblFields[i]] = contact[tblFields[i]];
};

Contact.findAll = (callback) => {
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

Contact.updateById = (id, contact, callback) => {
  let updtFields = '';
  for(let i=0; i<tblFields.length; i++) {
    if( i > 0) updtFields += ',';
    updtFields += `${tblFields[i]}="${contact[tblFields[i]]}"`
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

      console.log("updated contact: ", { id: id, ...contact });
      callback(null, { id: id, ...contact });
    }
  );
};

Contact.updateAll = (updtField, contact, callback) => {
  let _updtField = `${updtField}="${contact[updtField]}"`

  console.log(_updtField);
  console.log(`UPDATE ${tblName} SET ${_updtField}`);
  console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@')



  db.query(
    `UPDATE ${tblName} SET ${_updtField}`,
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

      console.log("updated contact: ", { [updtField]: contact[updtField] });
      callback(null, { [updtField]: contact[updtField] });
    }
  );
};

module.exports = Contact;
