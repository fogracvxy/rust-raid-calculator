import React from 'react';

interface MapPlaceholderProps {
  serverId?: string;
  serverName?: string;
}

const MapPlaceholder: React.FC<MapPlaceholderProps> = ({ serverId, serverName }) => {
  return (
    <div className="w-full h-36 bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col items-center justify-center p-4">
      <svg 
        className="h-10 w-10 text-gray-700 mb-3" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={1.5} 
          d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" 
        />
      </svg>
      <div className="text-center">
        <p className="text-gray-500 text-xs mb-1">
          Map thumbnail unavailable
        </p>
        {serverName && (
          <p className="text-gray-400 text-xs">
            <span className="text-red-400">Server:</span> {serverName}
          </p>
        )}
        {serverId && (
          <p className="text-gray-600 text-xs mt-1">
            ID: {serverId}
          </p>
        )}
      </div>
    </div>
  );
};

export default MapPlaceholder; 