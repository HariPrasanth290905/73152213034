import React, { useState } from 'react';

const MAX_URLS = 5;

function Index() {
    const [urls, setUrls] = useState([{ url: '', validity: '' }]);
    const [results, setResults] = useState([]);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    const handleInputChange = (index, field, value) => {
        const newUrls = [...urls];
        newUrls[index][field] = value;
        setUrls(newUrls);
    };

    const handleAddUrl = () => {
        if (urls.length < MAX_URLS) {
            setUrls([...urls, { url: '', validity: '' }]);
        }
    };

    const handleClearAll = () => {
        setUrls([{ url: '', validity: '' }]);
        setResults([]);
    };

    const handleShorten = async () => {
        if (!urls)
            return;
        else
            try {
                const response = await fetch('http://localhost:8080/api/shorten', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ urls })
                });

                if (!response.ok) throw new Error('Failed to shorten URLs');

                const data = await response.json();
                setResults(data);
                setSnackbar({ open: true, message: 'URLs shortened successfully!', severity: 'success' });
            } catch (err) {
                setSnackbar({ open: true, message: err.message, severity: 'error' });
            }
    };

    return (
        <div className='h-screen bg-gradient-to-tr from-red-400 to-cyan-400  items flex'>
            <div className="flex flex-col border justify-center items-center w-screen rounded-xl m-30 text-white ">
                <div className='flex flex-col text-center'>
                    <h1 className="text-3xl font-bold mb-4">HTTP URL Shortener</h1>

                    {urls.map((input, index) => (
                        <div key={index} className="grid gap-5 grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <input
                                type="text"
                                placeholder="Paste your URL"
                                className="col-span-2 p-2 border rounded"
                                value={input.url}
                                required
                                onChange={(e) => handleInputChange(index, 'url', e.target.value)}
                            />
                            <input
                                type="number"
                                placeholder="Validity Time"
                                className="p-2 border rounded"
                                value={input.validity}
                                required
                                min={5}
                                onChange={(e) => handleInputChange(index, 'validity', e.target.value)}
                            />
                        </div>
                    ))}

                    <div className="mb-6 space-x-2">
                        <button
                            onClick={handleAddUrl}
                            disabled={urls.length >= MAX_URLS}
                            className="border border-white text-black hover:bg-blue-300 px-4 py-2 rounded disabled:opacity-50"
                        >
                            Add Another
                        </button>
                        <button
                            onClick={handleClearAll}
                            className="border hover:bg-gray-300 bg-gray-400 text-white px-4 py-2 rounded"
                        >
                            Clear All
                        </button>
                        <button
                            onClick={handleShorten}
                            className="border hover:bg-green-300 text-white px-4 py-2 rounded"
                        >
                            Shorten URLs
                        </button>
                    </div>
                </div>
                <div />

                {results.length > 0 && (
                    <div className="space-y-4">
                        {results.map((res, index) => (
                            <div key={index} className="border-[10px] rounded-xl p-5 shadow">
                                <p><strong>Original Link:</strong> {res.originalUrl}</p>
                                <p><strong>Shortened:</strong> <a className="text-blue-600 underline" href={res.originalUrl} target="_blank" rel="noopener noreferrer">{res.shortUrl}</a></p>
                                <p><strong>Validity:</strong> {res.validity || 'N/A'}</p>
                            </div>
                        ))}
                    </div>
                )}

                {snackbar.open && (
                    <div className={`fixed bottom-4 right-4 px-4 py-2 rounded shadow text-white ${snackbar.severity === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>
                        {snackbar.message}
                        <button className="ml-4 text-sm underline" onClick={() => setSnackbar({ ...snackbar, open: false })}>Close</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Index;
