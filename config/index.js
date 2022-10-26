require('dotenv').config()
const {
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    PORT
} = process.env

module.exports = { 
    googleAuth: {
        clientID: GOOGLE_CLIENT_ID, 
        clientSecret: GOOGLE_CLIENT_SECRET, 
        callbackURL: `http://localhost:${PORT}/auth/google/callback`
    }
}
