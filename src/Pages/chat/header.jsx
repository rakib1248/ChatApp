import { useContext } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { FaPhone } from "react-icons/fa";
import { UserContext } from "../../router/userContest";

const Header = () => {
  const { singleUser } = useContext(UserContext);
  return (
    <>
      <div className="flex justify-between items-center container bg-white px-6 py-2">
        <div className="flex items-center gap-3">
          <img
            className="h-13 w-13 rounded-full object-cover"
            src={singleUser.photo}
            alt=""
          />
          <div>
            <h1 className="font-semibold">{singleUser.name}</h1>
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
    </>
  );
};

export default Header;
