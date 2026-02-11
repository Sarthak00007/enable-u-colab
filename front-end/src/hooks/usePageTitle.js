import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const usePageTitle = (title) => {
    useEffect(() => {
        document.title = `${title} | EnableU Colab`;
    }, [title]);
};

export default usePageTitle;
