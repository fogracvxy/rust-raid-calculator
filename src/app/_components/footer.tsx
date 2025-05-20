import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export function Footer() {
  const date = new Date();
  return (
    
     <footer className="w-full bg-gradient-to-b from-gray-950 to-black pt-14 mt-20 border-t border-gray-800 relative z-10">
     {/* Decorative elements */}
     <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-800/50 to-transparent"></div>
     
     {/* Rust texture overlay */}
     <div className="absolute inset-0 bg-[url('/images/rust-texture.jpg')] opacity-5 mix-blend-overlay pointer-events-none"></div>
     
     {/* Circuit pattern accent */}
     <div className="absolute top-8 right-8 w-72 h-72 opacity-5 pointer-events-none">
       <svg viewBox="0 0 100 100" className="w-full h-full text-red-800">
         <g stroke="currentColor" strokeWidth="0.5" fill="none">
           <circle cx="50" cy="50" r="40" />
           <circle cx="50" cy="50" r="35" />
           <circle cx="50" cy="50" r="30" />
           <circle cx="50" cy="50" r="25" />
           <line x1="10" y1="50" x2="90" y2="50" />
           <line x1="50" y1="10" x2="50" y2="90" />
           <line x1="20" y1="20" x2="80" y2="80" />
           <line x1="20" y1="80" x2="80" y2="20" />
         </g>
       </svg>
     </div>
     
     <div className="max-w-7xl mx-auto px-6 pb-10">
       {/* Main footer grid */}
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-10">
         {/* Brand column with circuit board background */}
         <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-900 to-black p-6 border border-gray-800/50 shadow-lg">
           {/* Logo and name */}
           <div className="flex items-center mb-6 relative z-10">
             <div className="bg-red-700 w-10 h-10 rounded-lg flex items-center justify-center mr-3 shadow-lg shadow-red-900/20">
               <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 007.072 0m-9.9-2.828a9 9 0 0112.728 0" />
               </svg>
             </div>
             <div className="flex flex-col">
               <span className="text-xl font-bold text-white">RUST TOOLS</span>
               <span className="text-xs text-gray-400">by MSpudicDesign</span>
             </div>
           </div>
           
           {/* Description */}
           <p className="text-gray-400 mb-6 leading-relaxed relative z-10">
             A suite of professional tools designed to enhance your Rust gameplay experience. Calculate, optimize, and dominate.
           </p>
           
           {/* Social icons */}
           <div className="flex space-x-4 relative z-10">
             <a href="https://github.com/fogracvxy" className="bg-gray-800 p-2 rounded-lg hover:bg-red-900/40 transition-colors duration-300">
               <svg className="w-4 h-4 text-gray-400 hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                 <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
               </svg>
             </a>
            
           </div>
           
           {/* Circuit pattern */}
           <div className="absolute inset-0 opacity-10">
             <svg className="w-full h-full" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
               <path stroke="currentColor" strokeWidth="0.5" fill="none" d="M40,40 L160,40 L160,160 L40,160 Z" />
               <path stroke="currentColor" strokeWidth="0.5" fill="none" d="M60,60 L140,60 L140,140 L60,140 Z" />
               <path stroke="currentColor" strokeWidth="0.5" fill="none" d="M80,80 L120,80 L120,120 L80,120 Z" />
               <path stroke="currentColor" strokeWidth="0.5" fill="none" d="M40,40 L160,160" />
               <path stroke="currentColor" strokeWidth="0.5" fill="none" d="M40,160 L160,40" />
               <circle cx="40" cy="40" r="3" fill="currentColor" opacity="0.5" />
               <circle cx="160" cy="40" r="3" fill="currentColor" opacity="0.5" />
               <circle cx="40" cy="160" r="3" fill="currentColor" opacity="0.5" />
               <circle cx="160" cy="160" r="3" fill="currentColor" opacity="0.5" />
             </svg>
           </div>
         </div>
         
         {/* Tools & Resources */}
         <div>
           <h3 className="text-lg font-bold text-white mb-6 flex items-center">
             <div className="w-1 h-5 bg-red-600 mr-3"></div>
             Tools
           </h3>
           <div className="grid grid-cols-2 gap-4">
             <div>
               <ul className="space-y-3">
                 <li>
                   <a href="/raid" className="text-gray-400 hover:text-red-500 transition-colors flex items-center group">
                     <div className="w-1.5 h-1.5 rounded-full bg-red-600 mr-2 group-hover:scale-125 transition-transform"></div>
                     Raid Calculator
                   </a>
                 </li>
                 <li>
                   <a href="/recycle" className="text-gray-400 hover:text-red-500 transition-colors flex items-center group">
                     <div className="w-1.5 h-1.5 rounded-full bg-red-600 mr-2 group-hover:scale-125 transition-transform"></div>
                     Recycle Calculator
                   </a>
                 </li>
                 <li>
                   <a href="/excavator" className="text-gray-400 hover:text-red-500 transition-colors flex items-center group">
                     <div className="w-1.5 h-1.5 rounded-full bg-red-600 mr-2 group-hover:scale-125 transition-transform"></div>
                     Excavator Calculator
                   </a>
                 </li>
               </ul>
             </div>
             <div>
               <ul className="space-y-3">
                 <li>
                   <a href="/decay" className="text-gray-400 hover:text-red-500 transition-colors flex items-center group">
                     <div className="w-1.5 h-1.5 rounded-full bg-red-600 mr-2 group-hover:scale-125 transition-transform"></div>
                     Decay Timer
                   </a>
                 </li>
                 <li>
                   <a href="/battlemetrics" className="text-gray-400 hover:text-red-500 transition-colors flex items-center group">
                     <div className="w-1.5 h-1.5 rounded-full bg-red-600 mr-2 group-hover:scale-125 transition-transform"></div>
                     Server Tracker
                   </a>
                 </li>
                 
               </ul>
             </div>
           </div>
           
           {/* External Resources */}
           <h3 className="text-lg font-bold text-white mt-8 mb-6 flex items-center">
             <div className="w-1 h-5 bg-red-600 mr-3"></div>
             Resources
           </h3>
           <ul className="space-y-3">
             <li>
               <a href="https://rustlabs.com/" target="_blank" className="text-gray-400 hover:text-red-500 transition-colors flex items-center group">
                 <div className="w-1.5 h-1.5 rounded-full bg-red-600 mr-2 group-hover:scale-125 transition-transform"></div>
                 Rust Labs
                 <svg className="w-3 h-3 ml-1.5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                 </svg>
               </a>
             </li>
             <li>
               <a href="https://www.rustafied.com/" target="_blank" className="text-gray-400 hover:text-red-500 transition-colors flex items-center group">
                 <div className="w-1.5 h-1.5 rounded-full bg-red-600 mr-2 group-hover:scale-125 transition-transform"></div>
                 Rustafied
                 <svg className="w-3 h-3 ml-1.5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                 </svg>
               </a>
             </li>
             
           </ul>
         </div>
         
         {/* About & Support */}
         <div>
           <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-xl border border-gray-800/50 shadow-lg">
             <h3 className="text-white font-bold mb-4">About This Project</h3>
             <p className="text-gray-400 mb-4 text-sm leading-relaxed">
               This suite of Rust calculators was developed to help players optimize their gameplay, save resources, and make informed decisions. 
             </p>
             <p className="text-gray-400 mb-4 text-sm leading-relaxed">
               Built with React, Next.js, and Tailwind CSS. Continually updated to reflect the latest changes in Rust.
             </p>
             <div className="border-t border-gray-800 mt-4 pt-4">
               <h4 className="text-gray-300 font-medium mb-3">Support</h4>
               <div className="space-y-2">
                 <a href="#" className="text-gray-400 hover:text-red-500 transition-colors flex items-center">
                   <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                   </svg>
                   FAQ
                 </a>
                 <a href="#" className="text-gray-400 hover:text-red-500 transition-colors flex items-center">
                   <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                   </svg>
                   Contact
                 </a>
               </div>
             </div>
           </div>
         </div>
       </div>
       
       {/* Footer bottom */}
       <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center">
         <p className="text-gray-500 text-sm mb-4 md:mb-0">
           © {new Date().getFullYear()} Rust Tools by MSpudicDesign. All rights reserved.
         </p>
         <div className="flex space-x-6">
           <a href="#" className="text-gray-500 hover:text-gray-400 text-sm">Privacy</a>
           <a href="#" className="text-gray-500 hover:text-gray-400 text-sm">Terms</a>
           <a href="#" className="text-gray-500 hover:text-gray-400 text-sm">Cookies</a>
         </div>
       </div>
     </div>
   </footer>
  );
}
