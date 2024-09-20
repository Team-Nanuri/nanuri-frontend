import {Outlet} from "react-router-dom";
import {Suspense} from "react";
import {ErrorBoundary} from "react-error-boundary";

export default function RootLayout() {

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