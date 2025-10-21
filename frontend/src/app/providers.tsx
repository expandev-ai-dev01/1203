import { ReactNode } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/core/lib/queryClient';

type AppProvidersProps = {
  children: ReactNode;
};

/**
 * @component AppProviders
 * @summary Wraps the application with all necessary context providers.
 * @domain core
 * @type provider-wrapper
 * @category application
 *
 * @providers
 * - QueryClientProvider: TanStack Query for server state management
 */
export const AppProviders = ({ children }: AppProvidersProps) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
