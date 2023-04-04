import { useEffect } from "react";

import useTypedSelector from "src/hooks/UseTypedSelector";
import useActions from "src/hooks/useActions";
// import useTypedSelector from "src/hooks/useTypedSelector";

function App() {
  const actions = useActions();
  const state = useTypedSelector(state => state);

  useEffect(() => {
    console.log("user is now", state.user);
    // actions.updateUser({ email: "luis@gmail.com", password: "12345" });
  }, [actions, state.user]);

  return (
    <div className="wrapper">
      {"user is " + state.user}
      <p>email is {state.user.email}</p>
      <div className="buttons-wrapper">
        <button onClick={() => actions.setUser({ email: "trenedex@gmail.com", password: "1234podhj5" })}>
          update user
        </button>
      </div>
    </div>
  );
}

export default App;
