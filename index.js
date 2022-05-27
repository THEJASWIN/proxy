const express = require('express');
const axios = require('axios');
const app = express();

const NGROK_COLAB = "https://224e-146-148-21-174.ngrok.io";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "*");
    console.log(req.method, req.url);
    next();
});

app.get("/", (req, res) => res.send("<h1>Hey</h1>"));

app.post('/api/py2nl', (req, res) => {
    console.log("Body", req.body.code);
    const form = new URLSearchParams();
    form.append('codePrompt', req.body.code);
    axios.post('https://smart-assistant-yrh27rcwya-el.a.run.app/api/py2nl', form).then(response => {
        res.send(response.data);
    }).catch(err => {
        console.log("Error:");
        res.status(405).json(err);
    })
});

app.post('/api/nl2py', (req, res) => {
    console.log("Body", req.body.code);
    const form = new URLSearchParams();
    form.append('codePrompt', req.body.nlp);
    axios.post('https://smart-assistant-yrh27rcwya-el.a.run.app/api/nl2py', form).then(response => {
        res.send(response.data);
    }).catch(err => {
        console.log("Error:");
        res.status(405).json(err);
    })
});

app.post('/api/qa', (req, res) => {
    console.log("Body", req.body.code);
    const form = new URLSearchParams();
    form.append('keywordPrompt', req.body.keyword);
    form.append('question', req.body.question);
    axios.post('https://smart-assistant-yrh27rcwya-el.a.run.app/api/qa', form).then(response => {
        res.send(response.data);
    }).catch(err => {
        console.log("Error:");
        res.status(405).json(err);
    });
});

app.post('/api/notes', (req, res) => {
    console.log("Body", req.body.code);
    const form = new URLSearchParams();
    form.append('inputPrompt', req.body.input);
    axios.post('https://smart-assistant-yrh27rcwya-el.a.run.app/api/notes', form).then(response => {
        res.send(response.data);
    }).catch(err => {
        console.log("Error:");
        res.status(405).json(err);
    });
});

app.post('/api/suggestion', (req, res) => {
    const form = new URLSearchParams();
    form.append('keywordPrompt', req.body.input);
    axios.post('https://smart-assistant-yrh27rcwya-el.a.run.app/api/suggestion', form).then(response => {
        res.send(response.data);
    }).catch(err => {
        console.log("Error:");
        res.status(405).json(err);
    });
});


app.post('/api/qa-colab', (req, res) => {
    console.log(req.body);
    const form = new URLSearchParams();
    form.append("keywordPrompt", req.body.input);
    console.log("Form", form);
    axios.post(NGROK_COLAB + "/api/key/qagen", form).then(response => {
        res.send(response.data);
    }).catch(err => {
        console.log("Error:");
        res.status(405).json(err);
    });
});

app.post('/api/qa-colab-file', (req, res) => {
    const form = new URLSearchParams();
    form.append("textPrompt", req.body.input);
    axios.post(NGROK_COLAB + "/api/text/qagen", form).then(response => {
        res.send(response.data);
    }).catch(err => {
        console.log("Error:", err);
        res.status(405).json(err);
    });
});
const PORT = process.env.PORT || 9876;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
