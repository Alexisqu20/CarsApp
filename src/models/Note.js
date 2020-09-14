const { Schema, model } = require("mongoose");

const NoteSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    placa: {
      type: String,
      required: true
    },
    marca: {
      type: String,
      required: true
    },
    modelo: {
      type: String,
      required: true
    },
    tipo: {
      type: String,
      required: true
    },
    color: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    cant_cambios: {
      type: Number,
      required: true
    },
    referencia: {
      type: String,
      required: true
    },
    user: {
      type: String,
      required: true
    },
    status: {
      type: Boolean,
      default: false
}
/*    estado: {
      type: Boolean,
      required: true
    },
    created_ad: {
      type: Date,
      default: Date.now
    },
*/
  },
  {
    timestamps: true
  }
);



module.exports = model("Note", NoteSchema);
