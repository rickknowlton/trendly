import { useEffect } from 'react';

const usePreventWindowResize = () => {
  useEffect(() => {
    const preventResize = (e) => {
      e.preventDefault();
    };

    window.addEventListener("resize", preventResize);

    return () => {
      window.removeEventListener("resize", preventResize);
    };
  }, []);
};

export default usePreventWindowResize;
