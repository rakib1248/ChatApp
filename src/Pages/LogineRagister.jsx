import { useContext, useState } from "react";
import useInput from "../hooks/useInput";
import { CreateDoc, getAllDoc } from "../Firebase/model";
import { UserContext } from "../router/userContest";
import { cloudImgUpload } from "../utils/cloudinaryImage";
import { alertToster } from "../utils/helper";

const LogineRagister = () => {
  const { setUser, setLoader, setSingleUser } = useContext(UserContext);
  const [image, setImage] = useState();

  const [isLogin, setIsLogin] = useState(true);
  const { input, setInput, handleInputChange } = useInput({
    name: "",
    email: "",
    password: "",
  });

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      // Handle login logic
      setLoader(true);

      const users = await getAllDoc("users");
      const user = users.find(
        (user) => user.email === input.email && user.password === input.password
      );

      if (user) {
        setUser(true);
        localStorage.setItem("user", JSON.stringify(user));
        alertToster("Your Account Logine Successfully!");
            try {
              const userData = JSON.parse(localStorage.getItem("user"));

              if (userData) {
                setSingleUser(userData);
                setUser(true);
              } else {
                setUser(false);
                setSingleUser({});
              }
            } catch (error) {
              console.error("Error parsing user data:", error);
              setUser(false);
              setSingleUser({});
            }
        setLoader(false);
      } else {
        setLoader(false);
        alertToster("invlid password or username", "error");
      }

      setInput({
        name: "",
        email: "",
        password: "",
      });
    } else {
      // Handle signup logic
      setLoader(true);
      const img = await cloudImgUpload({
        file: image,
        cloudName: "drpihbzih",
        preset: "test_upload",
      });
      await CreateDoc("users", { ...input, photo: img.secure_url });

      setIsLogin(true);
      alertToster("Your Account Create Successfully!");

      setInput({
        name: "",
        email: "",
        password: "",
      });
      setLoader(false);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-700">
          <h1>Create Your Account Enjoy the Group Chating</h1>
          {isLogin ? "Login" : "Sign Up"}
        </h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  onChange={handleInputChange}
                  value={input.name}
                  name="name"
                  id="name"
                  className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="photo"
                  className="block text-sm font-medium text-gray-700">
                  Your Photo
                </label>
                <input
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                  id="photo"
                  className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </>
          )}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              onChange={handleInputChange}
              value={input.email}
              name="email"
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="you@example.com"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              onChange={handleInputChange}
              value={input.password}
              name="password"
              id="password"
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-500 focus:outline-none">
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
        <div className="mt-4 text-center">
          <button
            onClick={toggleForm}
            className="text-blue-600 hover:underline focus:outline-none">
            {isLogin
              ? "Don't have an account? Sign up"
              : "Already have an account? Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogineRagister;
