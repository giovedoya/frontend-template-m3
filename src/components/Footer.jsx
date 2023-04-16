import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';

function Footer() {
  return (
        <footer className="bg-gray-800  text-white py-10">
          <div className="container px-4 mx-auto">
            <div className="flex flex-wrap justify-between">
              <div className="w-full md:w-1/4 mb-8 md:mb-0">
                <h4 className="text-xl font-bold mb-4">Navegación</h4>
                <ul className="list-unstyled">
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/post">Post</Link></li>
                  <li><Link to="/faq">Frequent questions</Link></li>
                  <li><Link to="/contacto">Contact</Link></li>
                </ul>
              </div>
              <div className="w-full md:w-1/4 mb-8 md:mb-0">
                <h4 className="text-xl font-bold mb-4">Contact</h4>
                <ul className="list-unstyled">
                  <li><FiMail className="inline-block mr-2"/>info@weddsell.com</li>
                  <li>Phone: +34 685-554181</li>
                  <li>Addres: Calle Falsa 123, Barcelona, CP 12345</li>
                </ul>
              </div>
              <div className="w-full md:w-1/4 mb-8 md:mb-0">
                <h4 className="text-xl font-bold mb-4">follow us</h4>
                <ul className="list-unstyled flex">
                  <li><a href="https://www.facebook.com/weddsellonline"><FaFacebookF className="text-2xl mr-4"/></a></li>
                  <li><a href="https://www.instagram.com/weddsell/"><FaInstagram className="text-2xl mr-4"/></a></li>                  
                </ul>
              </div>
              <div className="w-full md:w-1/4">
                <h4 className="text-xl font-bold mb-4">Subscribe</h4>
                <form>
                  <div className="flex mb-4">
                    <input type="email" className="w-full bg-gray-800 rounded py-2 px-4 text-white" placeholder="Your e-mail" />
                    <button type="submit" className="bg-gray-700 rounded py-2 px-4 ml-4 text-white">Subscribe</button>
                  </div>
                </form>
              </div>
            </div>
            <div className="flex justify-center mt-10">
              <p className="text-sm text-gray-400">&copy; 2023 WeddSell. All rights reserved.</p>
            </div>
          </div>
        </footer>
      );
    }
    

export default Footer;
