/*
 * Weather Messages
 *
 * This contains all the text for the Weather container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Weather';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the Weather container!',
  },
});
