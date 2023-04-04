import { FC, PropsWithChildren, useMemo } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

export const tournamentKeys = {
  all: () => ['tournaments'] as const,
  tournamentPrizes: (locale: string, tournamentId: string, seasonId: string) =>
    [...tournamentKeys.all(), 'tournament-prizes', locale, tournamentId, seasonId] as const,
};

export const ReactQueryProvider: FC<PropsWithChildren> = ({ children }) => {
  const queryClient = useMemo(() => new QueryClient(), []);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};
