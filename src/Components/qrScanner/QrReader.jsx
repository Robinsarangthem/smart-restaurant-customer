import { useEffect, useRef, useState } from 'react';
import QrScanner from 'qr-scanner';
import QrFrame from '../../assets/qr-frame.svg';
import { Camera } from 'lucide-react';

const QrReader = () => {
  const scanner = useRef();
  const videoEl = useRef(null);
  const qrBoxEl = useRef(null);
  const [qrOn, setQrOn] = useState(true);
  const [scannedResult, setScannedResult] = useState('');
  const [scanning, setScanning] = useState(true);

  const onScanSuccess = (result) => {
    setScanning(false);
    setScannedResult(result?.data);
  };

  const onScanFail = (err) => {
    console.log(err);
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (videoEl?.current && !scanner.current) {
      scanner.current = new QrScanner(videoEl?.current, onScanSuccess, {
        onDecodeError: onScanFail,
        preferredCamera: 'environment',
        highlightScanRegion: true,
        highlightCodeOutline: true,
        overlay: qrBoxEl?.current || undefined,
      });

      scanner?.current
        ?.start()
        .then(() => setQrOn(true))
        .catch((err) => {
          if (err) setQrOn(false);
        });
    }

    return () => {
      if (!videoEl?.current) {
        scanner?.current?.stop();
      }
    };
  }, []);

  useEffect(() => {
    if (!qrOn) {
      alert(
        'Camera is blocked or not accessible. Please allow camera in your browser permissions and Reload.'
      );
    }
  }, [qrOn]);

  return (
    <div className='min-h-screen bg-gradient-to-b from-blue-900 to-black flex items-center justify-center p-4'>
      <div className='w-full max-w-md relative bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden'>
        {/* Header */}
        <div className='p-6 text-center border-b border-white/10'>
          <div className='flex items-center justify-center gap-2 mb-2'>
            <Camera className='w-6 h-6 text-blue-400' />
            <h2 className='text-2xl font-bold text-white'>QR Scanner</h2>
          </div>
          <p className='text-blue-200 text-sm'>
            Position the QR code within the frame
          </p>
        </div>

        {/* Scanner Area */}
        <div className='relative aspect-square'>
          {/* Overlay with gradient borders */}
          <div className='absolute inset-0 bg-black/70 z-10' />
          {/* Video Element */}
          <video
            ref={videoEl}
            className='w-full h-full object-cover'
            aria-label='QR Scanner Video Feed'
            muted
            playsInline
          >
            <track kind='captions' />
          </video>

          {/* Scanning Animation */}
          <div className='absolute inset-0 flex items-center justify-center z-20'>
            <div className='relative w-64 h-64'>
              <img
                src={QrFrame}
                alt='QR Scanner Frame'
                className='w-full h-full'
              />
              {scanning && (
                <div className='absolute inset-0 border-2 border-blue-400 animate-pulse rounded-2xl' />
              )}
            </div>
          </div>

          {/* Scanning Line Animation */}
          {scanning && (
            <div className='absolute left-1/2 -translate-x-1/2 top-0 w-64 h-1 bg-blue-500/50 z-30 animate-[scan_2s_ease-in-out_infinite]' />
          )}
        </div>

        {/* Status Footer */}
        <div className='p-6 text-center'>
          {scanning ? (
            <p className='text-blue-200 animate-pulse'>Scanning...</p>
          ) : (
            <p className='text-green-400'>QR Code detected! Redirecting...</p>
          )}
        </div>
      </div>
      {/* Handle Redirect */}
      {scannedResult && window.location.assign(scannedResult)}

      {/* Animations */}
      <style jsx>{`
        @keyframes scan {
          0%,
          100% {
            transform: translateY(0) translateX(-50%);
          }
          50% {
            transform: translateY(256px) translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
};

export default QrReader;
