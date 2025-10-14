import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
    registerWithEmailPassword,
    signInWithEmailPassword,
    signInWithGoogleAuthProvider,
} from "../services/firebaseAuth";
import { useAuth } from "./useAuth";
export const useAuthForm = (mode) => {
    const [loading, setLoading] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const [error, setError] = useState(null);
    const { setAuthData } = useAuth();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        setLoading(true);
        setError(null);
        try {
            let user;
            if (mode === "signup") {
                const displayName = `${data.firstName ?? ""} ${data.lastName ?? ""}`.trim();
                user = await registerWithEmailPassword(displayName, data.email, data.password);
            } else {
                user = await signInWithEmailPassword(data.email, data.password);
            }
            setAuthData({ user });
            navigate("/dashboard/apply-today-wisdom");
        } catch (error) {
            setError(error?.message || "Failed to authenticate. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setIsGoogleLoading(true);
        setError(null);
        try {
            const user = await signInWithGoogleAuthProvider();
            setAuthData({ user });
            navigate("/dashboard/apply-today-wisdom");
        } catch (error) {
            setError(error.message);
        } finally {
            setIsGoogleLoading(false);
        }
    };

    return {
        loading,
        isGoogleLoading,
        error,
        register,
        handleSubmit,
        watch,
        errors,
        onSubmit,
        handleGoogleSignIn,
    };
};
