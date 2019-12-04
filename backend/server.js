const express = require('express');
const handlebars = require('express-handlebars');
const fs = require('fs');


let app = express();

//create a main.handlebars inside views/layouts
app.engine('handlebars', handlebars({defaultLayout: 'main'}));

app.set('view engine', 'handlebars');


//serving the pubic folder
app.use(express.static(`${__dirname}/public`))

app.use((request,response,next) => {
    
    let now = new Date().toString()
    let log = `${now}: ${request.method} ${request.url}`
    
    fs.appendFile('log.pdf', log, (error) => {
        if(error){
            console.log('Unable to log a file')
        }else{
            console.log('File created and logged successfully. ')
        }
    })

    next();

})
app.get("/", (request,response) => {
    response.send("Hello Express");
})

app.get("/help", (request,response) => {
    response.render('help.handlebars',{
        currentYear: new Date().getFullYear(),
        pageName: "Help Page"
    });
})

app.listen(4000);