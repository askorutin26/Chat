import React, { createContext } from "react";

import { useSelector } from "react-redux";

import { channelsSelectors } from "../slices/channels";

import { messagesSelectors } from "../slices/messages.js";

const AppContext = createContext({});

function AppProvider({ children }) {
  const channels = useSelector(channelsSelectors.selectAll);
  const messages = useSelector(messagesSelectors.selectAll);
  const currentChannelId = useSelector((state) => state.currentChannel).id
    .payload;
  const modals = useSelector((state) => state.modals);
  const { idToChange } = modals;
  const appProps = {
    channels,
    messages,
    currentChannelId,
    modals,
    idToChange
  };
  return <AppContext.Provider value={appProps}>{children}</AppContext.Provider>;
}
export { AppProvider };
export { AppContext };
