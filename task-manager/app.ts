import express from 'express';
import connectDB from './db/connect.js';
import tasksRoute from './routes/tasks.js';

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1/tasks', tasksRoute)
app.use('*', (req, res) => {
    res.status(401).json({ success: false, error: 'This path is now aviable' });
})

async function start() {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server listen in ${ PORT }`);
        })
    } catch (error) {
        console.log(error);
    }
}

start();
