import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from '../auth/pages/LoginPage';
import { useAuthStore } from '../hooks/useAuthStore';
import { TutorialesPage } from '../tutoriales/pages/TutorialesPage';
import { UserPage } from '../tutoriales/pages/UserPage';
import { VideosPage } from '../tutoriales/pages/VideosPage';

export const AppRouter = () => {

  // const authStatus = 'not-authenticated';

  const { checkAuthToken, status } = useAuthStore();

  useEffect(() => {
    checkAuthToken();
  }, []);

  if (status === 'checking') {
    return (
      <h3>Cargando...</h3>
    )
  }

  return (
    <Routes>
      {
        (status === 'not-authenticated') ?
          (
            <>
              <Route path='/auth/*' element={<LoginPage />} />
              <Route path='/*' element={<Navigate to="/auth/login" />} />
            </>
          ) :
          (
            <>
              <Route path='/' element={<TutorialesPage />} />
              <Route path="video/:id" element={<VideosPage/>}/>
              <Route path="user" element={<UserPage/>}/>
              <Route path='/*' element={<Navigate to="/" />} />
            </>
          )
      }
    </Routes>
  )
}
