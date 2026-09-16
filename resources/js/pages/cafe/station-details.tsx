import { ApiError, getStation } from '@/lib/stations-api';
import type { Station } from '@/types/station';
import { ArrowLeft, CalendarDays, CircleAlert, Laptop, Tag, Wallet } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function StationDetailsPage() {
    const { id = '' } = useParams();
    const [station, setStation] = useState<Station | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        async function loadStation() {
            setLoading(true);
            try {
                setStation(await getStation(id));
            } catch (requestError) {
                setError(
                    requestError instanceof ApiError && requestError.status === 404
                        ? 'This station record could not be found.'
                        : 'Unable to load this station. Please check the connection and try again.',
                );
            } finally {
                setLoading(false);
            }
        }
        void loadStation();
    }, [id]);

    if (loading)
        return (
            <section className="content-page">
                <Link className="back-link" to="/stations">
                    <ArrowLeft size={16} /> Back to stations
                </Link>
                <div className="state-panel detail-loading">
                    <div className="spinner" />
                    <p>Loading station details...</p>
                </div>
            </section>
        );
    if (error || !station)
        return (
            <section className="content-page">
                <Link className="back-link" to="/stations">
                    <ArrowLeft size={16} /> Back to stations
                </Link>
                <div className="state-panel error-state">
                    <div className="state-icon">
                        <CircleAlert size={20} />
                    </div>
                    <h2>Station unavailable</h2>
                    <p>{error}</p>
                    <Link className="secondary-button" to="/stations">
                        Return to station list
                    </Link>
                </div>
            </section>
        );

    return (
        <section className="content-page narrow-page">
            <Link className="back-link" to="/stations">
                <ArrowLeft size={16} /> Back to stations
            </Link>
            <div className="detail-hero">
                <div className="detail-icon">
                    <Laptop size={31} />
                </div>
                <div>
                    <p className="eyebrow">Station record #{station.id.toString().padStart(2, '0')}</p>
                    <h1>{station.station_name}</h1>
                    <span className={`category-badge category-${station.category.toLowerCase().replace(' ', '-')}`}>{station.category}</span>
                </div>
            </div>
            <div className="detail-panel">
                <div className="detail-panel-heading">
                    <div>
                        <p className="eyebrow">Station information</p>
                        <h2>Record overview</h2>
                    </div>
                    <span className="record-status">
                        <span /> Registered
                    </span>
                </div>
                <dl className="detail-list">
                    <div>
                        <dt>
                            <Laptop size={16} /> Station name / PC number
                        </dt>
                        <dd>{station.station_name}</dd>
                    </div>
                    <div>
                        <dt>
                            <Tag size={16} /> Tier / category
                        </dt>
                        <dd>{station.category}</dd>
                    </div>
                    <div>
                        <dt>
                            <Wallet size={16} /> Hourly rate
                        </dt>
                        <dd>
                            ₱{Number(station.hourly_rate).toFixed(2)} <small>per hour</small>
                        </dd>
                    </div>
                    <div>
                        <dt>
                            <CalendarDays size={16} /> Added to catalog
                        </dt>
                        <dd>{new Date(station.created_at).toLocaleDateString('en-PH', { month: 'long', day: 'numeric', year: 'numeric' })}</dd>
                    </div>
                </dl>
            </div>
        </section>
    );
}
