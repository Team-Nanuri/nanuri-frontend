import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {Suspense, useEffect} from "react";
import {ErrorBoundary} from "react-error-boundary";
import {useUser} from "@/user/hooks/useUser.ts";
import LoadingSpinner from "@/global/components/LoadingSpinner.tsx";
import {ACCESS_TOKEN} from "@/global/const/const.ts";

export default function RootLayout() {

  const {user, error} = useUser();
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthPath = location.pathname === "/login" || location.pathname === "/signup";
  const isLoginPath = !isAuthPath;

  useEffect(() => {
    if(user && isAuthPath) {
      navigate("/");
    }
    if(error && isLoginPath) {
      navigate("/login");
    }
    if(!localStorage.getItem(ACCESS_TOKEN)){
      navigate("/login");
    }

  }, [user, error, location.pathname]);

  return (
    <div className="w-full h-dvh flex justify-center bg-bgCanvasWhite overflow-y-auto overflow-x-hidden">
      <div className="w-full max-w-[430px] bg-bgPrimaryWhite">
        <ErrorBoundary fallback={<div>Error</div>}>
          <Suspense fallback={<LoadingSpinner />}>
            <Outlet/>
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
}