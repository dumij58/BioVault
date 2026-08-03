import './home.css';
import { useAuth } from '../context/AuthContext';

function AdminDashboard({ onInstitutionsClick, onProjectsClick, onSequenceClick, onStorageClick, onLogout,onSequenceTypeClick }) {
    const { user } = useAuth();

    return (
        <section className="home">
            <header className="home__topbar">
                <div>
                    <p className="home__brand">BioVault</p>
                    <span className="home__brand-copy">Admin Dashboard{user?.name ? ` — ${user.name}` : ''}</span>
                </div>

                <div className="home__nav-actions">
                    <button type="button" className="home__ghost-button" onClick={onInstitutionsClick}>Institutions</button>
                    <button type="button" className="home__ghost-button" onClick={onProjectsClick}>Research Projects</button>
                    <button type="button" className="home__ghost-button" onClick={onSequenceClick}>Sequence Console</button>
                    <button type="button" className="home__ghost-button" onClick={onStorageClick}>Storage Locations</button>
                    <button type="button" className="home__ghost-button" onClick={onSequenceTypeClick}>Sequence Types</button>
                </div>
                <div className="home__nav-actions">
                    <button type="button" className="home__primary-button" onClick={onLogout}>Logout</button>
                </div>
            </header>

            <div className="home__hero">
                <div className="home__hero-copy">
                    <p className="home__eyebrow">Administration</p>
                    <h1>Oversee institutions and repository-wide research data.</h1>
                    <p className="home__lead">
                        Use the shortcuts above to manage the repository.
                    </p>
                </div>
            </div>
        </section>
    );
}

export default AdminDashboard;
