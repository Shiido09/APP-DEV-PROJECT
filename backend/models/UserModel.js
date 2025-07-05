const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    defaultWallet: {
        type: Number,
        default: 0
    },
    gender:{
        type: String,
        enum: ['male', 'female', 'prefer not to say'],
        required: true
    },
    profilePicture: {
            public_id: {
                type: String,
                required: false,
            },
            url: {
                type: String,
                required: false,
            },
        },
    ewallets: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'EWallet',
        }
      ],
    cart: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                default: 1,
                min: 1
            },
            addedAt: {
                type: Date,
                default: Date.now
            }
        }
    ]

});

const User = mongoose.model('User', userSchema);

module.exports = User;