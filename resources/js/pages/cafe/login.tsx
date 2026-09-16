import { ArrowRight, CheckCircle2, Coffee, LockKeyhole, Monitor, UserRound } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

interface LoginPageProps {
    isAuthenticated: boolean;
    onLogin: (username: string, password: string) => boolean;
}

export default function LoginPage({ isAuthenticated, onLogin }: LoginPageProps) {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    if (isAuthenticated) {
        return <Navigate to="/stations" replace />;
    }

    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError('');

        if (onLogin(username.trim(), password)) {
            navigate('/stations', { replace: true });
            return;
        }

        setError('Invalid username or password. Please check your credentials and try again.');
    }

    return (
        <main className="login-page">
            <section className="login-intro">
                <div className="login-intro-inner">
                    <div className="brand-lockup login-brand">
                        <div className="brand-mark">
                            <Coffee size={21} strokeWidth={2.5} />
                        </div>
                        <div>
                            <p className="brand-name">Deskline</p>
                            <p className="brand-caption">Cafe operations</p>
                        </div>
                    </div>
                    <div className="intro-copy">
                        <p className="eyebrow">
                            <span className="eyebrow-dot" /> Computer cafe station management
                        </p>
                        <h1>
                            Keep every seat
                            <br />
                            <em>ready to serve.</em>
                        </h1>
                        <p className="intro-description">
                            A focused station register for the people who keep your café moving, one workstation at a time.
                        </p>
                    </div>
                    <div className="station-illustration" aria-hidden="true">
                        <div className="grid-lines" />
                        <div className="monitor monitor-back">
                            <div />
                        </div>
                        <div className="monitor monitor-front">
                            <div className="screen-glow">
                                <Monitor size={54} strokeWidth={1.2} />
                            </div>
                            <div className="monitor-stand" />
                        </div>
                        <div className="desk-line" />
                        <div className="status-chip">
                            <CheckCircle2 size={15} />
                            <span>Station desk online</span>
                        </div>
                    </div>
                    <p className="login-footnote">Internal tool · Station catalog</p>
                </div>
            </section>

            <section className="login-panel">
                <div className="login-form-wrap">
                    <div className="mobile-brand">
                        <Coffee size={18} /> Deskline
                    </div>
                    <div className="form-heading">
                        <p className="eyebrow">Staff access</p>
                        <h2>Welcome back.</h2>
                        <p>Sign in to manage the café station catalog.</p>
                    </div>
                    <form className="login-form" onSubmit={submit} noValidate>
                        {error && (
                            <div className="form-alert" role="alert">
                                <span className="alert-mark">!</span>
                                {error}
                            </div>
                        )}
                        <label className="field-label" htmlFor="username">
                            Username
                        </label>
                        <div className="input-wrap">
                            <UserRound size={17} />
                            <input
                                id="username"
                                name="username"
                                autoComplete="username"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                                placeholder="Enter your username"
                            />
                        </div>
                        <label className="field-label" htmlFor="password">
                            Password
                        </label>
                        <div className="input-wrap">
                            <LockKeyhole size={17} />
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                placeholder="Enter your password"
                            />
                        </div>
                        <button className="primary-button login-submit" type="submit">
                            Sign in <ArrowRight size={17} />
                        </button>
                    </form>
                    <p className="login-note">Authorized café staff only. Station data is saved to the café database.</p>
                </div>
            </section>
        </main>
    );
}
