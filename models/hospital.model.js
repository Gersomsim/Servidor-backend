
const {Schema, model} = require('mongoose')

const HospitalSchema = Schema({
  nombre: {
    type: String,
    required: true
  },
  img: {
    type: String,
  },
  usuario: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: 'usuario'
  }
}, { collection: 'hospitales' });

// Transformador del objeto
HospitalSchema.method('toJson', () =>{
  // desEstructuracion
  const { __v, _id, ...object } = this.toObject();

  //transformamos el ID
  object.id = _id;
  return object;

})

module.exports = model('hospital', HospitalSchema);