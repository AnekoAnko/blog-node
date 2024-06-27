import express from 'express';
import bodyParser from 'body-parser';
import env from 'dotenv';
import postController from './controllers/postController.js'; 

const app = express();
const port = 3000;
env.config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('view engine', 'ejs'); 
app.set('views', './views'); 

postController(app); 

app.listen(port, () => {
    console.log(`Server has started at port: ${port}`);
});