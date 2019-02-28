const express = require("express");
const cors = require('cors')
const expressSession  = require("express-session");

const port = 3001;
const session = {
    secret: 'Its a secret', 
    resave: false, 
    saveUninitialized: true, 
    cookie: { 
        secure: false,
        maxAge: 24 * 60 * 60 * 1000
    } 
  }

var corsOptions = {
    origin: 'http://localhost:3001',
    methods: ['GET', 'PUT', 'POST']
  }

var app = express()
app.use(expressSession(session));
app.use(express.json());
app.use(cors());

app.all("*", (req, res, next) => {
    let password = req.session.password || [];
    req.session.password = password;
    next(); 
});


app.get('/', (req, res) => res.send('You are not allowed.'));


app.get('/password/', (req, res) => {   
    res.json(req.session.password);    
});

app.get('/password/:website', (req, res) => {   

    const foundEntry = req.session.password.filter((entry) => { 
        return entry.website === req.params.website;
    });
    res.json(foundEntry);
});

app.put("/password/edit/:website", (req, res) => {

    console.log(req.params.website);
    console.log(req.body.password);

    const foundEntry = req.session.password.filter((entry) => { 
        if(entry.website === req.params.website){
            entry.password = req.body.password;
        }
    });

    res.json(req.session.password);
});

app.post("/password/add", (req, res) => {

    const { website, password } = req.body;
    const foundEntry = req.session.password.filter((entry) => { 
        return entry.website === website;
    });

    if ( foundEntry.length === 0 ) {
        const entry = {        
            'website': website,
            'password': password
        }    
        req.session.password.push(entry);
    }
    
    res.json(req.session.password);
});

app.delete('/password/:website', (req, res) => {   
    const newEntries = req.session.password.filter((entry) => { 
         return entry.website !== req.params.website
    });

    req.session.password = newEntries;

    res.json(req.session.password);

});

app.post("/clear", (req, res) => {
    req.session.password = [];
    res.json(req.session.password);
});

app.listen(port, () => console.log(`Password Services listening on port ${port}!`));
