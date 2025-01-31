const Loader = () => {
  return (
    <div className="fixed inset-0 z-[9999999] flex justify-center items-center  bg-opacity-50 bg-[#ffffff9b]">
      <div className="flex flex-col items-center">
        <img className="w-16 mb-4" src="../../giphy.gif" alt="Loading" />
        <p className="text-gray-700 text-lg font-semibold">
          Loading, please wait...
        </p>
      </div>
    </div>
  );
};

export default Loader;
