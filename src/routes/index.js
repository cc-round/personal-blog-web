import { Navigate } from "react-router-dom";
import SearchList from "../components/SearchList";
import Success from "../components/Success";
import Article from "../contains/Article";
import Home from "../contains/Home";
import Tech from "../contains/Tech";
import Write from "../contains/Write";
import BackStage from "../contains/BackStage";
import ManageTable from "../components/ManageTable";
import Blog from "../contains/Blog";
import AutoRouter from "../components/AutoRouter";
import CategoryList from "../contains/CategoryList";
import Life from "../contains/Life";

let list = [
    {
        path: '/blog',
        element: <Blog />,
        children: [
            {
                path: 'home',
                element: <Home />
            }, {
                path: 'tech',
                element: <Tech />,
            }, {
                path: 'life',
                element: <Life />
            }, {
                path: 'about',
                element: <Home />
            }, {
                path: 'categoryList/:name',
                element: <CategoryList />
            }, {
                path: 'write',
                element: <AutoRouter><Write /></AutoRouter>
            }, {
                path: 'write/success',
                element: <Success />
            }, {
                path: 'article/:id',
                element: <Article />
            }, {
                path: 'update',
                element: <AutoRouter><Write /></AutoRouter>
            }, {
                path: 'search/result/:key',
                element: <SearchList />
            }
        ]
    }, {
        path: '/backstage',
        element: <AutoRouter><BackStage /></AutoRouter>,
        children: [
            {
                path: 'techList',
                element: <ManageTable />
            }, {
                path: 'techDrafts',
                element: <ManageTable />
            }, {
                path: 'tipsList',
                element: <ManageTable />
            }, {
                path: 'tipsDrafts',
                element: <ManageTable />
            }, {
                path: '',
                element: <Navigate to="/backstage/techList" />
            }
        ]
    }, {
        path: '/',
        element: <Navigate to="/blog/home" />
    }
]
export default list