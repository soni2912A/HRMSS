// import { createContext, useContext, useState } from "react";
// import { authAPI } from "../services/api";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//     const [isLoggedIn, setIsLoggedIn] = useState(
//         localStorage.getItem("isLoggedIn") === "true"
//     );
//     const [loginType, setLoginType] = useState(
//         localStorage.getItem("loginType") || null
//     );
//     const [user, setUser] = useState(
//         JSON.parse(localStorage.getItem("user") || "null")
//     );
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     // Called from Login page — hits real API
//     const login = async (email, password, role) => {
//         setLoading(true);
//         setError(null);
//         try {
//             const res = await authAPI.login({ email, password, role });
//             localStorage.setItem("isLoggedIn", "true");
//             localStorage.setItem("loginType", res.user.role);
//             localStorage.setItem("token", res.token);
//             localStorage.setItem("user", JSON.stringify(res.user));
//             setIsLoggedIn(true);
//             setLoginType(res.user.role);
//             setUser(res.user);
//             return { success: true, role: res.user.role };
//         } catch (err) {
//             setError(err.message);
//             return { success: false, message: err.message };
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Called from Register page
//     const register = async (name, email, password) => {
//         setLoading(true);
//         setError(null);
//         try {
//             const res = await authAPI.register({ name, email, password, role: "user" });
//             return { success: true, message: res.message };
//         } catch (err) {
//             setError(err.message);
//             return { success: false, message: err.message };
//         } finally {
//             setLoading(false);
//         }
//     };

//     const logout = () => {
//         localStorage.clear();
//         setIsLoggedIn(false);
//         setLoginType(null);
//         setUser(null);
//     };

//     return (
//         <AuthContext.Provider
//             value={{ isLoggedIn, loginType, user, loading, error, login, register, logout }}
//         >
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export const useAuth = () => useContext(AuthContext);





import { createContext, useContext, useState } from "react";
import { authAPI } from "../services/api";

const AuthContext = createContext();

// ── Synchronously read auth state from localStorage ──────────────────────────
// Ye function component mount se PEHLE run hota hai — koi bhi useEffect nahi
const readAuth = () => {
    try {
        const token = localStorage.getItem("token");
        const loggedIn = localStorage.getItem("isLoggedIn") === "true";
        const loginType = localStorage.getItem("loginType");
        const user = JSON.parse(localStorage.getItem("user") || "null");

        // Sab fields present hain tabhi logged in maano
        if (token && loggedIn && loginType && user) {
            return { isLoggedIn: true, loginType, user };
        }
    } catch (_) { }
    // Kuch bhi missing → clear and treat as logged out
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("loginType");
    localStorage.removeItem("user");
    return { isLoggedIn: false, loginType: null, user: null };
};

export const AuthProvider = ({ children }) => {
    // Synchronous init — NO useEffect needed, NO initializing state needed
    const init = readAuth();
    const [isLoggedIn, setIsLoggedIn] = useState(init.isLoggedIn);
    const [loginType, setLoginType] = useState(init.loginType);
    const [user, setUser] = useState(init.user);
    const [loading, setLoading] = useState(false);

    const login = async (email, password, role) => {
        setLoading(true);
        try {
            const res = await authAPI.login({ email, password, role });
            // Persist
            localStorage.setItem("token", res.token);
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("loginType", res.user.role);
            localStorage.setItem("user", JSON.stringify(res.user));
            // Update state
            setIsLoggedIn(true);
            setLoginType(res.user.role);
            setUser(res.user);
            return { success: true, role: res.user.role };
        } catch (err) {
            return { success: false, message: err.message };
        } finally {
            setLoading(false);
        }
    };

    const register = async (data) => {
        setLoading(true);
        try {
            const res = await authAPI.register(data);
            return { success: true, data: res };
        } catch (err) {
            return { success: false, message: err.message };
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("loginType");
        localStorage.removeItem("user");
        setIsLoggedIn(false);
        setLoginType(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, loginType, user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);