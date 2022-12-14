import {useDispatch, useSelector} from 'react-redux';
import videosApi from '../api/videosApi';
import { clearErrorMessages, onChecking, onLogin, onLogout } from '../store/auth/authSlice';

export const useAuthStore = () => {

    const {status, user, errorMessage} = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const startLogin = async({email, contraseña}) => {
        dispatch(onChecking());
        try {
            const {data} = await videosApi.post('/auth', {email, contraseña});
            
            localStorage.setItem('token', data.token);
            dispatch(onLogin({nombre: data.nombre, uid: data.uid}));

        } catch (error) {
            dispatch(onLogout('Credenciales incorrectas'));
            setTimeout(() => {
                dispatch(clearErrorMessages());
            }, 100);
        }
    }

    const startRegister = async({email, contraseña, nombre}) => {
        dispatch(onChecking());
        try {
            const {data} = await videosApi.post('/auth/new', {email, contraseña, nombre});
            
            localStorage.setItem('token', data.token);
            dispatch(onLogin({nombre: data.nombre, uid: data.uid}));

        } catch (error) {
            dispatch(onLogout(error.response.data?.msg || ''));
            setTimeout(() => {
                dispatch(clearErrorMessages());
            }, 100);
        }
    }

    const checkAuthToken = async() => {
        const  token = localStorage.getItem('token');

        if (!token) return dispatch(onLogout());

        try {
            const {data} = await videosApi.get('auth/renew');
            localStorage.setItem('token', data.token);
            dispatch(onLogin({nombre: data.name, uid: data.uid}));
        } catch (error) {
            dispatch(onLogout());
            localStorage.clear();
        }
    }

    const startLogout = () => {
        localStorage.clear();
        dispatch(onLogout());
    }

    return {
        status,
        user,
        errorMessage,
        startLogin,
        startRegister,
        checkAuthToken,
        startLogout
    }
}