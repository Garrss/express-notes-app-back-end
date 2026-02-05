import { Router } from 'express';
import {
  createUser,
  getUserById,
} from '../services/users/controllers/user-controller.js';
import { validate } from '../middlewares/validate.js';
import { userPayloadSchema } from '../services/users/validator/schema.js';
import {
  login,
  refreshToken,
  logout,
} from '../services/authentications/controller/authentication-controller.js';
import {
  postAuthenticationPayloadSchema,
  putAuthenticationPayloadSchema,
  deleteAuthenticationPayloadSchema,
} from '../services/authentications/validator/schema.js';

const router = Router();

router.post('/users', validate(userPayloadSchema), createUser);
router.get('/users/:id', getUserById);
router.post(
  '/authentications',
  validate(postAuthenticationPayloadSchema),
  login,
);
router.put(
  '/authentications',
  validate(putAuthenticationPayloadSchema),
  refreshToken,
);
router.delete(
  '/authentications',
  validate(deleteAuthenticationPayloadSchema),
  logout,
);

export default router;
