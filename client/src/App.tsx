import {trpc} from './utils/trpc';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { useState } from 'react';
import IndexPage from './pages/IndexPage';

function App() {

    const [queryClient] = useState(() => new QueryClient());
    const [trpcClient] = useState(() => 
      trpc.createClient({
        links: [
          httpBatchLink({
            url: 'http://localhost:3000/trpc',

            //This is where you would pass in any https headers
            
          }),
        ],
      }),
    );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <IndexPage/>
      </QueryClientProvider>
    </trpc.Provider>
  );
}

export default App;
