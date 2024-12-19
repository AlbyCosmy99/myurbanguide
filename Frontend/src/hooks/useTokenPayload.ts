import { useEffect } from "react";
import User from "../types/User";
import { jwtDecode } from "jwt-decode"; // Correggi l'importazione
import useAuthStore from "../stores/zustand/AuthStore";
import { useNavigate } from "react-router-dom";

const useTokenPayload = () => {
    const { updateUser } = useAuthStore();
    const navigate = useNavigate();

    useEffect(() => {
        const checkToken = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                // Nessun token, reset e redirect
                localStorage.removeItem("token");
                updateUser(null);
                navigate("/");
                return;
            }

            try {
                const res = await fetch("http://localhost:3030/users/token/check", {
                    mode: 'no-cors',
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!res.ok) {
                    throw new Error("Token non valido");
                }

                const user = jwtDecode<User>(token);
                updateUser(user);
            } catch (error) {
                console.error("Errore durante la verifica del token:", error);
                localStorage.removeItem("token");
                updateUser(null);
                navigate("/");
            }
        };

        checkToken();
    }, [navigate, updateUser]);
};

export default useTokenPayload;
