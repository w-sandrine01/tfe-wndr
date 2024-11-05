import React, { createContext, useState, useContext } from 'react';


const AudioContext = createContext();

export function AudioProvider({ children }) {
    const [isMuted, setIsMuted] = useState(false);

    const toggleMute = () => {
        setIsMuted((prev) => !prev);
    };

    return (
        <AudioContext.Provider value={{ isMuted, toggleMute }}>
            {children}
        </AudioContext.Provider>
    );
}

export function useAudio() {
    return useContext(AudioContext);
}
