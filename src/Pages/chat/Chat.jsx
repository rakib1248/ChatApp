import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../router/userContest";
import Modal from "../../components/Modal";
import { MdOutlineCancel } from "react-icons/md";
import { alertToster } from "../../utils/helper";
import { delteData } from "../../Firebase/model";

const Chatmassege = () => {
  const [ismodal, setModal] = useState(false);
  const messagesEndRef = useRef(null);
  const { chat, singleUser, setLoader, setUpdate, update } =
    useContext(UserContext);
  // delete chat


  const handlPopup = (id) => {
  setUpdate((prev) => ({ ...prev, id: id }));

    setModal(true);
  };
 

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [chat]);
  const handledeletmsg = async (id) => {
    setModal(false);
    setLoader(true);

    await delteData("chat", id);
    setUpdate({ id: "", msg: "", true: false });

    setLoader(false);
    alertToster("Your Message Delete successfully!", "info");
  };

  // update Chat
  const handledataUpdate = () => {
    const selectedMessage = chat.find((item) => item.id === update.id);
    

    if (selectedMessage) {
      setUpdate({
        id: selectedMessage.id,
        msg: selectedMessage.message,
        true: true,
      });
    } else {
      setUpdate({
        id: "",
        msg: "",
        true: false,
      });
    }

    setModal(false);
  };

  return (
    <>
      <div ref={messagesEndRef}>
        {chat
          ?.sort((a, b) => a.createdAt?.seconds - b.createdAt?.seconds)
          .map((item) => {
            if (item.verifyId === singleUser.id) {
              return (
                <div
                  key={item.id}
                  className="flex items-center flex-row-reverse gap-3 mb-3 last:-pb-36">
                  <img
                    className="h-14 w-14 bg-white rounded-full object-cover"
                    src={item.photo}
                    alt={item.name}
                  />
                  <div onMouseUp={() => handlPopup(item.id)}>
                    <p className=" text-black font-semibold text-[10px] py-1 px-4 text-end rounded-2xl">
                      {item.name}
                    </p>
                    <p className="bg-[#78e378] text-white py-1 px-4 text-xl rounded-2xl">
                      {item.message}
                    </p>
                  </div>
                  <Modal isOpen={ismodal}>
                    <div className="relative">
                      <button
                        className="text-4xl absolute cursor-pointer -top-5 right-0"
                        onClick={() => setModal(false)}>
                        <MdOutlineCancel />
                      </button>
                    </div>

                    <div className="flex flex-col gap-3">
                      <button
                        onClick={() => handledataUpdate(item.id)}
                        className="w-full text-2xl cursor-pointer border-b py-2 border-[#e9e9e9]">
                        Edit message
                      </button>
                      <button
                        onClick={() => handledeletmsg(item.id)}
                        className="w-full text-2xl cursor-pointer border-b py-2 border-[#e9e9e9]">
                        Delete message
                      </button>
                    </div>
                  </Modal>
                </div>
              );
            }

            return (
              <div
                key={item.id}
                className="flex items-center gap-3 mb-3 last:-pb-36">
                <img
                  className="h-14 w-14 bg-white rounded-full object-cover"
                  src={item.photo}
                  alt={item.name}
                />
                <div>
                  <p className=" text-black font-semibold text-[10px] py-1 px-4 text-start rounded-2xl">
                    {item.name}
                  </p>

                  <p className="bg-[#F0F0F0] py-1 px-4 text-xl rounded-2xl">
                    {item.message}
                  </p>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Chatmassege;
