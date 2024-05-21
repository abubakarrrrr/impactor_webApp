import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Authguard = ({ children }: any) => {
  const router = useRouter();

  useEffect(() => {
    const authenticateUser = () => {
      const authToken = Cookies.get('token');
      const loginPage = router.pathname.startsWith('/login');
      const signUpPage = router.pathname.startsWith('/signup');

      if (authToken) {
        if (loginPage || signUpPage) {
          router.push('/');
        }
      } else {
        if (!loginPage && !signUpPage) {
          router.push('/login');
        }
      }
      return;
    };

    authenticateUser();
  }, [router, router.pathname]);

  return <>{children}</>;
};

export default Authguard;
