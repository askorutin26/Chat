import React, { useEffect } from 'react';
import { useDispatch, batch } from 'react-redux';

import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';

import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { useAuthContext, useAppContext } from '../Hooks/index.js';

import AddChannel from '../Modals/AddChannel.jsx';
import ChannelList from './ChannelsList.jsx';
import Messages from './Messages.jsx';
import MessageInput from './MessageInput.jsx';

import SubmitDelete from '../Modals/SubmitDelete.jsx';
import RenameChannel from '../Modals/RenameChannel.jsx';

import { setShow } from '../slices/modals.js';
import { addChannels } from '../slices/channels.js';
import { addMessages } from '../slices/messages.js';
import { setCurrentChannel } from '../slices/currentChannel.js';

import routes from '../routes.js';

function Chat() {
  console.log('CHAT');
  const { loginPage } = routes;
  const AuthContext = useAuthContext();
  const { logOut } = AuthContext;
  const notifyError = (message) => toast.error(message, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem('token');

    const header = { Authorization: `Bearer ${token}` };
    const path = routes.dataPath();
    axios
      .get(path, { headers: header })
      .then((response) => {
        const { data } = response;

        const { channels, messages, currentChannelId } = data;

        const normilizedChannels = channels.map((channel) => {
          const {
            id, name, removable, ...rest
          } = channel;
          const normalizedName = !name ? Object.values(rest).join('') : name;
          return { id, name: normalizedName, removable };
        });

        const normalizedMessages = messages.map((message) => {
          const {
            channelId, id, username, ...rest
          } = message;
          const messageText = Object.values(rest).join('');
          return {
            body: messageText,
            channelId,
            id,
            username,
          };
        });

        batch(() => {
          dispatch(addChannels(normilizedChannels));
          dispatch(addMessages(normalizedMessages));
          dispatch(setCurrentChannel(currentChannelId));
        });
      })
      .catch((error) => {
        console.log(error);
        logOut();
        navigate(loginPage());
        notifyError(t('connectionError'));
      });
  }, [dispatch, logOut, loginPage, navigate, t]);
  const {
    channels, messages, currentChannelId, modals,
  } = useAppContext();
  const currentChannelName = currentChannelId
    ? channels.find((channel) => channel.id === currentChannelId).name
    : null;
  const messagesCount = messages.filter(
    (message) => message.channelId === currentChannelId,
  ).length;

  return (
    <>
      { modals.add && <AddChannel /> }
      { modals.remove && <SubmitDelete /> }
      { modals.rename && <RenameChannel /> }
      <ToastContainer />
      <Container bsPrefix="container h-100 my-4 overflow-hidden rounded shadow">
        <Container bsPrefix="row h-100 bg-white flex-md-row">
          <Container bsPrefix="col-4 col-md-2 border-end pt-5 px-0 bg-light">
            <Container bsPrefix="d-flex justify-content-between mb-2 ps-4 pe-2">
              <span>
                { t('channels') }
              </span>
              <button
                type="button"
                className="p-0 text-primary btn btn-group-vertical"
                onClick={(e) => {
                  e.preventDefault();
                  batch(() => {
                    dispatch(setShow({ add: true }));
                  });
                }}
              >
                +
              </button>
            </Container>
            <ListGroup>
              { channels && <ChannelList /> }
            </ListGroup>
          </Container>
          <Container bsPrefix="col p-0 h-100">
            <Container bsPrefix="d-flex flex-column h-100">
              <Container bsPrefix="bg-light mb-4 p-3 shadow-sm small">
                <p className="m-0">
                  { currentChannelName && (
                  <b>
                    #
                    { currentChannelName }
                  </b>
                  ) }
                </p>
                <span className="text-muted">
                  { ' ' }
                  { t('message', { count: messagesCount }) }
                  { ' ' }
                </span>
              </Container>
              <Container
                id="messages-box"
                bsPrefix="chat-messages overflow-auto px-5"
              >
                { messages && <Messages /> }
              </Container>
              <Container bsPrefix="mt-auto px-5 py-3">
                <MessageInput />
              </Container>
            </Container>
          </Container>
        </Container>
      </Container>
    </>
  );
}
export default Chat;
