import { RequestHandler } from 'express';

function getRandomNumber([min, max]: [min: number, max: number]): number {
  return Math.floor(Math.random() * (max - min) + min);
}

export function sleep(
  timeout: number | [min: number, max: number]
): RequestHandler {
  return (req, res, next) => {
    setTimeout(
      () => {
        next();
      },
      typeof timeout === 'number' ? timeout : getRandomNumber(timeout)
    );
  };
}
