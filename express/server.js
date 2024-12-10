import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import lokasiRoutes from './routes/lokasiRoutes.js';
import authRoutes from './routes/authRoutes.js';
import leadersRoutes from './routes/leadersRoutes.js';
import mentorRoutes from './routes/mentorRoutes.js';
import programRoutes from './routes/programRoutes.js';
import topikRoutes from './routes/topikRoutes.js';
import modulRoutes from './routes/modulRoutes.js';
import eventRoutes from './routes/eventRoutes.js';

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());

app.use(lokasiRoutes);
app.use(authRoutes);
app.use(leadersRoutes);
app.use(mentorRoutes);
app.use(programRoutes);
app.use(topikRoutes);
app.use(modulRoutes);
app.use(eventRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
