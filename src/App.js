import { Home } from "./Pages/Home";
import { Feature } from "./Pages/Feature";
import { Courses } from "./Pages/Courses";
import { Books } from "./Pages/Books";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import { AppLayout } from "./AppLayout/AppLayout";
import { ErrorPage } from "./Pages/ErrorPage";
import { Hadith } from "./Pages/Hadith";
import {Admin} from "./Pages/Admin";
import { AdminDashboard } from "./Pages/Dashboard/AdminDashboard";
import { ProtectedRoute } from "./Components/ProtectedRoute";
import { Chapter } from "./Pages/Chapter";
const router = createBrowserRouter([
    {
path:"/",
element:<AppLayout/>, 
errorElement:<ErrorPage/>,
children:[
{
path:"/",
element:<Home/> 
},
{
path:"/books/hadith",
element:<Hadith/> 
},
{
path:"feature",
element:<Feature/> 
},
{
path:"books",
element:<Books/> 
},
{
path:"course",
element:<Courses />
},
{
  path:"admin",
  element:<Admin/>
},
{
  path:"admin/dashboard",
  element:(
        <ProtectedRoute>
            <AdminDashboard/>
        </ProtectedRoute>
  )
},
{
  path:"books/:bookId/chapters",
  element:<Chapter/>
},
{
  path:"books/:bookId/chapters/:chapterId/hadiths",
  element:<Hadith/>
}
]
    }
]);
function App() {
  return (
    
    <RouterProvider router={router}></RouterProvider>
  );
}

export default App;
