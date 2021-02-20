/**
 *
 * Asynchronously loads the component for Weather
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
