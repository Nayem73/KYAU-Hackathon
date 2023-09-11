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

const Navbar = () => {
  // new
  const [searchQuery, setSearchQuery] = useState("");
  const [showUserCheckbox, setShowUserCheckbox] = useState(false);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleUserCheckboxChange = (e) => {
    setShowUserCheckbox(e.target.checked);
  };
  //   new end
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

  return (
    <nav className="bg-blue-500 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-white text-xl font-semibold mr-4">
            <img src={farmIcon} alt="sv icon" width="30px" className="mr-1" />
            Smart Village
          </h1>
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="bg-white focus:outline-none border-2 border-blue-300 rounded-lg py-2 px-4"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button className="absolute right-3 top-2 text-blue-500">
              {/* You can add a search icon here */}
              Search
            </button>
          </div>
        </div>

        <div className="flex items-center">
          <label className="text-white mr-2">
            Show User Checkbox
            <input
              type="checkbox"
              className="ml-1"
              checked={showUserCheckbox}
              onChange={handleUserCheckboxChange}
            />
          </label>
          {showUserCheckbox && (
            <div className="text-white">
              {/* Display user checkbox content here */}
              User Checkbox Content
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
