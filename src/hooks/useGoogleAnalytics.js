import { useEffect } from 'react';
import ReactGA from 'react-ga';

const useGoogleAnalytics = () => {
  useEffect(() => {
    ReactGA.initialize(process.env.REACT_APP_GA_ID);
    ReactGA.ga("set", "checkProtocolTask", () => {});
  }, []);
};

export default useGoogleAnalytics;
