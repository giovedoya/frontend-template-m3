import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';

function Footer() {
  return (
        <footer className="bg-gray-900 text-white py-10">
          <div className="container px-4 mx-auto">
            <div className="flex flex-wrap justify-between">
              <div className="w-full md:w-1/4 mb-8 md:mb-0">
                <h4 className="text-xl font-bold mb-4">Navegación</h4>
                <ul className="list-unstyled">
                  <li><Link to="/">Inicio</Link></li>
                  <li><Link to="/vestidos">Vestidos</Link></li>
                  <li><Link to="/faq">Preguntas frecuentes</Link></li>
                  <li><Link to="/contacto">Contacto</Link></li>
                </ul>
              </div>
              <div className="w-full md:w-1/4 mb-8 md:mb-0">
                <h4 className="text-xl font-bold mb-4">Contacto</h4>
                <ul className="list-unstyled">
                  <li><FiMail className="inline-block mr-2"/>info@tuaplicacion.com</li>
                  <li>Teléfono: +1 (123) 456-7890</li>
                  <li>Dirección: Calle Falsa 123, Ciudad Ficticia, CP 12345</li>
                </ul>
              </div>
              <div className="w-full md:w-1/4 mb-8 md:mb-0">
                <h4 className="text-xl font-bold mb-4">Síguenos</h4>
                <ul className="list-unstyled flex">
                  <li><a href="https://www.facebook.com/tuaplicacion"><FaFacebookF className="text-2xl mr-4"/></a></li>
                  <li><a href="https://www.instagram.com/tuaplicacion"><FaInstagram className="text-2xl mr-4"/></a></li>
                  <li><a href="https://www.twitter.com/tuaplicacion"><FaTwitter className="text-2xl"/></a></li>
                </ul>
              </div>
              <div className="w-full md:w-1/4">
                <h4 className="text-xl font-bold mb-4">Subscríbete</h4>
                <form>
                  <div className="flex mb-4">
                    <input type="email" className="w-full bg-gray-800 rounded py-2 px-4 text-white" placeholder="Tu correo electrónico" />
                    <button type="submit" className="bg-gray-700 rounded py-2 px-4 ml-4 text-white">Subscríbete</button>
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
