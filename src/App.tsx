import { Suspense, lazy } from 'react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from '@/pages/Home'
import Loading from '@/components/shared/Loading'
import ComingSoon from '@/components/shared/ComingSoon'
 import NotFound from '@/components/shared/NotFound'
import Error from '@/components/shared/Error'

const AppLayout = lazy(() => import('@/components/layout/AppLayout.tsx'))
const DEFAULT_QUERYCLIENT = {
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
      retry: 2,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      refetchOnMount: false,
    },
  },
}

export default function App() {
  const queryClient = new QueryClient(DEFAULT_QUERYCLIENT)

  const router = createBrowserRouter([
    {
      path: '/',
      errorElement: <Error />,
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: 'news',
          element: <ComingSoon />,
        },
        {
          path: 'matches',
          element: <ComingSoon />,
        },
        {
          path: 'coupons',
          element: <ComingSoon />,
        },
        {
          path: 'more',
          element: <ComingSoon />,
        },
      
      ],
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ])

  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<Loading />}>
        <RouterProvider router={router} />
      </Suspense>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
