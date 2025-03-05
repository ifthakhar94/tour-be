const mongoose = require("mongoose");
// const slugify = require("slugify");
// const validator = require("validator");

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [false, "A tour must have a name"],
      trim: true,
      unique: true,
      maxlength: [40, "A tour name must have less or equal then 40 characters"],
      minlength: [10, "A tour name must have more or equal then 10 characters"],
      // validate: [validator.isAlpha, "Tour name must only contain characters"],
    },
    rating: {
      type: Number,
      default: 4.5,
      min: [1, "Rating must be above 1.0"],
      max: [5, "Rating must be below 5.0"],
    },
    duration: {
      type: Number,
      required: [false, "A tour must have a duration"],
      min: [1, "Duration must be at least 1"],
      max: [10, "Duration must be less than 10"],
    },
    maxGroupSize: {
      type: Number,
      required: [false, "A tour must have a group size"],
      min: [1, "Group size must be at least 1"],
      max: [10, "Group size must be less than 10"],
    },
    difficulty: {
      type: String,
      required: [false, "A tour must have a difficulty"],
      enum: {
        values: ["easy", "medium", "difficult"],
        message: "Difficulty is either: easy, medium, or difficult",
      },
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, "Rating must be above 1.0"],
      max: [5, "Rating must be below 5.0"],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [false, "A tour must have a price"],
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          return val < this.price;
        },
        message: "Discount price ({VALUE}) should be below regular price",
      },
    },
    summary: {
      type: String,
      trim: true,
      required: [false, "A tour must have a summary"],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [false, "A tour must have a cover image"],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

tourSchema.virtual("durationWeeks").get(() => this.duration / 7);

// tourSchema.pre("save", function (next) {
//   // this.slug = slugify(this.name, { lower: true });
//   console.log(this);
//   next();
// });

// tourSchema.post("save", (doc, next) => {
//   console.log(doc);
//   next();
// });

// tourSchema.pre("find", (next) => {
//   this.find({ secretTour: { $ne: true } });
//   next();
// });

// tourSchema.post("find", (docs, next) => {
//   console.log(docs);
//   next();
// });

// tourSchema.pre("aggregate", (next) => {
//   this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
//   next();
// });

const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;
