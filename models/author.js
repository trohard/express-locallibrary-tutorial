var moment = require('moment');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AuthorSchema = new Schema(
  {
    first_name: {type: String, required: true, max: 100},
    family_name: {type: String, required: true, max: 100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date},
  }
);

// Virtual for author's full name
AuthorSchema
.virtual('name')
.get(function () {
  return this.family_name + ', ' + this.first_name;
});

// Virtual for author's lifespan
AuthorSchema
.virtual('lifespan')
.get(function () {
  //return (this.date_of_death.getYear() - this.date_of_birth.getYear()).toString();
  let dob = "Unknown";
  let dod = "";
  if (this.date_of_birth) {
    dob = moment(this.date_of_birth).utc().format('MMMM Do, YYYY');
  }
  if (this.date_of_death) {
    dod = moment(this.date_of_death).utc().format('MMMM Do, YYYY');
  }
  return dob + " - " + dod;
});

AuthorSchema
.virtual('dob_form_format')
.get(function () {
  return moment(this.date_of_birth).utc().format('YYYY-MM-DD');
});

AuthorSchema
.virtual('dod_form_format')
.get(function () {
  return moment(this.date_of_death).utc().format('YYYY-MM-DD');
});

// Virtual for author's URL
AuthorSchema
.virtual('url')
.get(function () {
  return '/catalog/author/' + this._id;
});

//Export model
module.exports = mongoose.model('Author', AuthorSchema);