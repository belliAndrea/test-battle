import React, { useContext } from "react";

const context = React.createContext(null);

export const usePlayer = () => useContext(context);

export const PlayerProvider = context.Provider;
