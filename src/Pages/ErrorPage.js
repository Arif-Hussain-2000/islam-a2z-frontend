import { NavLink, useRouteError } from "react-router-dom";


export const ErrorPage = ()=>{
    const error = useRouteError();
    return<div>
<h1>Error 404</h1>
{error && error.data}
<NavLink>Go Home</NavLink>
    </div>
};