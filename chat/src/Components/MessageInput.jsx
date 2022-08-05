import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import React, { useState, useEffect, useRef } from 'react';

import { useTranslation } from 'react-i18next';
import { useWebSockets, useAppContext } from '../Hooks/index.js';

function MessageInput() {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const inputEl = useRef();

  useEffect(() => {
    const user = localStorage.getItem('username');
    inputEl.current.focus();
    return user ? setUsername(user) : setUsername('');
  }, [message]);

  const { activeChannelId } = useAppContext();
  const { t } = useTranslation();
  const { addNewMessage } = useWebSockets();

  return (
    <Form
      className="mb-3 py-1 border rounded-2"
      onSubmit={(e) => {
        e.preventDefault();
        const data = {
          ...message,
          channelId: activeChannelId,
          username,
        };
        if (message.length !== 0) {
          addNewMessage(data);
        }
        setMessage('');
      }}
    >
      <InputGroup>
        <Form.Control
          className="border-0 p-0 ps-2 form-control"
          placeholder={t('enterMessage')}
          aria-label={t('newMessage')}
          aria-describedby="basic-addon1"
          value={message}
          ref={inputEl}
          onChange={(e) => {
            e.preventDefault();
            setMessage(e.target.value);
          }}
        />

        <Button type="submit" className="btn btn-primary btn-group-vertical">
          { t('send') }
        </Button>
      </InputGroup>
    </Form>
  );
}
export default MessageInput;
