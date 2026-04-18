// components/VoteButtons.jsx
import { BiUpvote } from "react-icons/bi";
import { BiSolidUpvote } from "react-icons/bi";
import { BiDownvote } from "react-icons/bi";
import { BiSolidDownvote } from "react-icons/bi";

function VoteButtons({ onUpvote, onDownvote, currentVote }) {
  return (
    <div className="flex flex-row gap-6 mt-4">
      {/* Botão Upvote */}
      <div 
        className={`group bg-amber-400 hover:bg-amber-500 px-4 py-4 rounded-2xl shadow-md transition-all duration-200 cursor-pointer ${
          currentVote === true ? "scale-105" : ""
        }`}
        onClick={onUpvote}
      >
        <BiUpvote className="block group-hover:hidden text-white text-xl" />
        <BiSolidUpvote className="hidden group-hover:block text-white text-xl" />
      </div>

      {/* Botão Downvote */}
      <div 
        className={`group bg-amber-700 hover:bg-amber-800 px-4 py-4 rounded-2xl shadow-md transition-all duration-200 cursor-pointer ${
          currentVote === false ? " scale-105" : ""
        }`}
        onClick={onDownvote}
      >
        <BiDownvote className="block group-hover:hidden text-white text-xl" />
        <BiSolidDownvote className="hidden group-hover:block text-white text-xl" />
      </div>
    </div>
  );
}

export default VoteButtons;