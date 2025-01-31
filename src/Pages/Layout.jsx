import { useEffect, useRef } from "react";
import Chatmassege from "./chat/Chat";
import ChatInput from "./chat/ChatInput";

import Header from "./chat/header";

const Layout = () => {
    const messagesEndRef = useRef(null);
   useEffect     (() => {
     messagesEndRef.current?.scrollIntoView({
       behavior: "smooth",
       block: "end",
     });
   }, []);
 
  return (
    <div className="w-full">
      <div className="fixed h-screen flex  flex-col justify-between container ">
        <div className="bg-amber-200 h-[75px]">
          <Header />
        </div>
        <div
          ref={messagesEndRef}
          className="bg-[url('../../Screenshot_1.jpg')] bg-cover bg-center h-[95%] overflow-auto px-3 py-2">
          <Chatmassege />
        </div>
        <div className=" h-[70px]">
          <ChatInput />
        </div>
      </div>
    </div>
  );
};

export default Layout;
