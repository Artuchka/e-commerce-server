const { connect } = require("mongoose")

const connectDB = (uri) => connect(uri)

module.exports = { connectDB }
