import { useEffect } from "react";
import User from "../types/User";
import { jwtDecode } from "jwt-decode";
import useAuthStore from "../stores/zustand/AuthStore";
import { useNavigate } from "react-router-dom";

export const checkTokenPayload = async (updateUser: Function, navigate: Function, user: User | null) => {

    const token = localStorage.getItem("token");
    if (!token) {
        localStorage.removeItem("token");
        updateUser(null);
        //navigate("/");
        return;
    }

    try {
        const res = await fetch(import.meta.env.VITE_BACKEND_URL + 'auth/token/check', {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!res.ok) {
            throw new Error("Token non valido");
        }

        if (!user) {
            const userFromToken = jwtDecode<User>(token);
            updateUser(userFromToken);
        }
    } catch (error) {
        //console.error("Errore durante la verifica del token:", error);
        localStorage.removeItem("token");
        updateUser(null);
        //navigate("/");
    }
};

const useTokenPayload = () => {
    const { user, updateUser } = useAuthStore();
    const navigate = useNavigate();

    useEffect(() => {
        checkTokenPayload(updateUser, navigate, user);
    }, [user]);
};

export default useTokenPayload;
