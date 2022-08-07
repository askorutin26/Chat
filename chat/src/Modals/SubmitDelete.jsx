import React from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useWebSockets, useAppContext } from '../Hooks/index.js';

import { setShow } from '../slices/modals.js';

function SubmitDelete() {
  console.log('SUBMIT DELETE RENDERED');
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { removeChannel } = useWebSockets();
  const { channels, modals, idToChange } = useAppContext();

  const channelToDelete = channels.find((channel) => channel.id === idToChange);
  console.log(channelToDelete);
  const name = (
    <p className="font-weight-bold">
      { `"${channelToDelete.name}"` }
    </p>
  );

  return (
    <Modal show={modals.remove}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          removeChannel({ id: idToChange });
          dispatch(setShow({ remove: false }));
        }}
      >
        <Modal.Header>
          <Modal.Title>
            { t('Modals.submitDeletion') }
          </Modal.Title>
          <button
            type="button"
            aria-label="Close"
            data-bs-dismiss="modal"
            className="btn btn-close"
            onClick={(e) => {
              e.preventDefault();
              dispatch(setShow({ remove: false }));
            }}
          />
        </Modal.Header>
        <Modal.Body>
          <h4 className="font-weight-normal">
            { ' ' }
            { `${t('Modals.submitDeleteChannel')}` }
            { name }
            { ' ' }
          </h4>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-danger" type="submit">
            { t('Modals.delete') }
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            value="close"
            onClick={(e) => {
              e.preventDefault();
              dispatch(setShow({ remove: false }));
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

export default SubmitDelete;
