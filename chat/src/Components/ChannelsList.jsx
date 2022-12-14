import React from 'react';
import { useDispatch } from 'react-redux';

import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ListGroup from 'react-bootstrap/ListGroup';

import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import { setActiveChannel } from '../slices/channels.js';

import { useAppContext } from '../Hooks/index.js';

import { setShow, setId } from '../slices/modals.js';

function RemovableButton({ props }) {
  const {
    id, name, isActive, btnClass, dispatch,
    t,
  } = props;

  return (
    <Dropdown as={ButtonGroup} bsPrefix="d-flex dropdown btn-group">
      <Button
        id={id}
        variant="success"
        bsPrefix={btnClass}
        onClick={(e) => {
          e.preventDefault();
          dispatch(setActiveChannel(id));
        }}
      >
        <span className="me-1"># </span>
        { name }
      </Button>
      <Dropdown.Toggle
        split
        bsPrefix={`${
          isActive ? 'btn-secondary' : 'btn-light'
        } flex-grow-0 dropdown-toggle dropdown-toggle-split btn`}
        id="dropdown-split-basic"
      >
        { ' ' }
        <span className="visually-hidden">
          {t('Channels.channelControl')}
        </span>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item
          href="#/action-1"
          onClick={(e) => {
            e.preventDefault();
            dispatch(setId(id));
            dispatch(setShow({ remove: true }));
          }}
        >
          { t('Channels.delete') }
        </Dropdown.Item>
        <Dropdown.Item
          href="#/action-2"
          onClick={(e) => {
            e.preventDefault();
            dispatch(setId(id));
            dispatch(setShow({ rename: true }));
          }}
        >
          { t('Channels.rename') }
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
function NonRemovableButton({ props }) {
  const {
    id, name, btnClass, dispatch,
  } = props;
  return (
    <Button
      id={id}
      variant="success"
      bsPrefix={btnClass}
      onClick={(e) => {
        e.preventDefault();
        dispatch(setActiveChannel(id));
      }}
    >
      <span className="me-1">
        #
      </span>
      { name }
    </Button>
  );
}

function ChannelsList() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { channels, activeChannelId } = useAppContext();

  return channels.map((channel) => {
    const { removable, id, name } = channel;
    const isActive = id === activeChannelId;

    const btnClass = cn(
      'btn',
      'w-100',
      'rounded-0',
      'text-start',
      'text-truncate',
      { 'btn-secondary': isActive },
    );
    const props = {
      id,
      name,
      isActive,
      btnClass,
      dispatch,
      t,
    };
    return (
      <ListGroup.Item
        id={id}
        key={id}
        bsPrefix="nav-item w-100"
        onClick={(e) => {
          e.preventDefault();
          // const { id } = e.target.dataset;
        }}
      >
        { removable ? (
          <RemovableButton props={props} />
        ) : (
          <NonRemovableButton props={props} />
        ) }
      </ListGroup.Item>
    );
  });
}

export default ChannelsList;
