const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

app.use(express.static(__dirname + '/public'));
app.set('view engine','hbs');

app.use((req,res,next)=>{
    var now = new Date().toString();
    var log = `${now} : ${req.method} , ${req.url}`;
    console.log(log);
    fs.writeFileSync('server.log' , log);    
    next();
})

app.use((req,res,next)=>{
    res.render('offline.hbs')
})

hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getcurrentDate',()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('UpperCase',(text)=>{
    return text.toUpperCase();
})


app.get('/',(req ,res)=>{
    res.render('home.hbs',{
        pagetitle : 'صفحه اصلی ',
        currentDate : new Date().getFullYear(),
        wellcomemessage : 'wellcome to home page'
    });
    // res.send('<h2>hello world</h2>')
})

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pagetitle : 'صفحه درباره ما',
        currentDate : new Date().getFullYear(),
        wellcomemessage : 'wellcome to about page'
    });
    // res.send({
    //     name : 'eli',
    //     url : [
    //         'salam',
    //         'khoobe'
    //     ]
    // })
})

app.get('/err',(req,res)=>{
    res.send('error page')
})

app.listen(3000,()=>{
    console.log('server is 3000');
});