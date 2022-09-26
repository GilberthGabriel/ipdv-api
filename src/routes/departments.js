import { Router } from 'express';

import {
  create, getAll, getOne, remove, update,
} from '../controllers/department';

const router = Router();
router.get('/:id', getOne);
router.put('/:id', update);
router.delete('/:id', remove);
router.get('/', getAll);
router.post('/', create);

export default router;
