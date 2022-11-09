const express = require('express')
const session = require('express-session')
const FileStore = require('session-file-store')

const Store = FileStore(session)

const app = express()
const server = app.listen(8080, () => console.log('Server Up'))

app.use(session({
    store: new Store({
        path: './sessions',
        ttl: 900 //time to live, default: 3600s (1h)
    }),
    secret: "c0d3r",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))


app.get('/', (req, res) => {
    req.session.user = {
        username: 'alex',
        role: 'admin'
    }
    res.send({message: 'ok'})
})

app.get('/currentSession', (req, res) => {
    res.send(req.session.user)
})
