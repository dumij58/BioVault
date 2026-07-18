import './home.css';

function Home({ onLoginClick, onRegisterClick }) {
  return (
    <section className="home">
      <header className="home__topbar">
        <div>
          <p className="home__brand">BioVault</p>
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
          <h3>Sample Tracking</h3>
          <p>Log species types, collection timelines, and map exact repository links back to active research projects.</p>
        </article>
        <article className="home__highlight-card">
          <h3>Sequence Management</h3>
          <p>Store nucleic acid and protein strings securely alongside auto-calculated metrics ready for downstream tools.</p>
        </article>
        <article className="home__highlight-card">
          <h3>Storage Mapping</h3>
          <p>Pinpoint locations across institutions down to the precise building, laboratory, freezer, shelf, and box numbers.</p>
        </article>
      </section>
    </section>
  );
}

export default Home;