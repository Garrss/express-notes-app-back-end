import response from '../utils/response';
import TokenManager from '../security/token-manager';

async function authenticateToken(req, res, next) {
  const token = req.headers.authorization;
  if (token && token.indexOf('Bearer ') !== -1) {
    try {
      const user = await TokenManager.verify(token.split('Bearer ')[1], process.env.ACCESS_TOKEN_KEY);
      req.user = user;
      return next();
    } catch (error) {
      return response(response, 401, error.message, null);
    }
  }

  return response(response, 401, 'Unauthorized', null);
};

export default authenticateToken;