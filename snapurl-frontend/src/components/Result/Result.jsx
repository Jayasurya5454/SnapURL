import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Confetti from "react-confetti";
import backgroundImage from "../../assets/backgroundUrl.png";
import githubLogo from '../../assets/githublogo.png';
import linkedinLogo from '../../assets/linkedin.svg';
import mediumLogo from '../../assets/medium-svgrepo-com.svg';


const Result = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { shortUrl, qrCode } = location.state || {};
    const formattedShortUrl = shortUrl ? `https://snappedurl.onrender.com/${shortUrl}` : null;
    const [showConfetti, setShowConfetti] = useState(true);

    const downloadAsPdf = () => {
        const qrImage = document.createElement("a");
        qrImage.href = qrCode; 
        qrImage.download = "Snapurl.png"; 
        qrImage.click();
    };

    const handleCopy = () => {
        if (formattedShortUrl) {
            navigator.clipboard.writeText(formattedShortUrl);
            toast.success("Shortened URL copied to clipboard!", { autoClose: 3000 });
        } else {
            toast.error("No URL available to copy.", { autoClose: 3000 });
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => setShowConfetti(false), 10000);
        return () => clearTimeout(timer);
    }, []);

    // Dynamic card width based on URL length
    const cardWidth = Math.max(500, Math.max(300, formattedShortUrl ? formattedShortUrl.length * 5 : 250));

    return (
        <div
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#fff",
                fontFamily: "Arial, sans-serif",
            }}
        >
            <ToastContainer />
            {formattedShortUrl && showConfetti && <Confetti />}
            <div
                style={{
                    padding: "30px",
                    borderRadius: "15px",
                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
                    textAlign: "center",
                    width: `${cardWidth}px`,
                }}
            >
                {formattedShortUrl ? (
                    <>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                background: "#2c3e50",
                                padding: "10px 15px",
                                borderRadius: "8px",
                                marginBottom: "20px",
                            }}
                        >
                            <input
                                type="text"
                                value={formattedShortUrl}
                                readOnly
                                style={{
                                    flex: 1,
                                    background: "transparent",
                                    border: "none",
                                    color: "#fff",
                                    fontSize: "18px",
                                    outline: "none",
                                }}
                            />
                            <button
                                onClick={handleCopy}
                                style={{
                                    background: "#2ecc71",
                                    border: "none",
                                    padding: "5px 10px",
                                    borderRadius: "5px",
                                    color: "#fff",
                                    cursor: "pointer",
                                }}
                            >
                                📋
                            </button>
                        </div>
                        <div
                            style={{
                                marginBottom: "20px",
                                padding: "15px",
                                borderRadius: "10px",
                            }}
                        >
                            <img
                                src={qrCode}
                                alt="QR Code"
                                style={{
                                    width: "100%",
                                    height: "auto",
                                    maxWidth: "200px",
                                    margin: "0 auto",
                                    display: "block",
                                }}
                            />
                        </div>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                gap: "10px",
                                marginBottom: "20px",
                            }}
                        >
                            <button
                                style={{
                                    background: "#fff",
                                    border: "none",
                                    padding: "10px",
                                    borderRadius: "50%",
                                    fontSize: "18px",
                                    cursor: "pointer",
                                }}
                                onClick={() => window.open("https://github.com/Jayasurya5454", "_blank")}
                            >
                                <img
                                    src={githubLogo}
                                    alt="github"
                                    style={{ width: "28px", height: "28px" }}
                                />
                            </button>
                            <button
                                style={{
                                    background: "#fff",
                                    border: "none",
                                    padding: "10px",
                                    borderRadius: "50%",
                                    fontSize: "18px",
                                    cursor: "pointer",
                                }}
                                onClick={() => window.open("https://www.linkedin.com/in/jayasurya5454", "_blank")}

                            >
                                <img
                                    src={linkedinLogo}
                                    alt="Website"
                                    style={{ width: "28px", height: "28px" }}
                                />
                            </button>
                            <button
                                style={{
                                    background: "#fff",
                                    border: "none",
                                    padding: "10px",
                                    borderRadius: "50%",
                                    fontSize: "18px",
                                    cursor: "pointer",
                                }}
                                onClick={() => window.open("https://jayasurya5454.medium.com/", "_blank")}
                            >
                                <img
                                    src={mediumLogo}
                                    alt="Website"
                                    style={{ width: "28px", height: "28px" }}
                                />
                            </button>
                        </div>
                        <div>
                            <Button
                                style={{
                                    background: "#1abc9c",
                                    border: "none",
                                    padding: "10px 20px",
                                    borderRadius: "30px",
                                    marginRight: "10px",
                                    cursor: "pointer",
                                }}
                                onClick={() => downloadAsPdf()}
                            >
                                Download QR
                            </Button>
                            <Button
                                style={{
                                    background: "#1abc9c",
                                    border: "none",
                                    padding: "10px 20px",
                                    borderRadius: "30px",
                                    cursor: "pointer",
                                }}
                                onClick={() => window.open(formattedShortUrl, "_blank")}
                            >
                                Open Snaped URL
                            </Button>
                        </div>
                    </>
                ) : (
                    <p>No URL generated. Please try again.</p>
                )}
            </div>
        </div>
    );
};

export default Result;
