const Cliente = require("../models/cliente.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "El contenido puede no estar vacío!"
    });
  }

  
  const cliente = new cliente({
    email: req.body.email,
    nombre: req.body.nombre,
    activo: req.body.activo
  });

  Cliente.create(cliente, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "ocurrió un error al crear Cliente."
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  Cliente.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Error al Recuperar Clientes"
      });
    else res.send(data);
  });
};


exports.findOne = (req, res) => {
  Cliente.findById(req.params.clienteId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se encontro el Cliente con id ${req.params.clienteId}.`
        });
      } else {
        res.status(500).send({
          message: "Error recuperando cliente con Id" + req.params.clienteId
        });
      }
    } else res.send(data);
  });
};


exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "El contenido no puede estar vacio!"
    });
  }

  console.log(req.body);

  Cliente.updateById(
    req.params.clienteId,
    new Cliente(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `No se encontro el Cliente con id ${req.params.clienteId}.`
          });
        } else {
          res.status(500).send({
            message: "Error actualizando Cliente con Id " + req.params.clienteId
          });
        }
      } else res.send(data);
    }
  );
};


exports.delete = (req, res) => {
 Cliente.remove(req.params.clienteId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se encontro el Cliente con id ${req.params.clienteId}.`
        });
      } else {
        res.status(500).send({
          message: "No puede Eliminar el Cliente con id " + req.params.clienteId
        });
      }
    } else res.send({ message: `Cliente Borrado con Exito!` });
  });
};


exports.deleteAll = (req, res) => {
  Cliente.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Algún error ocurrió mientras se borraban  todos los clientes.."
      });
    else res.send({ message: `Todos los clientes se borraron con exito!` });
  });
};
