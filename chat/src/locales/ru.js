const ru = {
  translation: {
    title: 'Hexlet Chat',
    Login: {
      logIn: 'Войти',
      username: 'Ваш ник',
      password: 'Пароль',
    },
    Signup: {
      signupUser: 'Имя пользователя',
      password: 'Пароль',
      repeatPassword: 'Подтвердите пароль',
      signingUp: 'Регистрация',
      signUp: 'Зарегистрироваться',
    },
    SignupBlock: {
      noProfile: 'Нет аккаунта',
      signingUp: 'Регистрация',
  },
    Channels: {
      delete: 'Удалить',
      rename: 'Переименовать',
      channelControl: 'Управление каналом',
  },
    Chat: {
      channels: 'Каналы',
      connectionError: 'Ошибка соединения',
  },
    MessageInput: {
      enterMessage: 'Введите сообщение',
      newMessage: 'Новое сообщение',
      send: 'Отправить',
  },
    Navigation: {
      logOut: 'Выйти',
  },

    Modals: {
      addChannel: 'Добавить канал',
      channelName: 'Имя канала',
      renameChannel: 'Переименовать канал',
      channelExists: 'Такой канал уже существует',
      submitDeletion: 'Подтвердить удаление',
      submitDeleteChannel: 'Вы уверены что хотите удалить канал',
      send: 'Отправить',
      cancel: 'Отменить',
      delete: 'Удалить',
    },
    Notify: {
      channelCreated: 'Канал создан',
      channelRenamed: 'Канал переименован',
      channelRemoved: 'Канал удалён',
  },

    message_one: '{{count}} сообщение',
    message_few: '{{count}} сообщения',
    message_many: '{{count}} сообщений',

    loginErrors: { authError: 'Неверные имя пользователя или пароль' },
    signupErrors: {
      incorrectSignupData: 'Неверные имя пользователя или пароль',
      userExists: 'Такой пользователь уже существует',
      passwordsMismatch: 'Пароли должны совпадать',
      usernameRequired: 'Введите имя пользователя',
      passwordRequired: 'Введите пароль',
      shortUsername: 'От 3 до 20 символов',
      longUsername: 'От 3 до 20 символов',
      shortPassword: 'Не менее 6 символов',
    },
  },
};

export default ru;
