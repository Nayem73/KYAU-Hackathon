import { React, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import farmIcon from "../imgs/farm.png";

// Actions
import { logout } from "../actions/userActions";
import { listCrops } from "../actions/cropActions";

// Components
import SearchBox from "./SearchBox";
import { listDiseases } from "../actions/diseaseActions";

import NotificationMenu from "../components/NotificationMenu";

function Header() {
  const history = useNavigate();
  const dispatch = useDispatch();

  // __________________User INformations_____________________//
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // __________________Log out handler_____________________//
  const logOutHandler = () => {
    dispatch(logout());
    history("/");
  };

  // __________________Crop list for option slector_____________________//
  const cropList = useSelector((state) => state.cropList);
  const { crops } = cropList;

  useEffect(() => {
    dispatch(listCrops());
  }, [dispatch]);

  const options = [
    {
      value: null,
      label: "select",
    },
  ];
  if (crops) {
    crops.map((crop) =>
      options.push({
        value: crop.title,
        label: crop.title,
      })
    );
  }

  const [selectedOption, setSelectedOption] = useState(null);

  const selectedCrop = (selected) => {
    setSelectedOption(selected);
  };

  //  _______________________________dropdown__________________________//
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  //___________________________Header_______________________//

  const reloadAndNavigate = () => {
    dispatch(listDiseases()); // Dispatch the action
    history("/"); // Navigate to the specified route
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  return (
    <nav className="navbar bg-base-100 top-0 shadow-xl">
      <div className=" container  top-0 mx-auto flex ">
        <div className="flex-auto justify-around ">
          <button
            onClick={reloadAndNavigate}
            className="btn btn-outline normal-case text-xl"
          >
            <span className="hover:bg-white hidden sm:block">
              <img
                src={farmIcon}
                alt="sv icon"
                width="30px"
                className="mr-1 "
              />
            </span>
            <Link to="/">Enayetpur Smart Village</Link>
          </button>
        </div>
        <div className="relative inline-block ml-6 mr-10">
          <button
            className="text-gray-700 hover:text-gray-900 focus:outline-none focus:text-gray-900"
            onClick={toggleDropdown}
          >
            Services
            <svg
              className={`w-4 h-4 inline ml-2 transition-transform transform ${
                isOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </button>
          {isOpen && (
            <div
              className="absolute right-0 mt-2 py-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-20"
              onClick={closeDropdown}
            >
              <Link
                to="/aisearch"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
              >
                AI Firming
              </Link>
              <Link
                to="/add-notice"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
              >
                Add Notice
              </Link>
              <Link
                to="/addvertise"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
              >
                Sell | Buy Product
              </Link>
              <Link
                to="/e-learning"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
              >
                E-Learning
              </Link>
              <Link
                to="/employment"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
              >
                Employment
              </Link>
              <Link
                to="/health-care"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
              >
                Health Care
              </Link>
              <Link
                to="/donation"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
              >
                Donation
              </Link>
              <Link
                to="/digital-citizen-service"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
              >
                Digital Citizen
              </Link>
              <Link
                to="/contact"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
              >
               Contact With Expert 
              </Link>
            </div>
          )}
        </div>
        <div className="searchBox_id1">
          <SearchBox crop={selectedOption} />
        </div>
        <div className="flex-none">
          {/* ai search */}
          <div className="dropdown dropdown-end pl-3">
            <Link to={"/aisearch/"}>
              <div className="">
                <label className="btn btn-ghost btn-circle">
                  <div className="indicator">
                    <i className="fa-solid fa-camera-retro fa-xl"></i>
                  </div>
                </label>
              </div>
            </Link>
          </div>

          {/* ai search end */}
          {/* notification */}

          {/* <div className="dropdown dropdown-end header_dropdown">
                        <label tabIndex={1} className="btn btn-ghost btn-circle">
                            <div className="indicator">
                            <i className="fa-solid fa-bell fa-xl"></i>
                                <span className="badge badge-sm indicator-item">{totalNotifications}</span>
                            </div>
                        </label>
                        <ul tabIndex={1} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            {notifications.map((notification) => (
                                    <li>
                                        <button onClick={() => deleteHandler(notification)} className="btn btn-ghost btn-circle">
                                            <div className="indicator">
                                                <i className="fa-solid fa-trash fa-xl"></i>
                                            </div>
                                        </button>
                                    </li>
                                )
                            )}
                            
                        </ul>
                    </div>  */}

          <NotificationMenu userInfo={userInfo} />

          {/* notification end */}

          {userInfo ? (
            <div
              className={`dropdown dropdown-end ${
                isDropdownOpen ? "open" : ""
              } header_dropdown`}
            >
              <label
                tabIndex={0}
                className="btn btn-ghost btn-circle avatar"
                onClick={handleDropdownToggle}
              >
                <svg
                  className="w-7 h-7"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm0-12c-2.209 0-4 1.791-4 4s1.791 4 4 4 4-1.791 4-4-1.791-4-4-4zm7 12h-2v-1c0-1.657-1.343-3-3-3H10c-1.657 0-3 1.343-3 3v1H5c-1.104 0-2 .896-2 2v2c0 1.104.896 2 2 2h14c1.104 0 2-.896 2-2v-2c0-1.104-.896-2-2-2zm-7 3a3 3 0 0 0 0-6 3 3 0 0 0 0 6z"></path>
                </svg>
              </label>
              {isDropdownOpen && (
                <ul
                  tabIndex={0}
                  className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li className="searchBox_id2">
                    <Select
                      className="p-0 bg-dark rounded-lg ml-5"
                      options={options}
                      onChange={selectedCrop}
                    />
                  </li>
                  <li className="searchBox_id2">
                    <SearchBox crop={selectedOption} />
                  </li>

                  <li>
                    <Link to={"/profile"} className="justify-between">
                      {userInfo.username}
                    </Link>
                  </li>
                  <li>
                    <Link to={"/review"} className="justify-between">
                      Review
                    </Link>
                  </li>
                  {userInfo && userInfo.isAdmin === true && (
                    <li>
                      <Link to={"/admin/userlist"}>Users</Link>
                    </li>
                  )}
                  {userInfo && userInfo.isAdmin === true && (
                    <li>
                      <Link to={"/admin/disease/"}>Diseases</Link>
                    </li>
                  )}
                  {userInfo && userInfo.isAdmin === true && (
                    <li>
                      <Link to={"/admin/crop/"}>Crops</Link>
                    </li>
                  )}
                  {userInfo && userInfo.isAdmin === true && (
                    <li>
                      <Link to={"/admin/subscriptions"}>Subscriptions</Link>
                    </li>
                  )}

                  <li onClick={logOutHandler}>
                    <a>Logout</a>
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <div className="dropdown dropdown-end header_dropdown">
              <label tabIndex={1} className="btn btn-ghost btn-circle avatar">
                <i className="fa-solid fa-bars"></i>
              </label>
              <ul
                tabIndex={1}
                className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li className="searchBox_id2">
                  <Select
                    className="p-0 bg-dark rounded-lg ml-5"
                    options={options}
                    onChange={selectedCrop}
                  />
                </li>
                <li className="searchBox_id2">
                  <SearchBox crop={selectedOption} />
                </li>

                <li>
                  <Link to={"/review"} className="justify-between">
                    Review
                  </Link>
                </li>

                <li>
                  <Link to={"/login"} className="font-bold justify-between">
                    Log in
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;
