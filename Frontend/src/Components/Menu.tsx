import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useState } from "react";
import { Input } from "./ui/input";
import { Heart, Search, ShoppingBasketIcon } from "lucide-react";

const Menu = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  function handleSearch() {
    navigate(`/search-products?q=${search}`);
    setSearch("");
  }

  // const userDataSignup = localStorage.getItem("data");
  // console.log(userDataSignup, "local userData")
  const userDataLogin = localStorage.getItem("userLoginInfo");
  console.log(userDataLogin, "Login user info")

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
            <li><Link to={"/"} className="link">Home</Link></li>
            <li><Link to={'about'} className="link">About</Link></li>
            <li><Link to={'services'} className="link">Services</Link></li>
            <li><Link to={'contact'} className="link">Contact</Link></li>
            <li><Heart/></li>
            <Button className="bg-none" 
              onClick={() => {
                navigate('/cart')
              }
            }
            >
                <ShoppingBasketIcon className=""/>
            </Button>
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
            {userDataLogin === null || userDataLogin === '' || userDataLogin === undefined ? "Sign-Up" : `${userDataLogin}`}
          </Button>
        </div>
      </nav>
    </div>
  )
}

export default Menu
