import { get } from 'koa-route';
import { exploreBars } from './api';

const exploreBarsRoute = get('/api/explore', exploreBars);

export { exploreBarsRoute as exploreBars };
