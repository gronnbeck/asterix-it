module.exports = function(mongoose) {
  return {
    Log: mongoose.model('Log', {
      log: String,
      posted_by: String,
      created_at: { type: Date, default: Date.now }
    })
  }
}
