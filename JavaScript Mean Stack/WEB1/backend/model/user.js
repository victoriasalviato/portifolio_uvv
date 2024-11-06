const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    termos: {type: Boolean, required: true},
    sexo: {type: String},
    dataNascimento: {type: Date},
    messages: [{type: Schema.Types.ObjectId, ref: 'Message'}]
});

module.exports = mongoose.model('User', userSchema);
