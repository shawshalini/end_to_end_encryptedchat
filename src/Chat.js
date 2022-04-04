import { ChatEngine } from "react-chat-engine";
import { useEffect, useState } from "react";
import ChatFeed from "./components/ChatFeed";
import LoginForm from "./components/LoginForm";
import "./App.css";


const projectID = "0288bf2c-6383-4ed4-98ae-5503ec2ff135";

const Chat = () => {
  const [load, setLoad] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
      window.location.reload();
  };
  useEffect(() => {
    // getChecking();
  }, [load]);
  return (
    <>
      <div className="divbtn" >
        <button type="submit" className="button btn_log">
          <span onClick={() => handleLogout()} >Logout</span>
        </button>
      </div>

      <ChatEngine
        height="90vh"
        projectID={projectID}
        userName={localStorage.getItem("username")}
        userSecret={localStorage.getItem("password")}
        renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
        onNewMessage={() =>
          new Audio(
            "https://chat-engine-assets.s3.amazonaws.com/click.mp3"
          ).play()
        }
      />
    </>
  );
};

// infinite scroll, logout, more customizations...

export default Chat;
