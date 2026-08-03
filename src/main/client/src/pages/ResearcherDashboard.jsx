import './home.css';
import { useAuth } from '../context/AuthContext';

function ResearcherDashboard({ onProjectsClick, onSequenceClick, onStorageClick, onLogout, onSequenceTypeClick }) {
    const { user } = useAuth();

    return (
        <section className="home">
            <header className="home__topbar">
                <div>
                    <p className="home__brand">BioVault</p>
                    <span className="home__brand-copy">Researcher Dashboard{user?.name ? ` — ${user.name}` : ''}</span>
                </div>

                <div className="home__nav-actions">
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
                    <p className="home__eyebrow">Welcome back</p>
                    <h1>Manage your research projects, samples, and sequences.</h1>
                    <p className="home__lead">
                        Use the shortcuts above to jump into your active work.
                    </p>
                </div>
            </div>
        </section>
    );
}

export default ResearcherDashboard;
