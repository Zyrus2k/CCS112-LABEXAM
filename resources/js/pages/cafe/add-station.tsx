import { ApiError, createStation } from '@/lib/stations-api';
import type { StationCategory, StationInput } from '@/types/station';
import { ArrowLeft, CircleAlert, Laptop, Save } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

type FieldErrors = Partial<Record<keyof StationInput, string>>;
const categories: StationCategory[] = ['Regular', 'VIP', 'Streaming Room'];

function validate(form: StationInput): FieldErrors {
    const errors: FieldErrors = {};
    if (!form.station_name.trim()) errors.station_name = 'Enter a station name or PC number.';
    if (!form.category) errors.category = 'Choose a station category.';
    if (!form.hourly_rate || Number(form.hourly_rate) <= 0) errors.hourly_rate = 'Enter an hourly rate greater than 0.';
    return errors;
}

export default function AddStationPage() {
    const navigate = useNavigate();
    const [form, setForm] = useState<StationInput>({ station_name: '', category: '', hourly_rate: '' });
    const [errors, setErrors] = useState<FieldErrors>({});
    const [submitError, setSubmitError] = useState('');
    const [saving, setSaving] = useState(false);

    function updateField(field: keyof StationInput, value: string) {
        const nextForm = { ...form, [field]: value } as StationInput;
        setForm(nextForm);
        setErrors((current) => ({ ...current, [field]: validate(nextForm)[field] }));
        setSubmitError('');
    }

    async function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const nextErrors = validate(form);
        setErrors(nextErrors);
        if (Object.keys(nextErrors).length > 0) return;

        setSaving(true);
        setSubmitError('');
        try {
            await createStation(form);
            navigate('/stations');
        } catch (requestError) {
            if (requestError instanceof ApiError && requestError.fields) {
                setErrors(Object.fromEntries(Object.entries(requestError.fields).map(([key, value]) => [key, value[0]])) as FieldErrors);
            } else {
                setSubmitError('The station could not be saved. Please check the connection and try again.');
            }
        } finally {
            setSaving(false);
        }
    }

    return (
        <section className="content-page narrow-page">
            <Link className="back-link" to="/stations">
                <ArrowLeft size={16} /> Back to stations
            </Link>
            <div className="page-heading-row form-page-heading">
                <div>
                    <p className="eyebrow">Station register</p>
                    <h1>Add computer station</h1>
                    <p className="page-subtitle">Register a new workstation in the café station catalog.</p>
                </div>
                <div className="form-heading-icon">
                    <Laptop size={23} />
                </div>
            </div>
            <form className="station-form" onSubmit={submit} noValidate>
                {submitError && (
                    <div className="form-alert" role="alert">
                        <CircleAlert size={17} />
                        {submitError}
                    </div>
                )}
                <div className="form-section-label">Station information</div>
                <div className="field-group">
                    <label className="field-label" htmlFor="station_name">
                        Station name / PC number
                    </label>
                    <input
                        className={errors.station_name ? 'invalid' : ''}
                        id="station_name"
                        value={form.station_name}
                        onChange={(event) => updateField('station_name', event.target.value)}
                        onBlur={() => setErrors((current) => ({ ...current, station_name: validate(form).station_name }))}
                        placeholder="e.g. PC-01"
                    />
                    {errors.station_name && <p className="field-error">{errors.station_name}</p>}
                </div>
                <div className="field-group">
                    <label className="field-label" htmlFor="category">
                        Tier / category
                    </label>
                    <select
                        className={errors.category ? 'invalid' : ''}
                        id="category"
                        value={form.category}
                        onChange={(event) => updateField('category', event.target.value)}
                    >
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                    {errors.category && <p className="field-error">{errors.category}</p>}
                </div>
                <div className="field-group">
                    <label className="field-label" htmlFor="hourly_rate">
                        Hourly rate <span className="field-hint">in Philippine pesos</span>
                    </label>
                    <div className="currency-input">
                        <span>₱</span>
                        <input
                            className={errors.hourly_rate ? 'invalid' : ''}
                            id="hourly_rate"
                            type="number"
                            min="0.01"
                            step="0.01"
                            value={form.hourly_rate}
                            onChange={(event) => updateField('hourly_rate', event.target.value)}
                            onBlur={() => setErrors((current) => ({ ...current, hourly_rate: validate(form).hourly_rate }))}
                            placeholder="25.00"
                        />
                    </div>
                    {errors.hourly_rate && <p className="field-error">{errors.hourly_rate}</p>}
                </div>
                <div className="form-actions">
                    <Link className="secondary-button" to="/stations">
                        Cancel
                    </Link>
                    <button className="primary-button" type="submit" disabled={saving}>
                        {saving ? (
                            <>
                                <span className="button-spinner" />
                                Saving station...
                            </>
                        ) : (
                            <>
                                <Save size={17} /> Add station
                            </>
                        )}
                    </button>
                </div>
            </form>
        </section>
    );
}
