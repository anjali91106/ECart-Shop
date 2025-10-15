import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useState } from "react";
import { Input } from "./ui/input";
import { Search, ShoppingBasketIcon } from "lucide-react";

const Menu = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  function handleSearch() {
    navigate(`/search-products?q=${search}`);
    setSearch("");
  }

  return (
    <div className="pb-10">
      <nav className="w-full fixed top-0 left-0 bg-white/70 backdrop-blur-md shadow-sm z-[10000]">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          {/* <!-- Logo --> */}
          <div className="text-xl font-semibold text-gray-800">
            ShopSphare
          </div>

          {/* <!-- Links --> */}
          <ul className="flex space-x-8 text-gray-700">
            <li><Link to={"/"}>Home</Link></li>
            <li>About</li>
            <li>Services</li>
            <li>Contact</li>
            <li><ShoppingBasketIcon/></li>
          </ul>

          {/* search */}
                    <span className="flex">
                        <Input
                            placeholder="Search"
                            value={search}
                            onChange={(e) => (setSearch(e.target.value))}
                        />
                        <Button onClick={handleSearch}><Search /></Button>
                    </span>

          {/* <!-- Button --> */}
          <Button onClick={() => { navigate('sign-up') }}>
            Get Started
          </Button>
        </div>
      </nav>
    </div>
  )
}

export default Menu
