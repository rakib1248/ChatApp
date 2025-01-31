import { useEffect, useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { FaPhone } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import {
  CreateDoc,
  delteData,
  getAllDoc,
  RealTime,
  updateData,
} from "../Firebase/model";
import { serverTimestamp } from "firebase/firestore";
import Modal from "../components/Modal";
import { MdOutlineCancel } from "react-icons/md";
import { alertToster } from "../utils/helper";

const Home = () => {
  const scrolling = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  };

 

  const [uptoDate, setUptodate] = useState(false);
  const [chat, setChat] = useState([]);
  const userData = JSON.parse(localStorage.getItem("user"));

  const messagesEndRef = useRef(null);
  const [input, setInput] = useState("");
  const [msg, setMsg] = useState("");
  const [previousChatLength, setPreviousChatLength] = useState(
    chat?.length || 0
  );
  const [delid, setDelid] = useState({ id: "", msg: "" });
  const [isopen, setIsopen] = useState(false);

  const handleChange = (e) => {
    setInput(e.target.value);
    setMsg(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return; // Avoid sending empty messages

    const userData = JSON.parse(localStorage.getItem("user"));
    await CreateDoc("chat", {
      message: input,
      photo: userData.photo,
      verifyId: userData.id,
      name: userData.name,
      createdAt: serverTimestamp(),
    });
    setInput("");
    scrolling();
  };

  const playSound = () => {
    const audio = new Audio("../../mixkit-access-allowed-tone-2869.wav");
    audio.play();
  };

  const handleDelete = (id, msg) => {
    setIsopen(true);
    setDelid({ id, msg });
  };

  const handledeletmsg = async () => {
    await delteData("chat", delid.id);
    setDelid({ id: "", msg: "" });
    setIsopen(false);
    alertToster("Your Message Delete successfully!", "info");
  };

  const handledataUpdate = () => {
    console.log("Editing message:", delid.msg);
    setMsg(delid.msg);
    setUptodate(true);
    setIsopen(false);
  };

  const handleFormUpdate = async (e) => {
    e.preventDefault();
    if (!delid.id) return;

    console.log("Updating message with ID:", delid.id);
    await updateData("chat", delid.id, { message: msg });

    alertToster("Your Message Update Successfully!");
    setMsg("");
    setInput("");
    setDelid({ id: "", msg: "" });
    setUptodate(false);
  };

  useEffect(() => {
     setInterval(() => {
       scrolling();
     }, 10000);
    getAllDoc("chat");
    RealTime("chat", setChat);

    // if (!isopen) {
    //   setDelid({ id: "", msg: "" });
    // }

    if (chat?.length > previousChatLength) {
      playSound();
      setPreviousChatLength(chat?.length);
    }

    // messagesEndRef.current?.scrollIntoView({
    //   behavior: "smooth",
    //   block: "nearest",
    // });
  }, [chat, previousChatLength, isopen]);

  return (
    <>
      <div className="container mx-auto relative h-screen overflow-auto">
        <div className="fixed top-0 w-fit container">
          <div className="flex justify-between items-center container bg-white px-6 py-2">
            <div className="flex items-center gap-3">
              <img
                className="h-14 rounded-full object-cover"
                src={userData.photo}
                alt=""
              />
              <div>
                <h1 className="font-semibold">{userData.name}</h1>
                <p className="text-[#8e8e8e]">Active Now</p>
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <i className="text-2xl text-[#8e8e8e] cursor-pointer">
                <CiSearch />
              </i>
              <i className="text-2xl text-[#8e8e8e] cursor-pointer">
                <FaPhone />
              </i>
              <i className="text-2xl text-[#8e8e8e] cursor-pointer">
                <BsThreeDotsVertical />
              </i>
            </div>
          </div>
        </div>

        <Modal isOpen={isopen} onClose={setIsopen}>
          <div className="relative">
            <button
              className="text-4xl absolute cursor-pointer -top-5 right-0"
              onClick={() => setIsopen(false)}>
              <MdOutlineCancel />
            </button>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={handledataUpdate}
              className="w-full text-2xl cursor-pointer border-b py-2 border-[#e9e9e9]">
              Edit message
            </button>
            <button
              onClick={handledeletmsg}
              className="w-full text-2xl cursor-pointer border-b py-2 border-[#e9e9e9]">
              Delete message
            </button>
          </div>
        </Modal>

        <div className="my-18 px-5 py-3 h-[95%] overflow-auto">
          <div ref={messagesEndRef}>
            {chat
              ?.sort((a, b) => a.createdAt?.seconds - b.createdAt?.seconds)
              .map((item) => {
                if (item.verifyId === userData.id) {
                  return (
                    <div
                      key={item.id}
                      className="flex items-center flex-row-reverse gap-3 mb-3 last:-pb-36">
                      <img
                        className="h-14 bg-white rounded-full object-cover"
                        src={item.photo}
                        alt={item.name}
                      />
                      <p
                        onMouseUp={() => handleDelete(item.id, item.message)}
                        className="bg-[#78e378] text-white py-1 px-4 text-xl rounded-2xl">
                        {item.message}
                      </p>
                    </div>
                  );
                }

                return (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 mb-3 last:-pb-36">
                    <img
                      className="h-14 bg-white rounded-full object-cover"
                      src={item.photo}
                      alt={item.name}
                    />
                    <p className="bg-[#F0F0F0] py-1 px-4 text-xl rounded-2xl">
                      {item.message}
                    </p>
                  </div>
                );
              })}
          </div>
        </div>

        <div className="px-3  w-fit container relative bottom-[68px]">
          <div>
            {uptoDate ? (
              <form
                onSubmit={handleFormUpdate}
                className="flex justify-between items-center container bg-white px-5 py-2 rounded-md">
                <input
                  value={msg}
                  onChange={handleChange}
                  type="text"
                  placeholder="Message..."
                  className="w-[95%] p-2 outline-none"
                />
                <button
                  type="submit"
                  className="text-3xl text-end cursor-pointer w-[5%]">
                  <IoMdSend />
                </button>
              </form>
            ) : (
              <form
                onSubmit={handleFormSubmit}
                className="flex justify-between items-center container bg-white px-5 py-2 rounded-md">
                <input
                  value={input}
                  onChange={handleChange}
                  type="text"
                  placeholder="Message..."
                  className="w-[95%] p-2 outline-none"
                />
                <button
                  type="submit"
                  className="text-3xl text-end cursor-pointer w-[5%]">
                  <IoMdSend />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
