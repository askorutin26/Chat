import React, { useEffect, useState, useRef } from 'react';

import { Modal, FormGroup, FormControl } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useWebSockets, useAppContext } from '../Hooks/index.js';
import { setShow } from '../slices/modals.js';

const AddChannel = () => {
  const dispatch = useDispatch();
  const inputEl = useRef();
  useEffect(() => {
    inputEl.current.focus();
  });

  const { t } = useTranslation();

  const [channelName, setChannelName] = useState('');

  const { addNewChannel } = useWebSockets();
  const { channels, modals } = useAppContext();

  const [error, setError] = useState('');

  return (
    <Modal show={modals.add}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const alreadyExists = channels.find(
            (channel) => channel.name === channelName
          );
          if (alreadyExists !== undefined) {
            setError('The channel with this name already exists');
          } else {
            addNewChannel({ name: channelName });
            dispatch(setShow({ add: false }));
            setChannelName('');
          }
        }}
      >
        <Modal.Header>
          <Modal.Title>{t('addChannel')}</Modal.Title>
          <button
            type="button"
            aria-label="Close"
            data-bs-dismiss="modal"
            className="btn btn-close"
            onClick={(e) => {
              e.preventDefault();
              dispatch(setShow({ add: false }));
            }}
          />
        </Modal.Header>
        <Modal.Body>
          <FormGroup>
            <FormControl
              value={channelName}
              id = 'name'
              name = 'name'
              ref={inputEl}
              onChange={(e) => {
                e.preventDefault();
                setChannelName(e.target.value);
              }}
            />
            <label className = 'visually-hidden' htmlFor="name">{t('channelName')}</label>
            {error && <p className="text-danger">{t('channelExists')}</p>}
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <input className="btn btn-primary" type="submit" value={t('send')} />
          <button
            type="button"
            className="btn btn-secondary"
            value="close"
            onClick={(e) => {
              e.preventDefault();
              dispatch(setShow({ add: false }));
            }}
          >
            {' '}
            {t('cancel')}{' '}
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};
export default AddChannel;
