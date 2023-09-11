import React from "react";
import { services } from "../services";
import { Link } from "react-router-dom";

const TotalServiceScreen = () => {
  return (
    <section className="text-gray-600 body-font mt-10">
      <div className="container mb-10 mx-auto">
        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-10 text-center relative z-10">
          Total Smart Solutions 
        </h1>
        <div className=" grid lg:grid-cols-4 md:grid-cols-3  gap-2 flex-col items-center justify-center ">
          {services.map((item, index) => (
            <div className="shadow-lg p-3 mb-5 bg-dark rounded-lg order-sm-1 mb-sm-0 text-center">
              <Link to={item.path} className="btn btn-outline">
                <div>
                  <p className="text-center ">
                    <strong>{item.title}</strong>
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TotalServiceScreen;
