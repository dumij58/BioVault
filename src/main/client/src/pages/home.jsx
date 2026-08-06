import './home.css';

function Home({ onLoginClick, onRegisterClick }) {
  return (
    <section className="home">
      <header className="home__topbar">
        <div className="home__brand-group">
          <h2 className="home__brand">BioVault</h2>
          <span className="home__brand-copy">Research Sample and Biological Sequence Repository.</span>
        </div>
        <div className="home__nav-actions">
          <button type="button" className="home__ghost-button" onClick={onLoginClick}>Login</button>
          <button type="button" className="home__primary-button" onClick={onRegisterClick}>Register</button>
        </div>
      </header>

      <div className="home__hero">
        <div className="home__hero-copy">
          <p className="home__eyebrow">Centralized Biological Data Management</p>
          <h1>Organize research projects, laboratory samples, and biological sequences in one secure repository.</h1>
          <p className="home__lead">
            Manage collaborating institutions, tracking details for DNA, RNA, or protein samples, and secure storage mappings from a clean interface built for biological research workflows.
          </p>

          <div className="home__cta-row">
            <button type="button" className="home__primary-button" onClick={onLoginClick}>Login</button>
            <button type="button" className="home__ghost-button" onClick={onRegisterClick}>Register</button>
          </div>

          <div className="home__stats">
            <article>
              <strong>Modules</strong>
              <span>for comprehensive data mapping</span>
            </article>
            <article>
              <strong>Relational Tracking</strong>
              <span>from projects down to sequences</span>
            </article>
            <article>
              <strong>Pre-computational Focus</strong>
              <span>built for clean laboratory data organization</span>
            </article>
          </div>
        </div>

        <div className="home__feature-panel">
          <article className="home__feature-card">
            <p>Today&apos;s snapshot</p>
            <h2>Centralized Repository Objectives</h2>
            <ul>
              <li>Track DNA, RNA, and protein sequence metadata</li>
              <li>Maintain deep relationships between researchers, projects, and samples</li>
              <li>Automatic sequence length calculation during record creation</li>
            </ul>
          </article>

          <article className="home__feature-card home__feature-card--soft">
            <p>Best for</p>
            <h2>Research labs, bio-repositories, and academic collaborations</h2>
            <span>Designed to structure raw biological data efficiently before running heavy computational analysis.</span>
          </article>
        </div>
      </div>

      <section className="home__highlights">
        <article className="home__highlight-card">
          <div className="home__highlight-header">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="home__highlight-icon">
              <path d="M6 18h8" />
              <path d="M3 22h18" />
              <path d="M14 22a7 7 0 1 0-14 0" />
              <path d="M9 14l2-2" />
              <path d="M12 6l3 3-6.5 6.5a2.12 2.12 0 0 1-3 0 2.12 2.12 0 0 1 0-3L12 6z" />
              <path d="M15 3l3 3" />
            </svg>
            <h3>Sample Tracking</h3>
          </div>
          <p>Log species types, collection timelines, and map exact repository links back to active research projects.</p>
        </article>
        <article className="home__highlight-card">
          <div className="home__highlight-header">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="home__highlight-icon">
              <path d="M2 15c6.667-6 13.333 0 20-6" />
              <path d="M2 9c6.667 6 13.333 0 20 6" />
              <path d="M6 12v3" />
              <path d="M10 9.5v5" />
              <path d="M14 9.5v5" />
              <path d="M18 9v3" />
            </svg>
            <h3>Sequence Management</h3>
          </div>
          <p>Store nucleic acid and protein strings securely alongside auto-calculated metrics ready for downstream tools.</p>
        </article>
        <article className="home__highlight-card">
          <div className="home__highlight-header">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="home__highlight-icon">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <h3>Storage Mapping</h3>
          </div>
          <p>Pinpoint locations across institutions down to the precise building, laboratory, freezer, shelf, and box numbers.</p>
        </article>
      </section>
    </section>
  );
}

export default Home;