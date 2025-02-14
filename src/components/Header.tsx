import { Search } from "lucide-react";

export default function Header() {
  return (
    <nav className="flex items-center justify-between p-3 sm:p-4 border-b">
      <div className="flex items-center">
        <p className="text-[#1877f2] text-xl sm:text-2xl font-bold">facebook</p>
      </div>
      <div className="flex items-center bg-[#F0F2F5] rounded-full px-3 sm:px-4 py-1.5 sm:py-2">
        <Search className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-[#65676B]" />
        <input
          type="text"
          placeholder="Search"
          className="bg-transparent outline-none text-sm sm:text-base w-24 sm:w-auto text-[#65676B] placeholder-[#65676B]"
        />
      </div>
    </nav>
  );
}
