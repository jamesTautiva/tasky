import { Children } from "react";
import { useLocation } from "react-router-dom";

export const PrivateRoute = ({Children}) => {
    const {state} = useLocation();
    

    if (!state?.isAuthenticated) {

        return <Redirect to="/login" />;

    }


    return 
}