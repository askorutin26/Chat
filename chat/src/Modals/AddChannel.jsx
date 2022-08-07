import React, { useEffect, useState, useRef } from 'react';

import { Modal, FormGroup, FormControl } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { useWebSockets, useAppContext } from '../Hooks/index.js';
import { setShow } from '../slices/modals.js';

function AddChannel() {
  const dispatch = useDispatch();
  const inputEl = useRef();
  useEffect(() => {
    inputEl.current.focus();
  });

  const { t } = useTranslation();

  const [channelName, setChannelName] = useState('');
  const [ERR, setError] = useState(false);

  const { addNewChannel } = useWebSockets();
  const { channels, modals } = useAppContext();
  const schema = yup.object({
  name: yup.mixed().notOneOf(channels.map((elem) => elem.name), 'already exists' ),
  });
  return (
    <Modal show={modals.add}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          schema.validate({ name: channelName }).then(() => {
            addNewChannel({ name: channelName });
            dispatch(setShow({ add: false }));
            setError(false);
            setChannelName('');
          }).catch((error) => {
            setError(true);
            console.log(error); 
          });
        }}
      >
        <Modal.Header>
          <Modal.Title>
            { t('Modals.addChannel') }
          </Modal.Title>
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
              id="name"
              name="name"
              ref={inputEl}
              onChange={(e) => {
                e.preventDefault();
                setChannelName(e.target.value);
              }}
            />
            <label className="visually-hidden" htmlFor="name">
              { t('Modals.channelName') }
            </label>
            { ERR && (
            <p className="text-danger">
              { t('Modals.channelExists') }
            </p>
            ) }
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <input className="btn btn-primary" type="submit" value={t('Modals.send')} />
          <button
            type="button"
            className="btn btn-secondary"
            value="close"
            onClick={(e) => {
              e.preventDefault();
              dispatch(setShow({ add: false }));
            }}
          >
            { ' ' }
            { t('Modals.cancel') }
            { ' ' }
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}
export default AddChannel;
