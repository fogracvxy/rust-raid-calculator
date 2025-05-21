export default function Loading() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="relative w-20 h-20">
        <div className="absolute top-0 left-0 right-0 bottom-0 rounded-full border-2 border-transparent border-t-red-600 animate-spin"></div>
        <div className="absolute top-2 left-2 right-2 bottom-2 rounded-full border-2 border-transparent border-r-red-600 animate-spin animation-delay-150"></div>
        <div className="absolute top-4 left-4 right-4 bottom-4 rounded-full border-2 border-transparent border-b-red-600 animate-spin animation-delay-300"></div>
        <div className="absolute inset-0 flex items-center justify-center text-red-600 text-xs font-mono">RUST</div>
      </div>
    </div>
  );
} 