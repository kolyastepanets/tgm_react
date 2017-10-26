import ReactOnRails from 'react-on-rails';

import AppStart from '../bundles/startup/appStart';
import GoogleMap from '../bundles/components/GoogleMap';

// This is how react_on_rails can see the HelloWorld in the browser.
ReactOnRails.register({
  AppStart,
  GoogleMap
});
