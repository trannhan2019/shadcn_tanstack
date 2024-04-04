import { Suspense, lazy } from "react";
import { useRoutes } from "react-router-dom";
import path from "@/constants/path";

const Product = lazy(() => import("@/pages/product"));

export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: path.products,
      element: (
        <Suspense>
          <Product />,
        </Suspense>
      ),
    },
  ]);

  return routeElements;
}
