import Chatmassege from "./chat/Chat";
import ChatInput from "./chat/ChatInput";
import Header from "./chat/header";

const Layout = () => {
  return (
    <div className="w-full">
      <div className="fixed h-screen flex flex-col justify-between">
        <div className="bg-amber-200 h-[75px] flex-shrink-0">
          <Header />
        </div>
        <div className="bg-[url('../../Screenshot_1.jpg')] bg-cover bg-center flex-grow overflow-y-auto px-3 py-2">
          <Chatmassege />
        </div>
        <div className="h-[70px] flex-shrink-0">
          <ChatInput />
        </div>
      </div>
    </div>
  );
};

export default Layout;
