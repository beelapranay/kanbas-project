import { Link } from "react-router-dom";
import { FaFlask, FaGithub } from "react-icons/fa";
import { FaBook } from "react-icons/fa6";
 
export default function LandingPage() {
    // Background style for the full viewport container
    const containerStyle = {
        background: "linear-gradient(to right, #4facfe, #00f2fe)"
    };
 
    // Make the card take up most of the screen width
    const cardStyle = {
        width: "90%",      // Make the card very wide, relative to the viewport
        maxWidth: "1000px", // Add a large max width so it doesn't get too huge on very large screens
        backgroundColor: "#ffffffee"
    };
 
    return (
        <div
            className="d-flex justify-content-center align-items-center vh-100"
            style={containerStyle}
        >
            <div
                className="card text-center shadow-lg rounded"
                style={cardStyle}
            >
                <div className="p-4">
                    <h1
                        className="mb-4"
                        style={{ fontSize: "clamp(2rem, 2vw + 1rem, 3rem)", color: "#333", lineHeight: "1.4" }}
                    >
                        <strong>Mann Arvindbhai Savani</strong><br />
                        <strong>Apurva Saini</strong><br />
                        <strong>Chaman Kumar</strong><br />
                        <strong>Sampath Pranay Beela</strong>
                    </h1>
 
                    <br />
 
                    <h4
                        className="mb-4"
                        style={{ fontSize: "clamp(1.2rem, 1.5vw + 0.5rem, 1.5rem)", color: "#666" }}
                    >
                        CS5610 SEC 03
                    </h4>
 
                    <h3
                        className="mb-4"
                        style={{ fontSize: "clamp(1.3rem, 1.5vw + 0.5rem, 1.5rem)", color: "#444" }}
                    >
                        Quick Links
                    </h3>
 
                    <div className="d-grid gap-4">
                        {/* Labs Link */}
                        <Link to="/Labs" className="text-decoration-none">
                            <button
                                className="btn btn-lg btn-link link-hover d-flex align-items-center justify-content-center w-100"
                                style={{ color: "#007bff" }}
                            >
                                <FaFlask className="me-2" style={{ color: "#1e90ff" }} />
                                Labs
                            </button>
                        </Link>
 
                        {/* Kanbas Link */}
                        <Link to="/Kanbas" className="text-decoration-none">
                            <button
                                className="btn btn-lg btn-link link-hover d-flex align-items-center justify-content-center w-100"
                                style={{ color: "#e74c3c" }}
                            >
                                <FaBook className="me-2" style={{ color: "#ff6347" }} />
                                Kanbas
                            </button>
                        </Link>
 
                        {/* Front-End Repository */}
                        <Link
                            to="https://github.com/apps-037/kanbas-react-web-app"
                            className="text-decoration-none"
                        >
                            <button
                                className="btn btn-lg btn-link link-hover d-flex align-items-center justify-content-center w-100"
                                style={{ color: "#333" }}
                            >
                                <FaGithub className="me-2" style={{ color: "#333" }} />
                                Front-End Repository
                            </button>
                        </Link>
 
                        {/* Back-End Repository */}
                        <Link
                            to="https://github.com/apps-037/kanbas-node-server-app"
                            className="text-decoration-none"
                        >
                            <button
                                className="btn btn-lg btn-link link-hover d-flex align-items-center justify-content-center w-100"
                                style={{ color: "#333" }}
                            >
                                <FaGithub className="me-2" style={{ color: "#333" }} />
                                Back-End Repository
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}