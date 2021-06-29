import { FC,ReactElement } from "react";
import { Route, Redirect, useHistory } from "react-router-dom";



const PrivateRoute:FC = ({children, ...props}):ReactElement=>{
    const history = useHistory();

    return(
        <Route {...props}>
            {children}
        </Route>
    )

}