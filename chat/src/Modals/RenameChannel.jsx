import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Modal, FormGroup, FormControl } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useWebSockets, useAppContext } from '../Hooks/index.js';
import { setShow } from '../slices/modals.js';

const RenameChannel = () => {
  const dispatch = useDispatch();
  const inputEl = useRef();
  useEffect(() => {
    inputEl.current.focus();
  });
  const { t } = useTranslation();
  const { renameChannel } = useWebSockets();
  const { channels, modals, idToChange } = useAppContext();
  console.log(idToChange);
  const [channelName, setChannelName] = useState('');
  const [error, setError] = useState('');
  const channelToRename = channels.find(
    (channel) => channel.id === Number(idToChange)
  );

  const alreadyExists = channels.find(
    (channel) => channel.name === channelName
  );
  const { id, removable, ...rest } = channelToRename;
  const name = Object.values(rest).join('');

  return (
    <Modal show={modals.rename}>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          if (alreadyExists !== undefined) {
            setError('The channel with this name already exists');
          } else {
            renameChannel({ id: idToChange, name: channelName });
            dispatch(setShow({ rename: false }));
          }
        }}
      >
        <Modal.Header>
          <Modal.Title>
{`${t('renameChannel')} "${name}" ?`}
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
              id = 'name'
              name = 'name'
              ref={inputEl}
              onChange={(e) => {
                e.preventDefault();
                setChannelName(e.target.value);
              }}
            />
                        <label className = 'visually-hidden' htmlFor="name">
{t('channelName')}
</label>
            {error && <p className="text-danger">
{t('channelExists')}
</p>}
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
            }}
          >
            {' '}
            {t('cancel')}
{' '}
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};
export default RenameChannel;
