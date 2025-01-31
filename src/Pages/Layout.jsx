import Chatmassege from "./chat/Chat";
import ChatInput from "./chat/ChatInput";
import Header from "./chat/header";

const Layout = () => {
  return (
    <div className="w-full h-screen flex flex-col">
      {/* Header Section */}
      <header className="bg-amber-200 h-16 flex-shrink-0">
        <Header />
      </header>

      {/* Chat Messages Section */}
      <main className="flex-grow bg-[url('../../Screenshot_1.jpg')] bg-cover bg-center overflow-y-auto px-3 py-2">
        <Chatmassege />
      </main>

      {/* Chat Input Section */}
      <footer className="h-20 flex-shrink-0">
        <ChatInput />
      </footer>
    </div>
  );
};

export default Layout;
