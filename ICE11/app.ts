import createError from 'http-errors'
import express, {NextFunction} from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'

import indexRouter from './Routes/index'
import userRouter from './Routes/users'
import exp from 'constants'
const app = express()

app.set('views', path.join(__dirname, 'Views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'Client')))
app.use(express.static(path.join(__dirname, 'node_modules')))

app.use('/', indexRouter)
app.use('/users', userRouter)

app.use((req, res, next) =>{
    next(createError(404))
})

app.use((err: createError.HttpError, req: express.Request, res: express.Response, next: NextFunction) => {
    res.locals.message = err.message
    res.locals.errors = req.app.get('env') === 'devolopment' ? err : {}
    res.status(err.status || 500)
    res.render('error')
})

export default app