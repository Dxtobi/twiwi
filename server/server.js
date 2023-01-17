import express, { json } from "express";
import * as dotenv from 'dotenv';
import cors from 'cors';
import { Configuration, OpenAIApi } from "openai";
import request from 'request';

dotenv.config()



/*const url = `https://api.openai.com/v1/images/generations`;
const options = {
  method: 'POST',
  url: url,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.OPEN_AI_KEY}`
  },
  json: {
    'model': 'image-alpha-001',
    'prompt': text,
  }
};*/
const configuration = new Configuration({
    apiKey: process.env.OPEN_AI_KEY,
})

const openai = new OpenAIApi(configuration)

const app = express();
app.use(cors());
app.use(express.json());

app.get('/test', async (req, res) => {
    res.status(200).send({
        message:'working'
    })
});


//MAIN API END POINTS
/* * MOVE THIS TO ANOTHER FILE */

//REDUCE ANY TEXT TO A TWIT LENGTH
app.post('/api/reduce_to_twit', async (req, res) => {
    try {
        console.log(req.body.prompt)
        if (req.body.prompt === undefined || !req.body.prompt) {
            console.log(req.body.prompt)
            return res.status(200).json({error:'something went wrong'})
        }
        const prompt = req.body.prompt;

        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `make a compressed version of this text to 140 characters: ${prompt}`,
            temperature: 0,
            max_tokens: 3000,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0,
        })

        let twit= response.data.choices[0].text

        console.log('hit here', twit)
        res.status(200).json(twit)
    } catch (error) {
        console.log(error.message)
    }
})

app.post('/api/reply', async (req, res) => {
    try {
        console.log(req.body.prompt)
        if (req.body.prompt === undefined || !req.body.prompt) {
            console.log(req.body.prompt)
            return res.status(200).json({error:'something went wrong'})
        }
        const prompt = req.body.prompt;

        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `give a sarcastic and funny reply make it a sarcastic answer use the context of dry humor joke to reply this: ${prompt}, `,
            temperature: 0,
            max_tokens: 60,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
        })

        let twit= response.data.choices[0].text

        console.log('hit here', twit)
        res.status(200).json(twit)
    } catch (error) {
        console.log(error.message)
    }
})

app.post('/api/write_about', async (req, res) => {
    try {
        const {aim, platform,} = req.body;
        console.log(req.body.platform)
        if (!req.body.aim.trim() || !req.body.platform.trim()) {
            console.log(req.body.prompt)
            return res.status(200).json({error:'something went wrong'})
        }
        

        
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Write a creative ad for the following product to run on ${platform} aimed at ${aim}`,
        temperature: 0.5,
        max_tokens: 100,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    });

    let twit= response.data.choices[0].text

            console.log('hit here', twit)
        res.status(200).json(twit)
    } catch (error) {
        console.log(error.message)
    }
})

app.post('/api/give_image', async (req, res) => {
    try {
        console.log(req.body.prompt)
        if (req.body.prompt === undefined || !req.body.prompt) {
            console.log(req.body.prompt)
            return res.status(200).json({error:'something went wrong'})
        }
        const {aim, platform, product} = req.body;

        
        openai.createImage({
            prompt: `${req.body.prompt} digital art`,
            model: "image-alpha-001",
            size: "256x256",
        }).then((response) => {
           // console.log(response.data.data[0].url);
            res.status(200).json(response.data.data[0].url)
        }).catch((error) => {
            console.log(error.message);
        });

   
        
    } catch (error) {
        console.log(error.message)
    }
})


app.listen(5000, ()=> console.log('running on http//localhost:5000'))