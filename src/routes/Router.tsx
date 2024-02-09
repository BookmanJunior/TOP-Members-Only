import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./root";
import Home from "./Home";
import MessageBoard from "./Message-Board";
import SignUp from "./Sign-Up";
import ErrorElement from "./Error";

export default function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorElement />,
      children: [
        {
          element: <Home />,
          index: true,
        },
        {
          path: "/message-board",
          element: <MessageBoard />,
        },
        {
          path: "/sign-up",
          element: <SignUp />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
