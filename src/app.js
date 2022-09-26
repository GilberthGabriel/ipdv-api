import express from 'express';
import cors from 'cors';
import UsersRouter from './routes/users';
import RolesRouter from './routes/roles';
import DepartmentsRouter from './routes/departments';
import CostCentersRouter from './routes/cost_centers';
import AuthRouter from './routes/auth';
import { verifyToken } from './middlewares/auth_middleware';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/auth', AuthRouter);
app.use('/users', verifyToken, UsersRouter);
app.use('/roles', verifyToken, RolesRouter);
app.use('/departments', verifyToken, DepartmentsRouter);
app.use('/costcenters', verifyToken, CostCentersRouter);
app.get('/', (req, res) => res.send('Hello World!'));

export default app;
