const sql = require("./db.js");

// constructor
const Cliente = function(cliente) {
  this.email = cliente.email;
  this.nombre = cliente.nombre;
  this.activo = cliente.activo;
};

Cliente.create = (newCliente, result) => {
  sql.query("INSERT INTO cliente SET ?", newCliente, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("creado cliente: ", { id: res.insertId, ...newCliente });
    result(null, { id: res.insertId, ...newCliente });
  });
};

Cliente.findById = (clienteId, result) => {
  sql.query(`SELECT * FROM cliente WHERE id = ${clienteId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("Encontrado cliente: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Cliente.getAll = result => {
  sql.query("SELECT * FROM cliente", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("cliente: ", res);
    result(null, res);
  });
};

Cliente.updateById = (id, cliente, result) => {
  sql.query(
    "UPDATE cliente SET email = ?, nombre = ?, activo = ? WHERE id = ?",
    [cliente.email, cliente.nombre, cliente.activo, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
       
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("Actualizado Cliente: ", { id: id, ...cliente });
      result(null, { id: id, ...cliente });
    }
  );
};

Cliente.remove = (id, result) => {
  sql.query("DELETE FROM cliente WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
  
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("Borrado Cliente con ID: ", id);
    result(null, res);
  });
};

Cliente.removeAll = result => {
  sql.query("DELETE FROM cliente", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} cliente`);
    result(null, res);
  });
};

module.exports = Cliente;
