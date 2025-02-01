import { useContext, useState } from "react";
import { IoMdSend } from "react-icons/io";
import { CreateDoc, updateData } from "../../Firebase/model";
import { serverTimestamp } from "firebase/firestore";
import { UserContext } from "../../router/userContest";
import { alertToster } from "../../utils/helper";

const ChatInput = () => {
  const { singleUser, setUpdate, update } = useContext(UserContext);
  const [input, setInput] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    if (update.true) {
      setUpdate((prev) => ({ ...prev, msg: value }));
    } else {
      setInput(value);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const message = update.true ? update.msg : input;
    if (!message.trim()) return; // Avoid empty messages

    try {
      if (update.true === true) {
        await updateData("chat", update.id, { message: update.msg });
        setUpdate({ id: "", msg: "", true: false });
        alertToster("Your Message Updated Successfully!");
      } else {
        await CreateDoc("chat", {
          message: input,
          photo: singleUser?.photo,
          verifyId: singleUser.id,
          name: singleUser.name,
          createdAt: serverTimestamp(),
        });
        setInput("");
        setUpdate({ id: "", msg: "", true: false });
      }
    } catch (error) {
      console.error("Error submitting message:", error);
      setUpdate({ id: "", msg: "", true: false });
      alertToster("An error. Please refresh the page.", "error");
    }
  };

  return (
    <div>
      <form
        onSubmit={handleFormSubmit}
        className="flex justify-between items-center container bg-white px-5 py-2 rounded-md">
        <input
          value={update.true ? update.msg : input}
          onChange={handleChange}
          type="text"
          placeholder="Message..."
          className="w-[95%] p-2 outline-none"
        />
        <button
          type="submit"
          aria-label="Send message"
          className="text-3xl text-end cursor-pointer w-[5%]">
          <IoMdSend />
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
