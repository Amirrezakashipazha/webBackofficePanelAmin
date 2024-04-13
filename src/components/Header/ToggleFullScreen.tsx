import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const ToggleFullScreen = () => {

    const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    const checkFullScreen = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };
    checkFullScreen();
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullScreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
    };
  }, []);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen()
    }
  };

  return (
    <Link
    to="#"
    onClick={toggleFullScreen}
    className="relative flex h-8.5 w-8.5 items-center justify-center rounded-full border-[0.5px] border-stroke bg-gray hover:text-primary dark:border-strokedark dark:bg-meta-4"
  >
    

    {isFullScreen?
    <svg 
    className='fill-current duration-300 ease-in-out text-[rgb(100, 116, 139)] dark:text-white hover:text-[rgb(239, 244, 251)]'
    xmlns="http://www.w3.org/2000/svg" width="14px" height="14px" viewBox="0 0 14 14" version="1.1">
    <g id="Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="Outlined" transform="translate(-139.000000, -3481.000000)">
            <g id="Navigation" transform="translate(100.000000, 3378.000000)">
                <g id="Outlined-/-Navigation-/-fullscreen_exit" transform="translate(34.000000, 98.000000)">
                    <g>
                        <polygon id="Path" points="0 0 24 0 24 24 0 24"/>
                        <path d="M5,16 L8,16 L8,19 L10,19 L10,14 L5,14 L5,16 Z M8,8 L5,8 L5,10 L10,10 L10,5 L8,5 L8,8 Z M14,19 L16,19 L16,16 L19,16 L19,14 L14,14 L14,19 Z M16,8 L16,5 L14,5 L14,10 L19,10 L19,8 L16,8 Z" fill="currentColor"/>
                    </g>
                </g>
            </g>
        </g>
    </g>
</svg>
    
    :<svg
      className='fill-current duration-300 ease-in-out text-[rgb(100, 116, 139)] dark:text-white hover:text-[rgb(239, 244, 251)]'
      xmlns="http://www.w3.org/2000/svg"
      width="14px"
      height="14px"
      viewBox="0 0 14 14">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g transform="translate(-173.000000, -3481.000000)">
          <g transform="translate(100.000000, 3378.000000)">
            <g transform="translate(68.000000, 98.000000)">
              <g>
                <polygon points="0 0 24 0 24 24 0 24" />
                <path d="M7,14 L5,14 L5,19 L10,19 L10,17 L7,17 L7,14 Z M5,10 L7,10 L7,7 L10,7 L10,5 L5,5 L5,10 Z M17,17 L14,17 L14,19 L19,19 L19,14 L17,14 L17,17 Z M14,5 L14,7 L17,7 L17,10 L19,10 L19,5 L14,5 Z" fill="currentColor" />
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>}
  </Link>
  )
}

export default ToggleFullScreen