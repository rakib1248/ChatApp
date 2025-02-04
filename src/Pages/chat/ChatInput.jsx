import { useContext, useState } from "react";
import { IoMdSend } from "react-icons/io";
import { CreateDoc, updateData } from "../../Firebase/model";
import { serverTimestamp } from "firebase/firestore";
import { UserContext } from "../../router/userContest";
import { alertToster } from "../../utils/helper";
import { FaRegImage } from "react-icons/fa";
import { cloudImgUpload } from "../../utils/cloudinaryImage";

const ChatInput = () => {
  const { singleUser, setUpdate, update, setLoader } = useContext(UserContext);
  const [input, setInput] = useState("");
  const [image, setImage] = useState(false);

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

    if (image) {
      setLoader(true)
      
         const img = await cloudImgUpload({
                file: image,
                cloudName: "drpihbzih",
                preset: "test_upload",
              });
      
              try {
                if (update.true === true) {
                  await updateData("chat", update.id, { message: update.msg });
                  setUpdate({ id: "", msg: "", true: false });
                  alertToster("Your Message Updated Successfully!");
                } else {
                  await CreateDoc("chat", {
                    message: input,
                    photo: singleUser?.photo,
                    postimg: img?.secure_url,
                    verifyId: singleUser.id,
                    name: singleUser.name,
                    createdAt: serverTimestamp(),
                  });
                  setInput("");
                  setUpdate({ id: "", msg: "", true: false });
                  setImage(false)
                }
              } catch (error) {
                console.error("Error submitting message:", error);
                setUpdate({ id: "", msg: "", true: false });
                 setImage(false);
                alertToster("An error. Please refresh the page.", "error");
      }
      setLoader(false)
    } else {
          try {
            if (update.true === true) {
              await updateData("chat", update.id, { message: update.msg });
              setUpdate({ id: "", msg: "", true: false });
              alertToster("Your Message Updated Successfully!");
            } else {
              await CreateDoc("chat", {
                message: input,
                photo: singleUser?.photo,
                postimg: false,
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
    }

  };

  return (
    <div>
      <form
        onSubmit={handleFormSubmit}
        className="flex justify-between items-center container bg-white px-5 py-2 rounded-md">
        {!update.true && (
          <div className="relative w-[5%] bg-red-600">
            <input
              type="file"
              onChange={(e)=> setImage(e.target.files[0])} // Ensure you have a handleChange function to handle file selection
              className="w-full p-2 outline-none opacity-0 absolute bottom-[-20px]" // Hide the default input
            />
            <FaRegImage className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none text-2xl cursor-pointer" />{" "}
            {/* Icon */}
          </div>
        )}
        <input
          value={update.true ? update.msg : input}
          onChange={handleChange}
          type="text"
          placeholder="Message..."
          className="w-[90%] p-2 outline-none placeholder:text-start"
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
