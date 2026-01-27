import Page from '../components/Page';

export default function NotFoundPage() {
  return (
    <Page onSearch={() => {}}>
      <main style={{ maxWidth: 1200, margin: '2rem auto', padding: '0 2rem' }}>
        <h1>404 - Page Not Found</h1>
        <p>Use the navigation to go back.</p>
      </main>
    </Page>
  );
}
