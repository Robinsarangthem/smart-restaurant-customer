import React from 'react';

const PageNotfound = () => {
  return (
    <div className='min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-slate-900 to-slate-800 overflow-hidden relative p-4'>
      {/* Animated background elements */}
      <div className='absolute inset-0 w-full h-full'>
        <div className='absolute w-48 md:w-96 h-48 md:h-96 -top-10 -left-10 bg-blue-500/50 rounded-full mix-blend-multiply filter blur-xl animate-blob' />
        <div className='absolute w-48 md:w-96 h-48 md:h-96 -bottom-10 -right-10 bg-purple-500/50 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000' />
        <div className='absolute w-48 md:w-96 h-48 md:h-96 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-pink-500/50 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000' />
      </div>

      {/* Content wrapper */}
      <div className='text-center relative z-10'>
        {/* 404 Error */}
        <h1 className='text-7xl sm:text-9xl md:text-[12rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 tracking-widest animate-gradient'>
          404
        </h1>
        <div className='bg-gradient-to-r from-blue-500 to-purple-500 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-white rounded-lg rotate-12 inline-block animate-bounce-slow'>
          Page Not Found
        </div>
        {/* Message */}
        <p className='text-gray-300 mt-6 sm:mt-8 text-base sm:text-lg max-w-xs sm:max-w-md mx-auto leading-relaxed px-4'>
          Sorry, the page you're looking for has drifted into the digital void.
        </p>
        {/* Go Back Home button */}
        <div className='mt-8 sm:mt-12'>
          <a
            href='/'
            className='relative inline-flex items-center justify-center group focus:outline-none'
          >
            <span className='absolute inset-0 w-full h-full transition duration-300 transform -translate-x-1 -translate-y-1 bg-gradient-to-r from-blue-500 to-purple-500 ease-out rounded-lg group-hover:translate-x-0 group-hover:translate-y-0' />
            <span className='absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg' />
            <span className='relative px-6 sm:px-8 py-2.5 sm:py-3 text-white text-sm sm:text-md font-bold whitespace-nowrap'>
              Return Home
            </span>
          </a>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-bounce-slow {
          animation: bounce 2s infinite;
        }
        .animate-gradient {
          background-size: 200%;
          animation: gradient 8s linear infinite;
        }
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  );
};

export default PageNotfound;
