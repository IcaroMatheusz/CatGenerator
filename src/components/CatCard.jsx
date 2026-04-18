// components/CatCard.jsx
import LoadingSkeleton from "./LoadingSkeleton";
import { BiSolidUpvote } from "react-icons/bi";
import { BiSolidDownvote } from "react-icons/bi";

function CatCard({
  imagem,
  loading,
  imgLoaded,
  onLoad,
  totalUpvotes,
  totalDownvotes,
}) {
  return (
    <div className="bg-white max-w-md w-full rounded-2xl shadow-xl overflow-hidden mt-5">
      {/* Área da imagem */}
      <div className="aspect-video flex items-center justify-center bg-white">
        {(!imgLoaded || loading) && <LoadingSkeleton />}

        {imagem?.url && (
          <img
            src={imagem.url}
            alt="Just a cat"
            onLoad={onLoad}
            className={`transition-opacity duration-500 shadow-md
              ${imgLoaded ? "opacity-100" : "opacity-0"}`}
          />
        )}
      </div>

      {/* Legenda e contador de votos */}
      <div className="p-4 text-center">
        <p className="text-gray-600 text-sm font-semibold">
          Clique nos botões para votar neste gatinho!
        </p>

        {totalUpvotes > 0 || totalDownvotes > 0 ? (
          <div className="mt-2 flex items-center justify-center gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <BiSolidUpvote className="text-gray-600 text-2xl" />
              <span>{totalUpvotes}</span>
            </div>
            <div className="flex items-center gap-1">
              <BiSolidDownvote className="text-gray-600 text-2xl" />
              <span>{totalDownvotes}</span>
            </div>
          </div>
        ) : (
          <div className="mt-2 text-xs text-gray-400">
            Seja o primeiro a votar! 🐱
          </div>
        )}
      </div>
    </div>
  );
}

export default CatCard;
