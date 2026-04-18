// components/Header.jsx
import { FaCat } from "react-icons/fa";

function Header() {
  return (
    <div className="flex flex-row items-center gap-2">
      <h1 className="text-black text-5xl font-extrabold tracking-tight">
        Cat Generator
      </h1>
      <FaCat className="text-5xl text-black" />
    </div>
  );
}

export default Header;