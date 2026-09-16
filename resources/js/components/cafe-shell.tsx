import { Coffee, LayoutGrid, LogOut, Plus, RadioTower } from 'lucide-react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';

interface CafeShellProps {
    onLogout: () => void;
}

export function CafeShell({ onLogout }: CafeShellProps) {
    const location = useLocation();
    const navigate = useNavigate();

    function handleLogout() {
        onLogout();
        navigate('/login', { replace: true });
    }

    return (
        <div className="app-frame">
            <aside className="sidebar">
                <div className="brand-lockup">
                    <div className="brand-mark">
                        <Coffee size={19} strokeWidth={2.5} />
                    </div>
                    <div>
                        <p className="brand-name">Deskline</p>
                        <p className="brand-caption">Cafe operations</p>
                    </div>
                </div>

                <div className="sidebar-rule" />
                <p className="nav-label">Workspace</p>
                <nav className="primary-nav" aria-label="Primary navigation">
                    <NavLink to="/stations" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                        <LayoutGrid size={18} />
                        <span>Stations</span>
                    </NavLink>
                    <NavLink to="/add-station" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                        <Plus size={18} />
                        <span>Add station</span>
                    </NavLink>
                </nav>

                <div className="sidebar-footer">
                    <div className="operator-card">
                        <div className="operator-avatar">CA</div>
                        <div>
                            <p className="operator-name">Cafe admin</p>
                            <p className="operator-status">
                                <span /> Online
                            </p>
                        </div>
                    </div>
                    <button className="logout-button" type="button" onClick={handleLogout}>
                        <LogOut size={16} />
                        Sign out
                    </button>
                </div>
            </aside>

            <main className="main-area">
                <header className="topbar">
                    <div className="breadcrumb">
                        <RadioTower size={15} />
                        <span>Station desk</span>
                        <span className="breadcrumb-slash">/</span>
                        <span className="breadcrumb-current">
                            {location.pathname === '/add-station'
                                ? 'Add station'
                                : location.pathname.startsWith('/stations/')
                                  ? 'Station details'
                                  : 'Overview'}
                        </span>
                    </div>
                    <div className="topbar-time">
                        Open shift <strong>08:00 - 22:00</strong>
                    </div>
                </header>
                <div className="page-content">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
