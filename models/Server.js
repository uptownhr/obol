const mongoose = require('mongoose'),
  keygen = require('ssh-keygen')

var serverSchema = new mongoose.Schema({
  host: { type: String },
  username: { type: String },
  key: {
    private: { type: String },
    public: { type: String }
  },
  status: { type: String, enum: ['pending', 'ready', 'down'], default: 'pending' },

  _owner: { type: mongoose.Schema.ObjectId, ref: 'User' },
  _users_with_access: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],

  created: { type: Date, default: Date.now }
})

serverSchema.pre('save', function(next){
  console.log('new?', this.isNew)
  if(this.isNew) return this.generateKeyPair(next)
  next()
})

serverSchema.methods.generateKeyPair = function(cb){
  let doc = this
  console.log('generating key pair')
  return keygen({
    comment: 'obol key'
  }, function(err, out){
    doc.key = {
      private: out.key,
      public: out.pubKey
    }

    cb(err, out)
  })
}

module.exports = mongoose.model('Server', serverSchema);
