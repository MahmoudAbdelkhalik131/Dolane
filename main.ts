import express from 'express';
import dotenv from 'dotenv';
import connectDB  from './connect/connect';
import Routes from './index';
import path from 'path'
import i18n from 'i18n'
const app: express.Application = express();
app.use(express.json());
dotenv.config();
i18n.configure({
    locales: ['en', 'ar'],
    directory: path.join(__dirname, 'locales'),
    defaultLocale: 'en',
    queryParameter: 'lang'
});
app.use(i18n.init);
Routes(app)
connectDB();
app.listen(process.env.Port,()=>{
    console.log(`server started on port ${process.env.Port}`);
})

    
