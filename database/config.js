const mongoose = require('mongoose');

const dbConnection = async () =>{
  try {
    await mongoose.connect('mongodb+srv://gersomsim:Dracka911-@cluster0.idt2dhs.mongodb.net/hospitaldb');
    console.log('DB Online')
  } catch (error) {
    console.log(error);
    throw new Error('Error al iniciar la base de datos, ver Logs');
  }
}

module.exports = { dbConnection }