import express from 'express'; // express is a function

const router = express.Router();

router.get('/', (req, res) => {
    //res.send('Hello World');
    res.render('index', {title: 'My Express App', message: 'Hello World',});
});

export default router;