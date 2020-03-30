module.exports = app => {
    const cliente = require("../controllers/cliente.js");
  
    // Crear nuevo cliente
    app.post("/cliente", cliente.create);
  
    // Buscar todos los clientes
    app.get("/cliente", cliente.findAll);
  
    // Buscar cliente por ID
    app.get("/cliente/:clienteId", cliente.findOne);
  
    // Actualizar cliente con Id
    app.put("/cliente/:clienteId", cliente.update);
  
    // Borrar cliente con Id
    app.delete("/cliente/:clienteId", cliente.delete);
  
    // Borrar Todos los Clientes
    app.delete("/cliente", cliente.deleteAll);
  };
  