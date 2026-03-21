import React from 'react'
import { FaInstagram, FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer style={{ backgroundColor: '#0d0d0d' }} className="text-light pt-5">
            
            <div className="container">
                <div className="row gy-4">

                    {/* Brand Section */}
                    <div className="col-md-4">
                        <div className="d-flex align-items-center gap-2 mb-3">
                            <img width="40px" src="/icon.png" alt="icon" />
                            <h3 style={{ fontFamily: "Lobster" }} className="mb-0">
                                Veloura Furnishings
                            </h3>
                        </div>

                        <p className="text-secondary small">
                            Bring comfort home with modern and elegant furniture designed to elevate your lifestyle.
                        </p>

                        <div className="mt-3">
                            <p className="mb-1">14 Kensington High Street</p>
                            <p className="mb-1">New York, NY 10016</p>
                            <p className="mb-3">New York</p>

                            <p className="mb-1"><strong>Phone:</strong> 1-800-201-888</p>
                            <p><strong>Email:</strong> support@velourafurnishings.com</p>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="col-md-2">
                        <h5 className="mb-3">Quick Links</h5>
                        <div className="d-flex flex-column gap-2">
                            <Link className="text-decoration-none text-secondary footer-link" to="/">Home</Link>
                            <Link className="text-decoration-none text-secondary footer-link" to="/about">About Us</Link>
                            <Link className="text-decoration-none text-secondary footer-link" to="/products">Products</Link>
                        </div>
                    </div>

                    {/* Social */}
                    <div className="col-md-2">
                        <h5 className="mb-3">Follow Us</h5>
                        <div className="d-flex gap-3 fs-5">
                            <FaInstagram className="social-icon" />
                            <FaFacebook className="social-icon" />
                            <FaTwitter className="social-icon" />
                            <FaYoutube className="social-icon" />
                        </div>
                    </div>

                    {/* Legal */}
                    <div className="col-md-2">
                        <h5 className="mb-3">Legal</h5>
                        <div className="d-flex flex-column gap-2 text-secondary">
                            <span className="footer-link">Terms of Service</span>
                            <span className="footer-link">Privacy Policy</span>
                            <span className="footer-link">Cookie Policy</span>
                        </div>
                    </div>

                </div>
            </div>

            {/* Bottom Bar */}
            <div className="text-center py-3 mt-4 border-top border-secondary small text-secondary">
                © {new Date().getFullYear()} Veloura Furnishings. All rights reserved.
            </div>

        </footer>
    )
}

export default Footer;