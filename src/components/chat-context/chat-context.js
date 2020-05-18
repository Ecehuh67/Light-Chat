const AppContext = React.createContext(null);

const ChatProvider = (props) => {
  const [isAuth, setAuth] = React.useState(false);
  const [roomNumber, setRoomNumber] = React.useState('');
  const [userName, setUsername] = React.useState('');

  const sampleAppContext = {
    isAuth,
    setAuth
  }

  return (
    <AppContext.Provider
      value={sampleAppContext}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default ChatProvider;
export {AppContext};