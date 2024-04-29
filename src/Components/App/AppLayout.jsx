import { App } from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

const defaultOptions = {
  defaultOptions: {
    queries: {
      retry: 1,
    },
  },
};

const queryClient = new QueryClient(defaultOptions);

export const AppLayout = () => {
  const [isAppLoading, setIsAppLoading] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <App isAppLoading={isAppLoading} setIsAppLoading={setIsAppLoading} />
    </QueryClientProvider>
  );
};
