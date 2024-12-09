import express from 'express';
import bodyParser from 'body-parser';
import { people } from './people';
import { promises as fs } from 'fs';




let app = express();

app.use(bodyParser.json());


// API end point

app.get('/hello', (req, res) => {
    res.send("Hello!");
})


// API end point for people

app.get('/people', (req, res) => {
    res.json(people);
});

app.get('/people/:name', (req, res) => {
    let { name } = req.params;
    let person = people.find( x => x.name === name);

    res.json(person);
});


app.get('/file-data', async (req, res) => {
    let data = await fs.readFile(__dirname + '/people-data.json');
    let people = JSON.parse(data);
    res.json(people);
});


app.post('/people', (req, res) => {

    let newPerson = req.body;
    people.push(newPerson);
    res.json(people);



})

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});