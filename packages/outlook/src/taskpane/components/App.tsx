import React, { FC } from "react";

const App: FC = () => {
  const handleSignIn = () => {
    Office.context.ui.displayDialogAsync("https://localhost:3000/auth/microsoft", (resp) => {
      console.log('resp', resp);
    });
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <div>
        <h1>
          Welcome To AgreeTo
        </h1>
      </div>
      <div>
        <span>
          With AgreeTo you can share your availability with others in three clicks
        </span>
      </div>
      <div style={{ paddingTop: '40px' }}>
        <button onClick={handleSignIn}>
          Sign in with Microsoft
        </button>
      </div>
    </div>
  );
};

export default App;
