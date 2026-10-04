import type { IUser } from "@/App";
import type { AppDispatch } from "@/redux/store";
import api from "@/utils/axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUser,setLoading } from "@/redux/userSlice";
export interface User {
    userId: string;
    name: string;
    email: string;
    role: string;
}

export const useGetCurrentUser = () => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [userLoading, setUserLoading] = useState<boolean>(true);

    const dispatch=useDispatch<AppDispatch>();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await api.get("/api/me");
                if (response.data.success) {
                    setUser(response.data.user);
                }

                const user:IUser=response.data.user;
                dispatch(setUser(user));
                dispatch(setLoading(false));
            } catch (error: any) {
                // 401 is expected when not logged in
                if (error.response?.status !== 401) {
                    console.error("Error fetching current user:", error);
                }
                setCurrentUser(null);
                dispatch(setLoading(false));
            } 
        };

        fetchUser();
    }, []);

    return { currentUser, userLoading };
};
