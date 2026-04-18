// components/FeedbackMessage.jsx
function FeedbackMessage({ feedback, onClose }) {
  if (!feedback) return null;
  
  return (
    <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg text-white font-semibold z-50 animate-bounce transition-all duration-300 ease-in-out ${
      feedback.type === "success" ? "bg-green-500" : "bg-red-500"
    } `}>
      {feedback.text}
      <button onClick={onClose} className="ml-4">✕</button>
    </div>
  );
}

export default FeedbackMessage;