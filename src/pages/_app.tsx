import '@/styles/globals.css';
import type { AppProps } from 'next/app';
// import { Providers } from "@/redux/provider"; 
import { Provider } from 'react-redux';
import {store} from "@/redux/Store"
import { ToastContainer } from 'react-toastify';
import "react-toastify/ReactToastify.css"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <main className=''>

        <Provider store={store}>
        <Component {...pageProps} />
        <ToastContainer />
        </Provider>
        
      </main>
    </>
  );
}
