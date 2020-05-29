import { AppContext } from '../chat-context/chat-context';
import socket from '../../socket';

const Chat = ({ setMessages }) => {
  const { serverData, userData, setUserData } = React.useContext(AppContext);
  const [messageValue, setMessageValue] = React.useState('');
  const messagesRef = React.useRef(null);

  React.useEffect(() => {
    messagesRef.current.scrollTo(0, 999999);
  }, [serverData.messages]);

  const onSend = () => {
    if (messageValue.length === 0) {
      return;
    }

    const obj = {
      userName: userData.userName,
      text: messageValue,
      roomId: userData.roomId,
    };

    socket.emit('ROOM:NEW_MESSAGE', obj);

    setMessageValue('');
    setMessages(obj);
  };

  return (
    <main className="main-chat html-wrapper">
      <section className="main-chat__wrapper">
        <h1 className="visually-hidden">Chat room</h1>

        <div className="main-chat__left-column">
          <button
            className="main-chat__leave-button"
            type="button"
            onClick={() => {
              setUserData({ isAuth: false });
            }}
          >
            <svg className="main-chat__leave-icon" width="32" height="32">
              <use xlinkHref="#chat-leave-button"></use>
            </svg>
          </button>
          {/* <svg className="main-chat__leave-icon" width="32" height="32">
            <use xlinkHref="#chat-leave-button"></use>
          </svg> */}
          <h2 className="main-chat___caption">Room: {userData.roomId}</h2>
          <h2 className="main-chat__caption">
            Users: {serverData.users.length}
          </h2>
          <ul className="main-chat__list">
            {serverData.users.map((user, i) => {
              return (
                <li
                  className={
                    user === userData.userName
                      ? 'main-chat__list-item main-chat__list-item--active'
                      : 'main-chat__list-item'
                  }
                  key={new Date() + i}
                >
                  {user}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="main-chat__right-column">
          <div className="main-chat__right-wrapper">
            <ul ref={messagesRef} className="main-chat__message-list">
              {serverData.messages.map((message, i) => {
                return (
                  <li
                    className={
                      message.userName === userData.userName
                        ? 'main-chat__message-list-item'
                        : 'main-chat__message-list-item main-chat__message-list-item--another'
                    }
                    key={new Date() + i}
                  >
                    <p
                      className={
                        message.userName === userData.userName
                          ? 'main-chat__message-list-message'
                          : 'main-chat__message-list-message main-chat__message-list-message--another'
                      }
                    >
                      {message.text}
                    </p>
                    <span
                      className={
                        message.userName === userData.userName
                          ? 'main-chat__message-list-userName'
                          : 'main-chat__message-list-userName main-chat__message-list-userName--another'
                      }
                    >
                      {message.userName}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
          <textarea
            className="main-chat__message-input"
            rows="2"
            placeholder="type your message..."
            value={messageValue}
            onChange={(evt) => {
              setMessageValue(evt.target.value);
            }}
          ></textarea>
          <button className="main-chat__message-send" onClick={onSend}>
            <span className="visually-hidden">send</span>
            <svg
              className="main-chat__message-send-icon"
              width="24"
              height="24"
            >
              <use xlinkHref="#send-icon"></use>
            </svg>
          </button>
        </div>
      </section>
    </main>
  );
};

export default Chat;
