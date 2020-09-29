const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true
    },
    email : {
        type : String,
        required : true,
        trim : true,
        lowercase : true,
        validate : (value) => {
            if(!validator.isEmail(value)){
                throw new Error('Invalid Email.')
            }
        },
        unique : true
    },
    password : {
        type : String,
        required : true,
        minlength : 8,
        trim : true,
        validate : (value) => {
            if(value.toLowerCase().includes('password')){
                throw new Error('Password must not contain the term *password*.')
            }
        }
    },
    address : {
        type : String,
        required : true,
        trim : true
    },
    phone : {
        type : String,
        required : true,
        trim : true
    },
    tokens : [
        {
            token : {
                type : String,
                required : true
            }
        }
    ],
    role : {
        type : String,
        enum : [ 'MEMBER', 'ADMIN', 'SELLER' ],
        default : 'MEMBER'
    }
}, { timestamps : true })

//method to find if a user exists.
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })
    if(!user) {
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) {
        throw new Error('Unable to login')
    }
    return user
}
//*******************************.


//methods accessible on instances of 'User' model.
//generate authentication token
userSchema.methods.generateAuthToken = async function() {
    const user = this
    const token = jwt.sign( { _id : user._id.toString() }, 'SECRET_KEY')
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}

userSchema.methods.toJSON = function() {
    const user = this
    const userObj = user.toObject()
    delete userObj.password
    delete userObj.tokens
    delete userObj.avatar
    return userObj
}

// HASHING THE PASSWORD BEFORE SAVING

userSchema.pre('save', async function(next) {
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User