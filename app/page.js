'use client';
import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState('html');
  const [error, setError] = useState('');

  const handleFetch = async () => {
    setLoading(true);
    setError('');
    setData(null);

    try {
      const res = await fetch('/api/fetch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error);
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#111827', color: '#fff', padding: '2rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        
        <header style={{ borderBottom: '1px solid #374151', paddingBottom: '1rem' }}>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#4ade80', margin: 0 }}>
            Get Source Code <span style={{ color: '#fff' }}>ByPann</span>
          </h1>
          <p style={{ fontSize: '0.9rem', color: '#9ca3af', marginTop: '0.5rem' }}>
            Tarik HTML, CSS, JS asli dari URL target. Dev: PANN
          </p>
        </header>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <input
            type="text"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            style={{ flex: 1, backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '4px', padding: '0.5rem 1rem', color: '#fff', fontSize: '0.9rem', outline: 'none' }}
          />
          <button
            onClick={handleFetch}
            disabled={loading}
            style={{ backgroundColor: '#16a34a', color: '#fff', padding: '0.5rem 1.5rem', borderRadius: '4px', fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer', border: 'none', opacity: loading ? 0.5 : 1 }}
          >
            {loading ? 'Loading...' : 'Get Source'}
          </button>
        </div>

        {error && <div style={{ backgroundColor: 'rgba(153, 27, 27, 0.5)', border: '1px solid #ef4444', padding: '0.75rem', borderRadius: '4px', color: '#fca5a5', fontSize: '0.9rem' }}>{error}</div>}

        {data && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '1px solid #374151', paddingBottom: '0.5rem' }}>
              {['html', 'css', 'js', 'links'].map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  style={{ padding: '0.25rem 1rem', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase', backgroundColor: tab === t ? '#16a34a' : 'transparent', color: tab === t ? '#fff' : '#9ca3af', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                  {t}
                </button>
              ))}
            </div>

            <div style={{ backgroundColor: '#1f2937', padding: '1rem', borderRadius: '8px', height: '60vh', overflow: 'auto', border: '1px solid #374151' }}>
              <pre style={{ fontSize: '0.8rem', color: '#86efac', whiteSpace: 'pre-wrap', wordBreak: 'break-all', margin: 0 }}>
                {tab === 'html' && data.html}
                {tab === 'css' && (data.css.join('\n\n') + '\n\n--- External CSS ---\n' + data.cssUrls.join('\n'))}
                {tab === 'js' && (data.js.join('\n\n') + '\n\n--- External JS ---\n' + data.jsUrls.join('\n'))}
                {tab === 'links' && JSON.stringify({ cssUrls: data.cssUrls, jsUrls: data.jsUrls }, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}