import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export function Footer() {
  const date = new Date();
  return (
    <footer className="mt-20 bg-black text-white py-12 ">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center mb-4">
              <img
                src="../images/logo/potpis.webp"
                alt="Owner logo"
                className="h-12"
              />
              <span className="text-xl font-bold text-red-500"></span>
            </div>
            <p className="text-gray-400"> © MSpudicDesign </p>
          </div>
          <div className="mb-6 md:mb-0">
            <h5 className="text-white font-bold mb-2">Tools</h5>
            <ul className="text-gray-400">
              <li>
                <a
                  target="_blank"
                  href="https://www.rustafied.com/"
                  className="hover:text-red-500"
                >
                  Rustafied
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  href="https://rustlabs.com/"
                  className="hover:text-red-500"
                >
                  Rust Labs
                </a>
              </li>
            </ul>
          </div>

          <div className="mb-6 md:mb-0">
            <h5 className="text-white font-bold mb-2">Resources</h5>
            <ul className="text-gray-400">
              <li>
                <a
                  target="_blank"
                  href="https://github.com/fogracvxy/rust-raid-calculator"
                  className="hover:text-red-500"
                >
                  Github
                </a>
              </li>
            </ul>
          </div>
          <div className="mb-6 md:mb-0">
            <h5 className="text-white font-bold mb-2">Support</h5>
            <ul className="text-gray-400">
              <li>
                <a href="#" className="hover:text-red-500">
                  Help
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-red-500">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-red-500">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center mt-10 border-t border-gray-700 pt-4">
          <p className="text-gray-400 mb-4 md:mb-0">
            © MSpudicDesign {date.getFullYear()}. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-red-500">
              <FaFacebook />
            </a>
            <a href="#" className="text-gray-400 hover:text-red-500">
              <FaTwitter />
            </a>
            <a href="#" className="text-gray-400 hover:text-red-500">
              <FaInstagram />
            </a>
            <a href="#" className="text-gray-400 hover:text-red-500">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
