import React, { useRef, useEffect } from 'react';
import { useAppContext } from '../Hooks/index.js';

const filter = require('leo-profanity');

function Messages() {
  const { messages, activeChannelId } = useAppContext();
  const refElem = useRef();
  useEffect(() => {
    if (refElem.current !== undefined) {
      refElem.current.scrollIntoView();
    }
  }, [messages]);

  const channelMessages = messages.filter(
    (message) => message.channelId === activeChannelId,
  );

  return channelMessages.map((message) => {
    const { body, id, username } = message;

    return (
      <div className="text-break mb-2" id={id} key={id} ref={refElem}>
        <b>
          { username }
        </b>
        :
        { filter.clean(body) }
      </div>
    );
  });
}
export default Messages;
