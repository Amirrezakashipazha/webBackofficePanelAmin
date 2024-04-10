import React from 'react';

const FullScreenButton = () => {
    const goFullScreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch((e) => {
                console.error(`Error attempting to enable full-screen mode: ${e.message} (${e.name})`);
            });
        } else if (document.exitFullscreen) {
            document.exitFullscreen().catch((e) => {
                console.error(`Error attempting to disable full-screen mode: ${e.message} (${e.name})`);
            });
        }
    };

    return (
        <button onClick={goFullScreen}>Toggle Fullscreen</button>
    );
};

export default FullScreenButton;
