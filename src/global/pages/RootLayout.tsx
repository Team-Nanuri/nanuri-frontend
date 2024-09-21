import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {Suspense, useEffect} from "react";
import {ErrorBoundary} from "react-error-boundary";
import {useUser} from "@/user/hooks/useUser.ts";

export default function RootLayout() {

  const {user, error} = useUser();
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthPath = location.pathname === "/login" || location.pathname === "/signup";
  const isLoginPath = !isAuthPath;

  useEffect(() => {
    console.log(`RootLayout useEffect ${location.pathname} user:${user} e:${error} au: ${isAuthPath} lo: ${isLoginPath}`);
    if(user && isAuthPath) {
      navigate("/");
    }
    if(error && isLoginPath) {
      navigate("/login");
    }

  }, [user, error, location.pathname]);

  return (
    <div className="w-full h-dvh flex justify-center bg-bgCanvasWhite overflow-y-auto overflow-x-hidden">
      <div className="w-full max-w-[430px] bg-bgPrimaryWhite">
        <ErrorBoundary fallback={<div>Error</div>}>
          <Suspense fallback={<div>loading</div>}>
            <Outlet/>
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
}