import { useEffect } from 'react';

function usePageTitle(pageTitle: string) {
  useEffect(() => {
    document.title = `Monopoly | ${pageTitle}`;
  }, [pageTitle]);
}

export default usePageTitle;
