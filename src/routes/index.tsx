import {lazy} from 'react'
import { Route } from 'react-router-dom';

const routes = [
    {
        path:'',
        element:lazy(() => import('./../templates/UserTemplate')),
        nested: [
            {
                path:'/',
                element:lazy(() => import('./../pages/Home/Home')),
            },
            {
                path:'/genres',
                element:lazy(() => import('./../pages/GenresComic/Genres')),
            },
            {
                path:'/new',
                element:lazy(() => import('./../pages/NewComic/NewComic')),
            },
            {
                path:'/top',
                element:lazy(() => import('./../pages/TopComic/TopComic')),
            },
            {
                path:'/search',
                element:lazy(() => import('./../pages/SearchComic/SearchComic')),
            },
            {
                path:'/detail/:comicId',
                element:lazy(() => import('./../pages/Detail/Detail')),
            },
            {
                path:'/comic/:comicId/:chapterId',
                element:lazy(() => import('./../pages/Comic/Comic')),
            },
        ]
    }
];


export const renderRoutes = () => {
    return routes.map((route) => {
        if(!route.nested) {
            return (
                <Route key={route.path} path={route.path} element={<route.element/>}/>
            )
        } else {
            return (
                <Route key={route.path} path={route.path} element={<route.element/>}>
                    {route.nested.map((item) => (
                        <Route 
                            key={item.path} 
                            path={item.path} 
                            element={<item.element />}
                        />
                    ))}
                </Route>
            )
        }
    })
}