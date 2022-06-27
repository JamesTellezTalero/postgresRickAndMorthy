import express from 'express';
const app = express();
const port = 8000;

//middleware

app.use(express.json());
app.use(express.urlencoded({extended:false}));

//routes
import indexRoutes from './routes/index';

app.use(indexRoutes);


app.listen(port, ()=>{
    console.log(`Server on port: ${port}`)
});