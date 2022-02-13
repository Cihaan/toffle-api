import { Router } from 'express';
import userModel from '../src/models/user.model'
import { Request, Response } from 'express';

const router = Router();


// REGISTER ALL FIELDS
router.post('/', (req: Request, res: Response) => {
    const data = req.body


    const user = new userModel.UserModel({
        name: data.name,
        email: data.email,
        password: data.password,
        to_watch: {
                    movies: [
                        {
                            id_movie: data.id_movie,
                            title: data.title,
                            poster_path: data.poster_path,
                            duration: data.duration,
                            release_date: data.release_date,
                            overview: data.overview,
                            added_date: data.added_date,
                            vote_average: data.vote_average,
                        }
                    ],
                    show: [
                        {
                            id_movie: data.id_movie,
                            title: data.title,
                            poster_path: data.poster_path,
                            duration: data.duration,
                            release_date: data.release_date,
                            number_of_episode: data.number_of_episode,
                            number_of_season: data.number_of_season,
                            overview: data.overview,
                            added_date: data.added_date,
                            vote_average: data.vote_average,
                        }
                    ]
                },
        watched: {
                    movies: [
                        {
                            id_movie: data.id_movie,
                            title: data.title,
                            poster_path: data.poster_path,
                            duration: data.duration,
                            release_date: data.release_date,
                            overview: data.overview,
                            added_date: data.added_date,
                            vote_average: data.vote_average,
                            user_note: data.user_note
                        }
                    ],
                    shows: [
                        {
                            id_movie: data.id_movie,
                            title: data.title,
                            poster_path: data.poster_path,
                            duration: data.duration,
                            release_date: data.release_date,
                            number_of_episode: data.number_of_episode,
                            number_of_season: data.number_of_season,
                            overview: data.overview,
                            added_date: data.added_date,
                            vote_average: data.vote_average,
                            user_note: data.user_note
                        }
                    ]
        }
    })

    user.update({_id: "6209173a0cdbed7a46ada455", 'to_watch._id': '6209173a0cdbed7a46ada456'}, {$push : {'to_watch.movies' : {
        id_movie: data.id_movie,
                            title: data.title,
                            poster_path: data.poster_path,
                            duration: data.duration,
                            release_date: data.release_date,
                            overview: data.overview,
                            added_date: data.added_date,
                            vote_average: data.vote_average,
    }}})


    const newUser = user.save()
    .then((resp: Response) => {
        res.json(resp)
    })
    .catch((err: Error) => {
        res.status(400).json({message: err.message})
    })
})


// get all users
router.get('/', (req: Request, res: Response) => {

    const users = userModel.UserModel.find()
    .then((resp) => {
        res.json(resp)
    }).catch((err: Error) => {
        res.status(500).json({message : err.message})
    })
})

export default router