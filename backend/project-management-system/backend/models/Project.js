const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    progress: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    },
    documents: [{
        path: String,
        originalName: String,
        uploadDate: {
            type: Date,
            default: Date.now
        }
    }],
    images: [{
        path: String,
        originalName: String,
        uploadDate: {
            type: Date,
            default: Date.now
        }
    }],
    videos: [{
        path: String,
        originalName: String,
        uploadDate: {
            type: Date,
            default: Date.now
        }
    }],
    statusUpdates: [{
        description: String,
        date: {
            type: Date,
            default: Date.now
        }
    }],
    dateCreated: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Project', projectSchema);
