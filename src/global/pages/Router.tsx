import {createBrowserRouter, RouterProvider} from "react-router-dom";
import RootLayout from "@/global/pages/RootLayout.tsx";
import {BottomNavigationLayout} from "@/global/pages/BottomNavigationLayout.tsx";
import MyPage from "@/user/pages/MyPage.tsx";
import ChatPage from "@/chat/pages/ChatPage.tsx";
import ArticleHomePage from "@/article/pages/ArticleHomePage.tsx";
import ArticleLikePage from "@/article/pages/ArticleLikePage.tsx";
import ArticleAddPage from "@/article/pages/ArticleAddPage.tsx";
import LoginPage from "@/user/pages/LoginPage.tsx";
import SignupPage from "@/user/pages/SignupPage.tsx";
import ArticleSearchPage from "@/article/pages/ArticleSearchPage.tsx";
import ChatDetailPage from "@/chat/pages/ChatDetailPage.tsx";
import MyArticlePage from "@/article/pages/MyArticlePage.tsx";
import OtherUserArticlePage from "@/article/pages/OtherUserArticlePage.tsx";


const router = createBrowserRouter([
  {path: "/", element: <RootLayout/>, children: [

      {path: "", element: <BottomNavigationLayout/>, children: [
          {path: "", element: <ArticleHomePage />},
          {path: "like", element: <ArticleLikePage />},
          {path: "chat", element: <ChatPage/>},
          {path: "my", element: <MyPage/>},
        ]
      },
      {path: "add", element: <ArticleAddPage/>},
      {path: "search", element: <ArticleSearchPage />},
      {path: "chat/:roomId", element: <ChatDetailPage/>},

      {path: "my-article", element: <MyArticlePage/>},
      {path: "user-article/:userId", element: <OtherUserArticlePage/>},

      {path: "login", element: <LoginPage/>},
      {path: "signup", element: <SignupPage />}
    ]
  },
]);


export default function Router() {
  return (
    <RouterProvider router={router}/>
  );
}