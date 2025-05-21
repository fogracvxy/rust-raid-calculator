"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Hourglass } from "react-loader-spinner";
import CommitList from "./_components/CommitList";
import { trackCalculatorUsage } from "./utils/analytics";

interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Home() {
  const router = useRouter();
  const [countDownTime, setCountDownTime] = useState<CountdownTime>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Animation for counter values
  useEffect(() => {
    const animateValue = (id: string, start: number, end: number, duration: number) => {
      const obj = document.getElementById(id);
      if (!obj) return;
      
      const textStartValue = obj.textContent || "";
      const startNum = typeof start === "number" ? start : 0;
      const range = end - startNum;
      const minTimer = 50;
      const stepTime = Math.abs(Math.floor(duration / range));
      const timerInterval = Math.max(stepTime, minTimer);
      const isValueWithCommas = textStartValue.includes(",");
      const isValueWithM = textStartValue.toLowerCase().includes("m");
      
      let currentValue = startNum;
      let timer: NodeJS.Timeout;
      
      const run = () => {
        currentValue += 1;
        
        if (isValueWithM) {
          obj.textContent = (currentValue / 10).toFixed(1) + "M";
        } else if (isValueWithCommas) {
          obj.textContent = currentValue.toLocaleString();
        } else {
          obj.textContent = currentValue.toString();
        }
        
        if (currentValue >= end) {
          clearInterval(timer);
        }
      };
      
      timer = setInterval(run, timerInterval);
    };

    // Observer for animation triggers
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLElement;
          const id = element.id;
          const textValue = element.textContent || "";
          
          let endValue = 0;
          if (textValue.toLowerCase().includes("m")) {
            endValue = parseFloat(textValue.replace(/[^0-9.]/g, "")) * 10;
          } else {
            endValue = parseInt(textValue.replace(/,/g, ""), 10);
          }
          
          animateValue(id, 0, endValue, 2000);
          observer.unobserve(element);
        }
      });
    }, { threshold: 0.1 });

    // Observe all counter elements
    const counterElements = document.querySelectorAll('.counter-value');
    counterElements.forEach(el => {
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const updateCountdown = useCallback(() => {
    let nextThursday = getNextFirstThursday();

    let now = new Date();
    let difference = nextThursday.getTime() - now.getTime();

    // Calculate the remaining time
    let days = Math.floor(difference / (1000 * 60 * 60 * 24));
    let hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);

    setCountDownTime({ days, hours, minutes, seconds });
  }, []);

  useEffect(() => {
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [updateCountdown]);

  const getNextFirstThursday = (): Date => {
    let now = new Date();
    let date = new Date(now.getFullYear(), now.getMonth(), 1);

    // Find the first Thursday of the current month
    while (date.getDay() !== 4) {
      date.setDate(date.getDate() + 1);
    }

    // If today's date is past the first Thursday or it is the first Thursday but past 20:00
    if (now.getDate() === date.getDate() && now.getHours() < 20) {
      date = now;
    } else {
      if (
        now > date ||
        (now.getDate() === date.getDate() && now.getHours() >= 20)
      ) {
        date.setMonth(date.getMonth() + 1);
        date.setDate(1);
        while (date.getDay() !== 4) {
          date.setDate(date.getDate() + 1);
        }
      }
    }

    date.setHours(20, 0, 0, 0);
    // Set the target time to 8 PM
    return date;
  };

  const handleEnterCalculator = () => {
    trackCalculatorUsage("raid");
    router.push("/raid"); // Navigate to '/raid' route
  };

  const handleNavigate = (tool: string) => {
    trackCalculatorUsage(tool);
    router.push(`/${tool}`);
  };

  const isCountdownZero =
    countDownTime.days === 0 &&
    countDownTime.hours === 0 &&
    countDownTime.minutes === 0 &&
    countDownTime.seconds === 0;

  return (
    <main className="flex flex-col items-center justify-between p-4 pb-32 bg-black text-white relative">
      {/* Rust-themed background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-red-800/10 blur-3xl"></div>
        <div className="absolute top-60 right-20 w-80 h-80 rounded-full bg-red-700/5 blur-3xl"></div>
        <div className="absolute bottom-40 left-1/4 w-96 h-96 rounded-full bg-red-900/10 blur-3xl"></div>
      </div>

      {/* Hero Section with better visual hierarchy */}
      <div className="w-full max-w-6xl mb-12 lg:mb-20 flex flex-col lg:flex-row items-center justify-between relative z-10">
        {/* Content Section */}
        <div className="w-full lg:w-1/2 lg:pr-12">
          <div className="flex items-center mb-2">
            <div className="w-1.5 h-8 bg-red-600 mr-4"></div>
            <span className="text-sm font-semibold tracking-widest text-gray-400 uppercase">Rust Tools Suite</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-red-600 mb-6">
            RUST RAID CALCULATOR
          </h1>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">
            Enhance your Rust experience with our suite of powerful tools
            designed to give you the edge you need. Whether you&apos;re planning raids, optimizing recycling,
            or tracking servers, we&apos;ve got everything you need in one place.
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={handleEnterCalculator}
              className="bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-red-600/30 flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              Raid Calculator
            </button>
            <button
              onClick={() => handleNavigate("battlemetrics")}
              className="border border-gray-700 hover:border-red-600 text-gray-300 hover:text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 ease-in-out hover:bg-gray-900/80 flex items-center group"
            >
              <svg className="w-5 h-5 mr-2 transition-colors group-hover:text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Server Status
            </button>
          </div>
        </div>

        {/* Improved iPhone Mockup with Rust-themed styling */}
        <div className="w-full lg:w-1/2 mt-12 lg:mt-0 flex justify-center items-center">
          <div className="relative mx-auto">
            {/* Rust-themed backdrop for the iPhone */}
            <div className="absolute -inset-4 bg-gradient-to-br from-red-800/20 to-gray-900/40 rounded-2xl blur-md"></div>
            
            {/* iPhone device frame - following the actual iPhone contour */}
            <div className="relative">
              {/* Custom shaped border that follows iPhone contour */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-red-900 via-red-700 to-red-800 rounded-[38px] shadow-lg shadow-red-900/30" style={{ 
                maskImage: 'url(/images/mockup_raid.png)', 
                maskSize: 'contain',
                maskRepeat: 'no-repeat',
                maskPosition: 'center',
                transform: 'scale(1.05)'
              }}></div>
              
              {/* Glow effects */}
              <div className="absolute -inset-4 bg-red-600/10 rounded-[40px] blur-xl opacity-50 animate-pulse" style={{ animationDuration: '3s' }}></div>
              
              {/* Device image */}
              <div className="relative">
                <Image
                  src="/images/mockup_raid.png"
                  alt="Rust RAID Calculator App"
                  width={380}
                  height={780}
                  className="relative z-10 object-contain"
                />
                
                {/* Interactive UI elements overlaid on device */}
                <div className="absolute top-[20%] right-[8%] z-20 transform rotate-12">
                  <div className="px-2 py-1 bg-black/70 backdrop-blur-sm border border-red-900/70 rounded-md shadow-lg shadow-red-800/30">
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                      <span className="text-[10px] font-mono text-red-500">LIVE</span>
                    </div>
                  </div>
                </div>
                
                {/* Rust-themed indicators */}
                <div className="absolute -top-2 -right-2 flex items-center justify-center z-20">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center shadow-lg shadow-red-600/50 border border-red-500/30">
                    <span className="text-[10px] font-bold text-white">C4</span>
                  </div>
                </div>
                <div className="absolute -bottom-2 -left-2 flex items-center justify-center z-20">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-yellow-600 to-yellow-700 flex items-center justify-center shadow-lg shadow-yellow-600/50 border border-yellow-500/30">
                    <span className="text-[10px] font-bold text-white">GP</span>
                  </div>
                </div>
                
                {/* Screen interactive elements */}
                <div className="absolute top-[40%] left-[10%] w-[80%] h-[10%] bg-gradient-to-r from-red-800/20 to-red-600/10 backdrop-blur-sm rounded-md border border-red-700/20 z-20 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 opacity-20">
                    <div className="h-full w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[45deg] -translate-x-full animate-[shimmer_2s_infinite]"></div>
                  </div>
                  <p className="text-[10px] text-red-200 font-mono tracking-wider">CALCULATING RAID COST...</p>
                </div>
              </div>
            </div>
            
            {/* Game-style floating indicators */}
            <div className="absolute -top-3 -left-6 bg-red-900/90 border border-red-700/50 px-2 py-0.5 rounded text-xs shadow-lg shadow-red-900/20 z-30 transform -rotate-6">
              <div className="flex items-center">
                <svg className="h-3 w-3 text-red-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className="font-mono text-red-300">ONLINE</span>
              </div>
            </div>
            
            <div className="absolute -bottom-8 right-0 bg-gray-900/90 backdrop-blur-sm border border-red-800/50 px-3 py-1.5 rounded-lg text-sm shadow-lg shadow-red-900/10 z-30">
              <div className="flex items-center">
                <svg className="h-3.5 w-3.5 text-red-500 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className="font-mono text-red-400">Fast calculations</span>
              </div>
            </div>
            
            {/* Circuit board decorative element */}
        
          </div>
        </div>
      </div>

      {/* Force Wipe Countdown with better Rust styling */}
      <div className="w-full max-w-6xl mb-16 relative z-10">
        <div className="bg-gradient-to-r from-gray-900 via-black to-gray-900 rounded-xl p-4 sm:p-8 shadow-lg border border-gray-800 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/rust-texture.jpg')] opacity-5 mix-blend-overlay"></div>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-800 via-red-600 to-red-800"></div>
          
          <h2 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6 flex items-center justify-center">
            <svg className="h-5 w-5 sm:h-6 sm:w-6 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            NEXT FORCE WIPE
          </h2>
          
          {isCountdownZero ? (
            <div className="flex justify-center">
              <Hourglass
                visible={true}
                height="60"
                width="60"
                ariaLabel="hourglass-loading"
                wrapperStyle={{}}
                wrapperClass=""
                colors={["rgb(220 38 38)", "rgb(239 68 68)"]}
              />
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-1 sm:gap-3 md:flex md:items-center md:justify-center md:space-x-6">
              {/* Days */}
              <div className="flex flex-col items-center">
                <div className="bg-gradient-to-b from-red-700 to-red-900 w-full h-14 sm:h-16 md:w-20 md:h-20 rounded-lg flex items-center justify-center shadow-lg shadow-red-800/30 border border-red-600/30">
                  <span className="text-xl sm:text-2xl md:text-3xl font-bold font-mono">{countDownTime.days}</span>
                </div>
                <span className="mt-1 sm:mt-2 text-gray-400 text-xs sm:text-sm md:text-base">Days</span>
              </div>
              
              {/* Separator - hidden on smallest screens */}
              <div className="hidden md:flex relative h-12 items-center mx-1">
                <div className="h-8 w-1 bg-red-800 rounded-full"></div>
              </div>
              
              {/* Hours */}
              <div className="flex flex-col items-center">
                <div className="bg-gradient-to-b from-red-700 to-red-900 w-full h-14 sm:h-16 md:w-20 md:h-20 rounded-lg flex items-center justify-center shadow-lg shadow-red-800/30 border border-red-600/30">
                  <span className="text-xl sm:text-2xl md:text-3xl font-bold font-mono">{countDownTime.hours}</span>
                </div>
                <span className="mt-1 sm:mt-2 text-gray-400 text-xs sm:text-sm md:text-base">Hours</span>
              </div>
              
              {/* Separator - hidden on smallest screens */}
              <div className="hidden md:flex relative h-12 items-center mx-1">
                <div className="h-8 w-1 bg-red-800 rounded-full"></div>
              </div>
              
              {/* Minutes */}
              <div className="flex flex-col items-center">
                <div className="bg-gradient-to-b from-red-700 to-red-900 w-full h-14 sm:h-16 md:w-20 md:h-20 rounded-lg flex items-center justify-center shadow-lg shadow-red-800/30 border border-red-600/30">
                  <span className="text-xl sm:text-2xl md:text-3xl font-bold font-mono">{countDownTime.minutes}</span>
                </div>
                <span className="mt-1 sm:mt-2 text-gray-400 text-xs sm:text-sm md:text-base">Min</span>
              </div>
              
              {/* Separator - hidden on smallest screens */}
              <div className="hidden md:flex relative h-12 items-center mx-1">
                <div className="h-8 w-1 bg-red-800 rounded-full"></div>
              </div>
              
              {/* Seconds */}
              <div className="flex flex-col items-center">
                <div className="bg-gradient-to-b from-red-700 to-red-900 w-full h-14 sm:h-16 md:w-20 md:h-20 rounded-lg flex items-center justify-center shadow-lg shadow-red-800/30 border border-red-600/30">
                  <span className="text-xl sm:text-2xl md:text-3xl font-bold font-mono">{countDownTime.seconds}</span>
                </div>
                <span className="mt-1 sm:mt-2 text-gray-400 text-xs sm:text-sm md:text-base">Sec</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Features Grid with improved Rust-themed cards */}
      <div className="w-full max-w-6xl mb-16 relative z-10">
        <div className="flex items-center justify-center mb-8">
          <div className="h-0.5 flex-grow bg-gradient-to-r from-transparent via-gray-800 to-transparent"></div>
          <h2 className="text-2xl font-bold px-6 text-center">
            TOOLS FOR <span className="text-red-500">DOMINATION</span>
          </h2>
          <div className="h-0.5 flex-grow bg-gradient-to-r from-transparent via-gray-800 to-transparent"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gradient-to-b from-red-800/80 to-red-950/90 rounded-xl p-6 shadow-lg border border-red-900/40 transition-all duration-300 hover:shadow-red-700/20 hover:translate-y-[-4px] relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-20 h-20 bg-red-600/20 rounded-full -mt-10 -mr-10 transition-transform group-hover:scale-[1.5] duration-500"></div>
            <div className="relative z-10">
              <div className="bg-red-800/30 p-3 rounded-lg inline-block mb-4 border border-red-700/30">
                <svg className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 007.072 0m-9.9-2.828a9 9 0 0112.728 0" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Raid Calculator</h3>
              <p className="text-gray-300 mb-4">Calculate the exact resources needed for your next raid</p>
              <button 
                onClick={() => handleNavigate("raid")}
                className="text-sm text-red-300 hover:text-white font-medium flex items-center group-hover:text-red-400"
              >
                Try it now
                <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              
              {/* Rust resource icons */}
              <div className="absolute bottom-3 right-3 opacity-30 group-hover:opacity-60 transition-opacity">
                <svg className="w-10 h-10 text-red-800" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
                </svg>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-b from-red-800/80 to-red-950/90 rounded-xl p-6 shadow-lg border border-red-900/40 transition-all duration-300 hover:shadow-red-700/20 hover:translate-y-[-4px] relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-20 h-20 bg-red-600/20 rounded-full -mt-10 -mr-10 transition-transform group-hover:scale-[1.5] duration-500"></div>
            <div className="relative z-10">
              <div className="bg-red-800/30 p-3 rounded-lg inline-block mb-4 border border-red-700/30">
                <svg className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Recycle Calculator</h3>
              <p className="text-gray-300 mb-4">Maximize your recycling efficiency and resource management</p>
              <button 
                onClick={() => handleNavigate("recycle")}
                className="text-sm text-red-300 hover:text-white font-medium flex items-center group-hover:text-red-400"
              >
                Try it now
                <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              
              {/* Rust resource icons */}
              <div className="absolute bottom-3 right-3 opacity-30 group-hover:opacity-60 transition-opacity">
                <svg className="w-10 h-10 text-red-800" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 002 2h8a2 2 0 002-2V7H6v12z"/>
                </svg>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-b from-red-800/80 to-red-950/90 rounded-xl p-6 shadow-lg border border-red-900/40 transition-all duration-300 hover:shadow-red-700/20 hover:translate-y-[-4px] relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-20 h-20 bg-red-600/20 rounded-full -mt-10 -mr-10 transition-transform group-hover:scale-[1.5] duration-500"></div>
            <div className="relative z-10">
              <div className="bg-red-800/30 p-3 rounded-lg inline-block mb-4 border border-red-700/30">
                <svg className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Excavator Calculator</h3>
              <p className="text-gray-300 mb-4">Optimize your fuel usage and resource extraction with the excavator</p>
              <button 
                onClick={() => handleNavigate("excavator")}
                className="text-sm text-red-300 hover:text-white font-medium flex items-center group-hover:text-red-400"
              >
                Try it now
                <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              
              {/* Rust resource icons */}
              <div className="absolute bottom-3 right-3 opacity-30 group-hover:opacity-60 transition-opacity">
                <svg className="w-10 h-10 text-red-800" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.12 8l-1.83-2H5v10h1.88l1.62-3.5H12v-1H8.88L10 9h4.12m11.38 1.5c0 1-1.25 1.75-1.25 1.75l-1.63-1.75.75-1.75c0 .5 1.5.5 1.5 0 0-.25-.25-.5-.5-.5-.25-.25-.4-1-.4-1 .15.5.65.5.9.25.25-.25.25-.5.25-.75s-.25-.5-.5-.5c-.5-.25-.75-.75-.75-1.25 0 0 .25.75.25 1 0 .25-.25.5-.5.5-.25-.25-.5-.75-.5-1-.5.5-.5 1-.5 1 .5.25.25.75 0 1-.25 0-.5-.5-.5-.75.25 1 0 1.25-.25 1.25l-.25-.75c-.5.5 0 1 0 1.5.25.25.5.5.5.75 0 .25-.25.5-.5.75-.12.5-.63.5-.63.5l-1.37-1.25-1.75.75 1.75 1c-5.5.75-3.75 4.25-3.75 4.25 2-1.25 3.5-.5 3.5-.5l-1.25 1.75c5-.5 5.75 3.5 5.75 3.5.5-3.25 3-3.25 3-3.25-1 1 0 2 0 2 4.75-2.75 2.25-7.5 2.25-7.5-.5 1.5-1.25 2-1.75 2-.75 0-1.25-1-1.25-1l1.75-.75-.25-2.5-2.25 1.25c.25-1.2 1.25-2 2.25-2"/>
                </svg>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-b from-red-800/80 to-red-950/90 rounded-xl p-6 shadow-lg border border-red-900/40 transition-all duration-300 hover:shadow-red-700/20 hover:translate-y-[-4px] relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-20 h-20 bg-red-600/20 rounded-full -mt-10 -mr-10 transition-transform group-hover:scale-[1.5] duration-500"></div>
            <div className="relative z-10">
              <div className="bg-red-800/30 p-3 rounded-lg inline-block mb-4 border border-red-700/30">
                <svg className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Server Tracker</h3>
              <p className="text-gray-300 mb-4">Keep track of your favorite Rust servers and player counts</p>
              <button 
                onClick={() => handleNavigate("battlemetrics")}
                className="text-sm text-red-300 hover:text-white font-medium flex items-center group-hover:text-red-400"
              >
                Try it now
                <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              
              {/* Rust resource icons */}
              <div className="absolute bottom-3 right-3 opacity-30 group-hover:opacity-60 transition-opacity">
                <svg className="w-10 h-10 text-red-800" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12,2C6.48,2 2,6.48 2,12C2,17.52 6.48,22 12,22C17.52,22 22,17.52 22,12C22,6.48 17.52,2 12,2M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9A3,3 0 0,1 15,12Z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Latest Updates Section with Rust-themed styling */}
      <div className="w-full max-w-6xl relative z-10">
        <div className="bg-gradient-to-r from-gray-900/80 via-gray-900/90 to-gray-900/80 rounded-xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="w-1 h-6 bg-red-600 mr-3"></div>
              <h2 className="text-2xl font-bold">Latest Updates</h2>
            </div>
            <span className="text-sm text-gray-400 px-3 py-1 bg-gray-800/80 rounded-full border border-gray-700/30">Development Changelog</span>
          </div>
          <CommitList />
        </div>
      </div>
      
      {/* Community Stats Section */}
      <div className="w-full max-w-6xl mt-16 mb-16 relative z-10">
        <div className="flex items-center justify-center mb-8">
          <div className="h-0.5 flex-grow bg-gradient-to-r from-transparent via-gray-800 to-transparent"></div>
          <h2 className="text-2xl font-bold px-6 text-center">
            RUST <span className="text-red-500">STATS</span>
          </h2>
          <div className="h-0.5 flex-grow bg-gradient-to-r from-transparent via-gray-800 to-transparent"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Raids Calculated Stat */}
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl p-6 border border-gray-800 shadow-lg relative overflow-hidden group">
            <div className="absolute inset-0 bg-[url('/images/rust-texture.jpg')] opacity-5 mix-blend-overlay"></div>
            <div className="absolute top-0 right-0 h-20 w-20 bg-red-600/10 rounded-full -mt-10 -mr-10"></div>
            
            <div className="relative z-10">
              <div className="bg-red-900/30 p-3 rounded-lg inline-block mb-3">
                <svg className="w-7 h-7 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              
              <div className="flex items-baseline">
                <span className="text-4xl font-bold text-white counter-value" id="raidsCalculated">13,582</span>
                <span className="text-green-500 ml-2 text-sm font-medium">+8%</span>
              </div>
              
              <h3 className="text-gray-400 text-sm mt-2">RAIDS CALCULATED</h3>
              
              <div className="mt-3 h-1 w-full bg-gray-800 rounded-full overflow-hidden">
                <div className="h-1 bg-gradient-to-r from-red-700 to-red-500 w-[68%]"></div>
              </div>
            </div>
          </div>
          
          {/* Sulfur Saved Stat - more Rust-specific */}
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl p-6 border border-gray-800 shadow-lg relative overflow-hidden group">
            <div className="absolute inset-0 bg-[url('/images/rust-texture.jpg')] opacity-5 mix-blend-overlay"></div>
            <div className="absolute top-0 right-0 h-20 w-20 bg-red-600/10 rounded-full -mt-10 -mr-10"></div>
            
            <div className="relative z-10">
              <div className="bg-red-900/30 p-3 rounded-lg inline-block mb-3">
                <svg className="w-7 h-7 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              
              <div className="flex items-baseline">
                <span className="text-4xl font-bold text-white counter-value" id="sulfurSaved">487K</span>
                <span className="text-green-500 ml-2 text-sm font-medium">+14%</span>
              </div>
              
              <h3 className="text-gray-400 text-sm mt-2">SULFUR SAVED</h3>
              
              <div className="mt-3 h-1 w-full bg-gray-800 rounded-full overflow-hidden">
                <div className="h-1 bg-gradient-to-r from-red-700 to-red-500 w-[74%]"></div>
              </div>
            </div>
          </div>
          
          {/* Scrap Recycled - more Rust-specific */}
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl p-6 border border-gray-800 shadow-lg relative overflow-hidden group">
            <div className="absolute inset-0 bg-[url('/images/rust-texture.jpg')] opacity-5 mix-blend-overlay"></div>
            <div className="absolute top-0 right-0 h-20 w-20 bg-red-600/10 rounded-full -mt-10 -mr-10"></div>
            
            <div className="relative z-10">
              <div className="bg-red-900/30 p-3 rounded-lg inline-block mb-3">
                <svg className="w-7 h-7 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              
              <div className="flex items-baseline">
                <span className="text-4xl font-bold text-white counter-value" id="scrapRecycled">192K</span>
                <span className="text-green-500 ml-2 text-sm font-medium">+17%</span>
              </div>
              
              <h3 className="text-gray-400 text-sm mt-2">SCRAP RECYCLED</h3>
              
              <div className="mt-3 h-1 w-full bg-gray-800 rounded-full overflow-hidden">
                <div className="h-1 bg-gradient-to-r from-red-700 to-red-500 w-[62%]"></div>
              </div>
            </div>
          </div>
          
          {/* Weekly Active Players - more relevant to server tracking */}
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl p-6 border border-gray-800 shadow-lg relative overflow-hidden group">
            <div className="absolute inset-0 bg-[url('/images/rust-texture.jpg')] opacity-5 mix-blend-overlay"></div>
            <div className="absolute top-0 right-0 h-20 w-20 bg-red-600/10 rounded-full -mt-10 -mr-10"></div>
            
            <div className="relative z-10">
              <div className="bg-red-900/30 p-3 rounded-lg inline-block mb-3">
                <svg className="w-7 h-7 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              
              <div className="flex items-baseline">
                <span className="text-4xl font-bold text-white counter-value" id="activeServers">2,478</span>
                <span className="text-green-500 ml-2 text-sm font-medium">+5%</span>
              </div>
              
              <h3 className="text-gray-400 text-sm mt-2">SERVERS TRACKED</h3>
              
              <div className="mt-3 h-1 w-full bg-gray-800 rounded-full overflow-hidden">
                <div className="h-1 bg-gradient-to-r from-red-700 to-red-500 w-[52%]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
     
    </main>
  );
}
