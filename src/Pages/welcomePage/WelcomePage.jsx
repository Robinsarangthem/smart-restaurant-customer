import React, { useState } from 'react';
import { Button } from '@/Components/ui/button';
import QrReader from '@/Components/qrScanner/QrReader';

export default function WelcomePage() {
  const [openCam, setOpenCam] = useState(false);
  return (
    <div className='bg-gradient-to-br from-purple-900 via-slate-800 to-blue-900 flex flex-col items-center min-h-[100svh] py-12'>
      <div className='animate-fade-in-down'>
        <div className='bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 text-transparent bg-clip-text font-bold text-center'>
          <h2 className='text-5xl font-extrabold py-3 bg-gradient-to-r from-emerald-400 via-cyan-500 to-blue-600 text-transparent bg-clip-text drop-shadow-[0_0_25px_rgba(255,255,255,0.1)]'>
            Welcome to Achaathak!
          </h2>
          <p className='text-xl text-white/90 font-medium mt-2'>
            Scan your table number
          </p>
        </div>
      </div>
      <div className='py-12 flex justify-center flex-col gap-4 px-6'>
        <Button
          className='bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 text-white font-semibold py-6 px-8 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105'
          onClick={() => setOpenCam(!openCam)}
        >
          {openCam ? 'Close' : 'Open'} QR Scanner
        </Button>
      </div>
      {openCam && (
        <div className='w-full max-w-md p-4'>
          <QrReader />
        </div>
      )}
    </div>
  );
}
