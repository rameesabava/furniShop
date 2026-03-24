import React from 'react'
import { FaInstagram, FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer style={{ backgroundColor: 'black' }} className="text-light pt-5">      
            <div className="container">
                <div className="row gap-4">
                    {/* first column */}
                    <div className="col-md-4">
                        <div className="d-flex align-items-center gap-2 mb-3">
                            <img width="40px" src="/icon.png" alt="icon" />
                            <h3 style={{ fontFamily: "Lobster" }} className="mb-0">
                                Veloura Furnishings
                            </h3>
                        </div>
                        <p className="text-secondary">
                            Bring comfort home with modern and elegant furniture designed to elevate your lifestyle.
                        </p>
                        <div className="mt-3">
                            <p className="mb-1">Shop No. 12, Ground Floor, Orchid Plaza</p>
                            <p className="mb-1">Link Road, Andheri West</p>
                            <p className="mb-3">Mumbai - 400053</p>
                            <p className="mb-1"><strong>Phone:</strong> 1-800-201-888</p>
                            <p><strong>Email:</strong> support@velourafurnishings.com</p>
                        </div>
                    </div>

                    {/* second column */}
                    <div className="col-md-2">
                        <h5 className="mb-3">Quick Links</h5>
                        <div className="d-flex flex-column gap-2">
                            <Link className="text-decoration-none text-secondary footerLink" to="/">Home</Link>
                            <Link className="text-decoration-none text-secondary footerLink" to="/about">About Us</Link>
                            <Link className="text-decoration-none text-secondary footerLink" to="/products">Products</Link>
                        </div>
                    </div>

                    {/* third column */}
                    <div className="col-md-2">
                        <h5 className="mb-3">Follow Us</h5>
                        <div className="d-flex gap-3 fs-5">
                            <FaInstagram className="footerIcon" />
                            <FaFacebook className="footerIcon" />
                            <FaTwitter className="footerIcon" />
                            <FaYoutube className="footerIcon" />
                        </div>
                    </div>

                    {/* fourth column */}
                    <div className="col-md-2">
                        <h5 className="mb-3">Legal</h5>
                        <div className="d-flex flex-column gap-2 text-secondary">
                            <span className="footerLink">Terms of Service</span>
                            <span className="footerLink">Privacy Policy</span>
                            <span className="footerLink">Cookie Policy</span>
                        </div>
                    </div>

                </div>
            </div>

            {/* bottom Bar */}
            <div className="text-center py-3 mt-4 border-top border-secondary text-secondary">
                © 2026 Veloura Furnishings. All rights reserved.
            </div>

        </footer>
    )
}

export default Footer