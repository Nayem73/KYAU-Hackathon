import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import Loader from "../components/Loader";
import Message from "../components/Message";
import DiseaseCard from "../components/DiseaseCard";
import { listDiseases } from "../actions/diseaseActions";
// import {sliderPicture} from '../actions/pictureActions';

import Slider from "../components/Slider";

import Paginate from "../components/Paginate";
import TotalServiceScreen from "./TotalServiceScreen";
import ServiceSlider from "../components/ServiceSlider";
import smartVillage from "../imgs/smartVillage.jpg";

function HomeScreen() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const crop_title = queryParams.get("crop");
  const search = queryParams.get("search");

  const dispatch = useDispatch();

  const diseaseList = useSelector((state) => state.diseaseList);
  const { loading, error, diseases, cur_page, total_page } = diseaseList;

  // const pictureSlider = useSelector(state => state.pictureSlider);
  // const { error:errorSliser, diseases:diseaseSlider } = pictureSlider;

  useEffect(() => {
    if (crop_title && search) {
      dispatch(listDiseases({ crop: crop_title, search: search }));
    } else if (crop_title) {
      dispatch(listDiseases({ crop: crop_title }));
    } else if (search) {
      dispatch(listDiseases({ search: search }));
    } else {
      dispatch(listDiseases());
    }
  }, [dispatch, crop_title, search]);

  // useEffect(() => {
  //     dispatch(sliderPicture())
  // }, [dispatch])

  return (
    <>
      <div className=""></div>
      {/* {loading ? (<Loader />) : error ? <></> :<Slider items={diseases}/>} */}
      {/* <Slider items={diseases} /> */}
      {/* <ServiceSlider /> */}
      <main className="relative flex">
        <div className="flex-1 px-40 pt-40  z-10 relative bg-opacity-60 bg-black">
          <div className="mb-6">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-white relative z-10">
              Smart Village
            </h1>
            <p className="lg:w-1/2 w-full leading-relaxed text-white relative z-10 hidden sm:block">
              A "Smart Village" is a concept and development approach aimed at
              improving the quality of life and well-being of rural communities
              through the integration of technology, innovation, and sustainable
              practices. The idea is similar to that of "Smart Cities," but it
              is specifically tailored to rural and remote areas.
            </p>
            <button className="btn btn-outline-info mt-4 relative z-10">
              <Link to="/aisearch">Get Started Now</Link>
            </button>
          </div>
        </div>
        <div className="flex-2 absolute inset-0">
          <img
            src={smartVillage}
            alt="Image Alt Text"
            className="w-full h-full"
            style={{ height: "420px" }}
          />
        </div>
      </main>

      <TotalServiceScreen />
      <div className="lg:px-20 mt-10">
        {loading ? (
          <Loader />
        ) : error ? (
          <Message message={error} />
        ) : (
          <div className="my-10">
            <h1 className="text-3xl text-bold text-center my-10">
              "Enayetpur Smart Villagers: Unveiling Our Premier AI Feature"
            </h1>
            <div className=" grid lg:grid-cols-5 md:grid-cols-3  gap-2 flex-col items-center justify-center ">
              {diseases.map((disease) => (
                <DiseaseCard key={disease.id} disease={disease} />
              ))}
            </div>
          </div>
        )}
        <div className="flex justify-center m-10">
          {loading ? (
            <></>
          ) : error ? (
            <></>
          ) : (
            <Paginate
              pages={total_page}
              page={cur_page}
              dispatcher_action={listDiseases}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default HomeScreen;
