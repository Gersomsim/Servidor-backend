const { Schema, model} = require('mongoose');

const MedicoSchema = Schema({
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
    ref: 'usuario',
  },
  hospital: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: 'hospital'
  }
});

MedicoSchema.method('toJson', () => {
  const { _v, _id, ...object } = this.toObject();
  object.id = _id;

  return object;
});

module.exports = model('medico', MedicoSchema);