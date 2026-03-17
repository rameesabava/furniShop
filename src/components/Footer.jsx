import React from 'react'
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <div style={{ backgroundColor: '#070607', padding: '10px' }} className='text-center text-light d-flex justify-content-between'>
            <div>
                <div className='d-flex m-5'>
                    <img width={'40px'} src="/icon.png" alt="icon" />
                    <h3 style={{ fontFamily: "Lobster" }}>Veloura furnishings</h3>

                </div>
                <div style={{ textAlign: 'left' }} className='m-5'>
                    <p>14 Kensington High Street</p>
                    <p>New York, NY 10016</p>
                    <p>New York</p>
                </div>
                <div className='d-flex justify-content-between gap-5 m-5'>
                    <div>Phone Number <br /> 1-800-201-888</div>
                    <div>Email <br /> support@velourafurnishings.com</div>
                </div>
            </div>
            <div className='d-flex justify-content-center gap-5 m-5'>
                <div><h4 className='m-3'>Quick Links</h4>
                    <div className='d-flex flex-column'>
                        <Link className=' text-light text-decoration-none fs-4' to=''>Home</Link>

                        <Link className=' text-light text-decoration-none fs-4' to=''>About Us</Link>

                        <Link className=' text-light text-decoration-none fs-4' to=''>Products</Link>

                    </div>

                </div>
                <div><h4 className='m-3'>Social</h4>
                    <div className='d-flex flex-column'>
                        <Link className=' text-light fs-4' to=''><FaInstagram /></Link>

                        <Link className=' text-light fs-4' to=''><FaFacebook /></Link>

                        <Link className=' text-light fs-4' to=''><FaTwitter /></Link>

                        <Link className=' text-light fs-4' to=''><FaYoutube /></Link>
                    </div>

                </div>
                <div><h4 className='m-3'>Legal</h4>
                    <div className='d-flex flex-column'>
                        <p>Terms of Service</p>
                        <p>Privacy Policy</p>
                        <p>Cookie Policy</p>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Footer