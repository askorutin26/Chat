import React from 'react';
import { useAppContext } from '../Hooks/index.js';

const filter = require('leo-profanity');

function Messages() {
  const { messages, currentChannelId } = useAppContext();

  const channelMessages = messages.filter(
    (message) => message.channelId === currentChannelId
  );

  return channelMessages.map((message) => {
    const { body, id, username } = message;
    return (
      <div className="text-break mb-2" id={id} key={id}>
        <b>{username}</b>: {filter.clean(body)}
      </div>
    );
  });
}
export default Messages;
