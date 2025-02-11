import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Dashboard.css';

const Dashboard = () => {
    const [url, setUrl] = useState('');
    const [customName, setCustomName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("URL:", url, "Custom Name:", customName);
    };

    return (
        <div className="dashboard-container">
            <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
                <form
                    className="bg-white p-5 rounded shadow-lg"
                    style={{ maxWidth: "500px", width: "100%" }}
                    onSubmit={handleSubmit}
                >
                    <h2 className="text-center text-primary mb-4 position-relative">
                        Dashboard
                        <span
                            className="position-absolute rounded-circle  "
                            style={{
                                width: "16px",
                                height: "16px",
                                top: "50%",
                                left: "-20px",
                                transform: "translateY(-50%)",
                            }}
                        ></span>
                    </h2>
                    <p className="text-muted text-center mb-4">
                        Enter the URL and a custom name to generate your shortened link.
                    </p>
                    <div className="form-floating mb-3">
                        <input
                            type="url"
                            id="url"
                            className="form-control"
                            placeholder="Enter URL"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            required
                        />
                        <label htmlFor="url">URL</label>
                    </div>
                    <div className="form-floating mb-4">
                        <input
                            type="text"
                            id="customName"
                            className="form-control"
                            placeholder="Custom Name"
                            value={customName}
                            onChange={(e) => setCustomName(e.target.value)}
                            required
                        />
                        <label htmlFor="customName">Custom Name</label>
                    </div>
                    <button type="submit" className="btn btn-success w-100">
                        Generate Shortened URL
                    </button>
                    <p className="text-center text-muted mt-4">
                        Need help? <a href="/help" className="text-primary">Contact Support</a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Dashboard;
