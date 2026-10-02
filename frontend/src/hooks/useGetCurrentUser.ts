import api from "@/utils/axios"
import { useEffect } from "react"

export const getCurrentUser = async () => {
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await api.get("/api/me");
                if (response.data.success){
                    return;
                }
                console.log(response.data);
            } catch (error) {
                console.log(error)
            }
        }
        fetchUser();
    }, [])
}