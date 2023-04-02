import app from './app'
import debug from 'debug'
debug('temp:server')
import http from "http"
import { HttpError } from 'http-errors'

const normalizePort = (val: string) =>{
    const port = parseInt(val, 10)

    if(isNaN(port)) return val

    if(port >= 0) return port

    return false
}

const port = normalizePort(process.env.PORT || '3000') as number
app.set('port', port)


const onError = (error: HttpError) =>{
    if (error.syscall !== 'listen') throw error

    const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port
    switch(error.code){
        case 'EACCES':
            console.error(bind + ' reqiures elevated privileges')
            process.exit(1)
            break
        case 'EADDRINUSE':
            console.error(bind + ' is already in use')
            process.exit(1)
            break
        default:
            throw error
    }
}

const onListening = () => {
    let addr = server.address()
    let bind = 'pipe ' + addr
    debug('Listening on ' + bind)
}

const server = http.createServer(app)
server.listen(port)
server.on('error', onError)
server.on('listening', onListening)