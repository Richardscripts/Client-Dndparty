import React from 'react';
import { App } from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const defaultOptions = {
  defaultOptions: {
    queries: {
      retry: 1,
    },
  },
};

const queryClient = new QueryClient(defaultOptions);

export const AppLayout = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
};
