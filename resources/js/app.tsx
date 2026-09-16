import '../css/app.css';

import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { CafeShell } from './components/cafe-shell';
import AddStationPage from './pages/cafe/add-station';
import LoginPage from './pages/cafe/login';
import StationDetailsPage from './pages/cafe/station-details';
import StationListPage from './pages/cafe/station-list';

function ProtectedRoutes({ isAuthenticated }: { isAuthenticated: boolean }) {
    if (!isAuthenticated) return <Navigate to="/login" replace />;
    return <Outlet />;
}

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    function login(username: string, password: string) {
        const valid = username === 'cafe_admin' && password === 'pccafe2026';
        if (valid) setIsAuthenticated(true);
        return valid;
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage isAuthenticated={isAuthenticated} onLogin={login} />} />
                <Route element={<ProtectedRoutes isAuthenticated={isAuthenticated} />}>
                    <Route element={<CafeShell onLogout={() => setIsAuthenticated(false)} />}>
                        <Route path="/stations" element={<StationListPage />} />
                        <Route path="/stations/:id" element={<StationDetailsPage />} />
                        <Route path="/add-station" element={<AddStationPage />} />
                        <Route path="/" element={<Navigate to="/stations" replace />} />
                    </Route>
                </Route>
                <Route path="*" element={<Navigate to={isAuthenticated ? '/stations' : '/login'} replace />} />
            </Routes>
        </BrowserRouter>
    );
}

createRoot(document.getElementById('root')!).render(<App />);
