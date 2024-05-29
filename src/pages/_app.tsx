import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '@/redux/Store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css';
import { Authroutes } from '@/components/Authroutes';
import { useRouter } from 'next/router';
import Authguard from '@/components/Authguard';
import AuthLayout from '@/components/AuthLayout';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Dashboard from '@/components/Dashboard';


export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <>
      <main className=''>
        <Provider store={store}>
          {Authroutes.includes(router.pathname) ? (
            <AuthLayout>
              <Component {...pageProps} />
            </AuthLayout>
          ) : (
            
            <Authguard>
               <Dashboard />
              <Component {...pageProps} />
              
            </Authguard>
          )}
          <ToastContainer />
        </Provider>
      </main>
    </>
  );
}
