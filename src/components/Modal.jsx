const Modal = ({ isOpen, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-40">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
        {children}
      </div>
    </div>
  );
};

export default Modal;
