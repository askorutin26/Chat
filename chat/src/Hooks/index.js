import { useContext } from 'react';

import { SocketContext, AppContext, AuthContext } from '../Context/index.js';

export const useAuthContext = () => useContext(AuthContext);
export const useAppContext = () => useContext(AppContext);
export const useWebSockets = () => useContext(SocketContext);
