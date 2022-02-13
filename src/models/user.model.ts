import  mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import config from "config"

// movies à l'intérieur de to watch
const toWatchMovies = new mongoose.Schema({
    movies: [{
        id_movie: Number,
        title: String,
        poster_path: String,
        release_date: String,
        duration: Number,
        overview: String,
        createdAt: {
            type: Date,
            default: () => Date.now()
        },
        vote_average: Number
    }]
})

//shows à l'intérieur de to watch
const toWatchShows = new mongoose.Schema({
    shows: [{
        id_show: Number,
        title: String,
        poster_path: String,
        release_date: String,
        number_of_episode: Number,
        number_of_season: Number,
        overview: String,
        createdAt: {
            type: Date,
            default: () => Date.now()
        },
        vote_average: Number
    }]
})


const watchedMovies = new mongoose.Schema({
        movies: [{
            id_movie: Number,
            title: String,
            poster_path: String,
            release_date: String,
            duration: Number,
            overview: String,
            createdAt: {
                type: Date,
                default: () => Date.now()
            },
            vote_average: Number,
            user_note: Number
        }],
})


const watchedShows = new mongoose.Schema({
    shows: [{
        id_show: Number,
        title: String,
        poster_path: String,
        release_date: String,
        number_of_episode: Number,
        number_of_season: Number,
        overview: String,
        createdAt: {
            type: Date,
            default: () => Date.now()
        },
        vote_average: Number,
        user_note: Number
    }]
})


const toWatchSchema = new mongoose.Schema({
    to_watch: {
        movies: toWatchMovies,
        shows: toWatchShows
    },
})


const watchedSchema = new mongoose.Schema({
    watched: {
        movies: watchedMovies,
        shows: watchedShows
    }
})


const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    createdAt: {
        type: Date,
        default: () => Date.now()
    },
    updatedAt: {
        type: Date,
        default: () => Date.now()
    },
    to_watch: toWatchSchema,
    watched: watchedSchema
})

const UserModel = mongoose.model("User", userSchema)
const ToWatchModel = mongoose.model("ToWatch", toWatchSchema)
const WatchedSchema = mongoose.model("Watched", watchedSchema)

export default {UserModel, ToWatchModel, WatchedSchema}