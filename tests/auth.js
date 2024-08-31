/* eslint-disable no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import { getUserFromXToken, getUserFromAuthorization } from '../utils/auth';

/**
 * Applies Basic au ntication to route.
 * @param {Request} req express request object.
 * @param {Response} res  Express response object.
 * @param {NextFunction} next  Express next function.
 */
export const basicAuthenticate = async (req, res, next) => {
  const user = await getUserFromAuthorization(req);

  if (!user) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }
  req.user = user;
  next();
};

/**
 * Applies X-Token autentication to  route.
 * @param {Request} req   Express request object.
 * @param {Response} res   Express response object.
 * @param {NextFunction} next   Express next function.
 */
export const xTokenAuthenticate = async (req, res, next) => {
  const user = await getUserFromXToken(req);

  if (!user) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }
  req.user = user;
  next();
};