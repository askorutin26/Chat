import React from 'react';

import i18n from 'i18next';
import { initReactI18next, I18nextProvider } from 'react-i18next';

import { Provider } from 'react-redux';
import leoProfanity from 'leo-profanity';
import ru from './locales/ru.js';
import store from './slices/index.js';
import App from './App.jsx';

import { SocketProvider, AuthProvider, AppProvider } from './Context';

const init = async (socket) => {
  const clearRU = leoProfanity.getDictionary('ru');
  leoProfanity.add(clearRU);
  i18n.use(initReactI18next).init({
    lng: 'ru',
    debug: true,
    resources: {
      ru,
    },
  });

  const vdom = (
    <Provider store={store}>
      <AppProvider>

        <SocketProvider socket={socket}>
          <I18nextProvider i18n={i18n}>
            <AuthProvider>
              <App />
            </AuthProvider>
          </I18nextProvider>
        </SocketProvider>

      </AppProvider>
    </Provider>
  );
  return vdom;
};

export default init;
