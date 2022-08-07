import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Modal, FormGroup, FormControl } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { useWebSockets, useAppContext } from '../Hooks/index.js';
import { setShow } from '../slices/modals.js';

function RenameChannel() {
  const dispatch = useDispatch();
  const inputEl = useRef();
  useEffect(() => {
    inputEl.current.focus();
  });
  const { t } = useTranslation();
  const { renameChannel } = useWebSockets();
  const { channels, modals, idToChange } = useAppContext();

  const [channelName, setChannelName] = useState('');
  const [ERR, setError] = useState(false);
  const channelToRename = channels.find(
    (channel) => channel.id === Number(idToChange),
  );
  const schema = yup.object({name: yup.mixed().notOneOf(channels.map((elem) => elem.name), 'already exists' ),
});

  const { id, removable, ...rest } = channelToRename;
  const name = Object.values(rest).join('');

  return (
    <Modal show={modals.rename}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          schema.validate({ name: channelName }).then(() => {
            renameChannel({ id: idToChange, name: channelName });
            dispatch(setShow({ rename: false }));
            setError(false);
          }).catch((error) => {
            setError(true);
            console.log(error);
          })
        }}
      >
        <Modal.Header>
          <Modal.Title>
            { `${t('Modals.renameChannel')} "${name}" ?` }
          </Modal.Title>
          <button
            type="button"
            aria-label="Close"
            data-bs-dismiss="modal"
            className="btn btn-close"
            onClick={(e) => {
              e.preventDefault();
              dispatch(setShow({ rename: false }));
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
export default RenameChannel;
