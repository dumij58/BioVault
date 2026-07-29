export function HomeView({ pingMessage }) {
    return (
        <>
            <h1>BioVault</h1>
            <h3>Research Sample and Biological Sequence Repository</h3>
            <p>API Status: {pingMessage}</p>
        </>
    );
}
