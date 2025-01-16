import { useEffect } from "react";
import User from "../types/User";
import { jwtDecode } from "jwt-decode";
import useAuthStore from "../stores/zustand/AuthStore";
import { useNavigate } from "react-router-dom";

const useTokenPayload = () => {
    const { user, updateUser } = useAuthStore();
    const navigate = useNavigate();

    useEffect(() => {
        const checkToken = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                localStorage.removeItem("token");
                updateUser(null);
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
                    const newUser = jwtDecode<User>(token);
                    updateUser(newUser);
                }

            } catch (error) {
                console.error("Errore durante la verifica del token:", error, token);
                localStorage.removeItem("token");
                updateUser(null);
            }
        };


        const timeoutId = setTimeout(() => {
            checkToken();
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [user, navigate]);

};

export default useTokenPayload;
