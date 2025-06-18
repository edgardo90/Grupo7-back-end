const { Schema, model } = require('mongoose');

const collectionSchema = new Schema(
  {
    name: { 
      type: String, 
      required: [true, "El nombre de la colección es obligatorio"] 
    },
    type: { 
      type: String, 
      required: true 
    },
    books: [{ 
      type: Schema.Types.ObjectId, 
      ref: 'Book' 
    }],
  
  },
  { timestamps: true, versionKey: false }
);

module.exports = model('Collection', collectionSchema);