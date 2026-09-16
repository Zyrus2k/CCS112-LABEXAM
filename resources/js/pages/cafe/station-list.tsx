import { ApiError, getStations } from '@/lib/stations-api';
import type { Station } from '@/types/station';
import { ArrowUpRight, Laptop, Plus, RefreshCw } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function CategoryBadge({ category }: { category: Station['category'] }) {
    return <span className={`category-badge category-${category.toLowerCase().replace(' ', '-')}`}>{category}</span>;
}

function LoadingState() {
    return (
        <div className="state-panel">
            <div className="spinner" />
            <p>Loading station records...</p>
            <span>Connecting to the café database</span>
        </div>
    );
}

export default function StationListPage() {
    const [stations, setStations] = useState<Station[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    async function loadStations() {
        setLoading(true);
        setError('');
        try {
            setStations(await getStations());
        } catch (requestError) {
            setError(requestError instanceof ApiError ? requestError.message : 'Unable to load station records.');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        void loadStations();
    }, []);

    return (
        <section className="content-page">
            <div className="page-heading-row">
                <div>
                    <p className="eyebrow">Station register</p>
                    <h1>Computer stations</h1>
                    <p className="page-subtitle">Keep track of every workstation available on the café floor.</p>
                </div>
                <Link className="secondary-button heading-action" to="/add-station">
                    <Plus size={17} /> Add station
                </Link>
            </div>

            <div className="register-summary">
                <div>
                    <span className="summary-label">Registered stations</span>
                    <strong>{loading ? '—' : stations.length.toString().padStart(2, '0')}</strong>
                </div>
                <span className="summary-detail">
                    {stations.length === 1 ? '1 workstation in the catalog' : `${stations.length} workstations in the catalog`}
                </span>
            </div>

            {loading && <LoadingState />}
            {!loading && error && (
                <div className="state-panel error-state">
                    <div className="state-icon">!</div>
                    <h2>Station records unavailable</h2>
                    <p>
                        {error === 'Unable to connect to the station service.'
                            ? 'Unable to load station records. Please check the connection to the server and try again.'
                            : error}
                    </p>
                    <button className="secondary-button" type="button" onClick={() => void loadStations()}>
                        <RefreshCw size={16} /> Retry connection
                    </button>
                </div>
            )}
            {!loading && !error && stations.length === 0 && (
                <div className="state-panel empty-state">
                    <div className="empty-icon">
                        <Laptop size={22} />
                    </div>
                    <h2>No stations registered yet</h2>
                    <p>Start the catalog by adding the first computer workstation.</p>
                    <Link className="primary-button" to="/add-station">
                        <Plus size={17} /> Add first station
                    </Link>
                </div>
            )}
            {!loading && !error && stations.length > 0 && (
                <div className="station-grid">
                    {stations.map((station) => (
                        <article className="station-card" key={station.id}>
                            <div className="station-card-top">
                                <div className="station-icon">
                                    <Laptop size={21} />
                                </div>
                                <CategoryBadge category={station.category} />
                            </div>
                            <div className="station-card-info">
                                <p className="station-number">{station.station_name}</p>
                                <p className="station-type">
                                    Workstation <span>·</span> #{station.id.toString().padStart(2, '0')}
                                </p>
                            </div>
                            <div className="station-card-bottom">
                                <div>
                                    <span className="rate-label">Hourly rate</span>
                                    <strong>
                                        ₱{Number(station.hourly_rate).toFixed(2)} <small>/ hr</small>
                                    </strong>
                                </div>
                                <Link className="details-link" to={`/stations/${station.id}`}>
                                    View details <ArrowUpRight size={15} />
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            )}
            <Link className="floating-action" to="/add-station" aria-label="Add a new station" title="Add a new station">
                <Plus size={23} />
            </Link>
        </section>
    );
}
