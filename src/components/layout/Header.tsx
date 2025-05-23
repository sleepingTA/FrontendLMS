import React, { useEffect, useRef, useState } from 'react'
import { FaShoppingCart } from "react-icons/fa";
import { Link } from 'react-router-dom';


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [user, setUser] = useState({ avatar: 'https://i.pravatar.cc/150?img=32' });

  const handleToggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <header className="flex shadow-md sm:px-10 px-6 py-3 bg-white min-h-[70px]">
      <div className="flex w-full max-w-screen-xl mx-auto">
        <div
          className="flex flex-wrap items-center justify-between relative lg:gap-y-4 gap-y-4 gap-x-4 w-full">

          <div className="flex items-center">
            <button onClick={handleToggleMenu} className="cursor-pointer" aria-label="Open menu">
              <svg className="w-8 h-8" fill="#000" viewBox="0 0 20 20">
                <path fillRule="evenodd" clipRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
              </svg>
            </button>
            <Link to="/" onClick={() => setIsOpen(false)} className="ml-6">
              <img src="https://readymadeui.com/readymadeui.svg" alt="logo" className="w-32 max-sm:hidden" />
              <img src="https://readymadeui.com/readymadeui-short.svg" alt="logo" className="w-7 h-7 hidden max-sm:block" />
            </Link>
          </div>

          <div
            className="bg-gray-100 flex items-center border max-md:order-1 border-transparent focus-within:border-black focus-within:bg-transparent px-4 rounded-sm h-10 min-w-[40%] lg:w-2/4 max-md:w-full transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192.904 192.904"
              className="fill-gray-400 mr-4 w-4 h-4">
              <path
                d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z">
              </path>
            </svg>
            <input type='email' placeholder='Search...' className="w-full outline-none bg-transparent text-slate-900 text-sm" />
          </div>

          <div className="flex items-center space-x-4 max-md:ml-auto">
            <Link to="/cart" type="button" className="border-0 outline-0 flex items-center justify-center rounded-full p-2 hover:bg-gray-100 transition-all">
              <FaShoppingCart />
            </Link>

            <button
              type="button"
              className="border-0 outline-0 flex items-center justify-center rounded-full p-2 hover:bg-gray-100 transition-all"
              onClick={toggleDropdown}
            >
              {isAuthenticated ? (
                <img
                  src={user.avatar}
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 cursor-pointer fill-black"
                  viewBox="0 0 512 512"
                >
                  <path d="M337.711 241.3a16 16 0 0 0-11.461 3.988c-18.739 16.561-43.688 25.682-70.25 25.682s-51.511-9.121-70.25-25.683a16.007 16.007 0 0 0-11.461-3.988c-78.926 4.274-140.752 63.672-140.752 135.224v107.152C33.537 499.293 46.9 512 63.332 512h385.336c16.429 0 29.8-12.707 29.8-28.325V376.523c-.005-71.552-61.831-130.95-140.757-135.223zM446.463 480H65.537V376.523c0-52.739 45.359-96.888 104.351-102.8C193.75 292.63 224.055 302.97 256 302.97s62.25-10.34 86.112-29.245c58.992 5.91 104.351 50.059 104.351 102.8zM256 234.375a117.188 117.188 0 1 0-117.188-117.187A117.32 117.32 0 0 0 256 234.375zM256 32a85.188 85.188 0 1 1-85.188 85.188A85.284 85.284 0 0 1 256 32z" />
                </svg>
              )}
            </button>

            {isOpen && (
              <ul className="absolute top-full mt-2 bg-white shadow-lg z-50 min-w-[160px] rounded border">
                {isAuthenticated ? (
                  <>
                    <li className="px-5 py-3 hover:bg-gray-100 cursor-pointer">
                      <Link to="/profile" onClick={() => setIsOpen(false)} >
                        Settings
                      </Link>
                      </li>
                    <li className="px-5 py-3 hover:bg-gray-100 cursor-pointer">
                      <Link to="/mycourses" onClick={() => setIsOpen(false)} >
                        My Course
                      </Link>
                    </li>
                    <li
                      className="px-5 py-3 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setIsAuthenticated(false); // giả lập logout
                        setIsOpen(false);
                      }}
                    >
                      Log Out
                    </li>
                  </>
                ) : (
                  <>
                    <li className="px-5 py-3 hover:bg-gray-100 cursor-pointer">Login</li>
                    <li className="px-5 py-3 hover:bg-gray-100 cursor-pointer">Register</li>
                  </>
                )}
              </ul>
            )}

          </div>
        </div>

        <div
          className={`${isMenuOpen ? 'block' : 'hidden'} before:fixed before:bg-black before:opacity-40 before:inset-0 max-lg:before:z-50`}>
          <button onClick={handleToggleMenu} className="fixed top-2 right-4 z-[100] rounded-full bg-white w-9 h-9 flex items-center justify-center border border-gray-200 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 fill-black" viewBox="0 0 320.591 320.591">
              <path
                d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                data-original="#000000"></path>
              <path
                d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                data-original="#000000"></path>
            </svg>
          </button>

          <ul className="block space-x-4 space-y-3 fixed bg-white w-1/2 min-w-[300px] top-0 left-0 p-4 h-full shadow-md overflow-auto z-50">
            <li className="pb-4 px-3">
              <a href="javascript:void(0)"><img src="https://readymadeui.com/readymadeui.svg" alt="logo" className="w-36" />
              </a>
            </li>
            <li className="border-b border-gray-300 pb-4 px-3 hidden">
              <a href="javascript:void(0)"><img src="https://readymadeui.com/readymadeui.svg" alt="logo" className="w-36" />
              </a>
            </li>
            <li className="border-b border-gray-300 py-3 px-3">
              <a href='javascript:void(0)' className="hover:text-blue-700 text-blue-700 block font-medium text-base">Home</a>
            </li>
            <li className="border-b border-gray-300 py-3 px-3"><a href='javascript:void(0)'
              className="hover:text-blue-700 text-slate-900 block font-medium text-base">Team</a>
            </li>
            <li className="border-b border-gray-300 py-3 px-3"><a href='javascript:void(0)'
              className="hover:text-blue-700 text-slate-900 block font-medium text-base">Feature</a>
            </li>
            <li className="border-b border-gray-300 py-3 px-3"><a href='javascript:void(0)'
              className="hover:text-blue-700 text-slate-900 block font-medium text-base">Blog</a>
            </li>
            <li className="border-b border-gray-300 py-3 px-3"><a href='javascript:void(0)'
              className="hover:text-blue-700 text-slate-900 block font-medium text-base">About</a>
            </li>
            <li className="border-b border-gray-300 py-3 px-3"><a href='javascript:void(0)'
              className="hover:text-blue-700 text-slate-900 block font-medium text-base">Contact</a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
}

export default Header;
