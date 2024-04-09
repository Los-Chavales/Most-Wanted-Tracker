import { createContext, useContext, useState, useEffect } from "react";
import { API_SERVER } from "../utils/api/conexion_server.js";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth no está dentro de un AuthProvider");
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [report, setReport] = useState(null);
    const [isAuth, setIsAuth] = useState(false);
    const [mensage, setMensage] = useState(false);
    const [errorsServer, setErrorsServer] = useState([]);
    const [loading, setLoading] = useState(true);

    //Limpiar errores en el formulario de login
    useEffect(() => {
        if (errorsServer.length > 0) {
            const timer = setTimeout(() => {
                setErrorsServer([]);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [errorsServer]);

    //Registar usuarios
    async function signup(dataForm) {
        //console.log(dataForm)
        try {
            const RESPONSE = await API_SERVER.post("/register", dataForm);

            //console.debug(RESPONSE);

            if (RESPONSE.status != 200) {
                return console.log(RESPONSE.response.data);
            }

            //console.log(RESPONSE.data);
            setUser(RESPONSE.data)
            setIsAuth(true)

        } catch (error) {
            let menError = error.message;
            if (error.response) menError = error.response.data.message;
            console.error('Error al registar usuario:', menError);
            setErrorsServer([menError]);
            return error;
        }


    }
    //Iniciar sesión
    async function signin(dataForm) {
        //console.log(dataForm)
        try {
            const RESPONSE = await API_SERVER.post("/login", dataForm);
            if (RESPONSE.status != 200) {
                return console.warn(RESPONSE.response.data);
            }
            //console.log(RESPONSE.data);
            setUser(RESPONSE.data)
            setIsAuth(true)

        } catch (error) {
            let menError = error.message;
            if (error.response) menError = error.response.data.message;
            console.error('Error al iniciar sesión:', menError);
            setErrorsServer([menError]);
            return error;
        }


    }
    //Cerrar sesión
    const logout = () => {
        Cookies.remove("token");
        setUser(null);
        setIsAuth(false);
    };

    //Para validar la cookie del token
    useEffect(() => {
        const checkLogin = async () => {
            const cookies = Cookies.get();
            //console.log(cookies);
            //console.log(cookies.token);
            if (!cookies.token) {
                setIsAuth(false);
                setUser(null);
                setLoading(false);
                return;
            }

            try {
                const RESPONSE = await API_SERVER.get("/verify", cookies.token);
                if (RESPONSE.status != 200 || !RESPONSE.data) {
                    console.warn(RESPONSE.response.data);
                    setIsAuth(false);
                    return setLoading(false);
                }
                //console.log(RESPONSE.data);
                setUser(RESPONSE.data)
                setIsAuth(true)
                setLoading(false);
            } catch (error) {
                let menError = error.message;
                if (error.response) menError = error.response.data.message;
                if (!error.response.data.message) menError = error;
                console.error('Error al validar token:', menError);
                setIsAuth(false);
                setLoading(false);
                return;
            }

        }
        checkLogin();
    }, []);

    async function register_report(dataForm) {
        console.log(dataForm)
        try {
            const RESPONSE = await API_SERVER.post("/report/", dataForm);

            //console.debug(RESPONSE);

            if (RESPONSE.status != 200) {
                return console.log(RESPONSE.response.data);
            }

            console.log(RESPONSE.data);
            setReport(RESPONSE.data)
            setMensage(true)

        } catch (error) {
            let menError = error.message;
            if (error.response) menError = error.response.data.message;
            console.error('Error al registar reporte:');
            console.error(menError);
            setErrorsServer([menError]);
            return error;
        }


    }

    return (
        <AuthContext.Provider
            value={{
                user,
                report,
                signup,
                signin,
                logout,
                register_report,
                isAuth,
                loading,
                mensage,
                errorsServer,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;