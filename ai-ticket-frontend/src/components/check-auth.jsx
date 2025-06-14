import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

function CheckAuth({children, protectedRoute}) {
    const navigate = useNavigate();
    const [isAllowed, setIsAllowed] = useState(null); // null = loading

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (protectedRoute) {
            if (!token) {
                navigate("/login");
            } else {
                setIsAllowed(true);
            }
        } else {
            if (token) {
                navigate("/");
            } else {
                setIsAllowed(true);
            }
        }
    }, [navigate, protectedRoute]);

    if (isAllowed === null) {
        return <div>Loading...</div>; // prevent rendering children before check
    }

    return children;
}

export default CheckAuth;
