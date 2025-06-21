const { Schema, model } = require("mongoose");
const User = require("./user");

const collectionSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "El nombre de la colección es obligatorio"],
    },
    type: {
      type: String,
      required: true,
    },
    books: [
      {
        type: Schema.Types.ObjectId,
        ref: "Book",
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

// collectionSchema.pre(/^find/, async function (next) {
//     this.populate({
//         path: 'books',
//         select: '-createdAt -updatedAt'
//     });
//     next()
// });

collectionSchema.post("findOneAndDelete", async (collection) => {
  console.log(collection);
  if (collection) {
    await User.updateMany(
      { collections: collection._id },
      { $pull: { collections: collection._id } }
    );
  }
});

const Collection = model("Collection", collectionSchema);

module.exports = Collection;
