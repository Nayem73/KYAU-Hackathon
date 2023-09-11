import { useForm } from "react-hook-form";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import AdvertiseCard from "./AddvertiseCard";
import { addNoticeListAction, createNotice } from "../actions/addNoticeActions";
import AddNoticeCard from "./AddNoticeCard";

const AddNoticeScreen = () => {
  const dispatch = useDispatch();
  const { register, reset, handleSubmit, setValue } = useForm();
  const noticeList = useSelector((state) => state.noticeList);
  console.log(noticeList);
  const { loading, error, notice, cur_page, total_page } = noticeList;

  useEffect(() => {
    dispatch(addNoticeListAction());
  }, [dispatch]);

  const onSubmit = (data) => {
    const formDataToSend = new FormData();
    formDataToSend.append("title", data.title);
    formDataToSend.append("description", data.description);
    dispatch(createNotice(formDataToSend));
    reset();
  };

  return (
    <div className="lg:px-20 mt-10">
      <h1 className="text-3xl text-bold my-5">
        Add Only Authentic And Important Notice For Smart Village
      </h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message message={error} />
      ) : (
        <div className=" grid lg:grid-cols-3 md:grid-cols-3  sm:grid-cols-1 gap-5 flex-col items-center justify-center ">
          {notice.map((item, index) => (
            <AddNoticeCard key={index} item={item} />
          ))}
        </div>
      )}
      <div className="my-8 rounded">
        <div className="rounded">
          <h2 className="text-2xl my-5">Add Notice for Your Village Product</h2>
          <form
            className="bg-slate-100 px-10 py-5 rounded"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="sm:col-span-3">
              <label
                htmlFor="title"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Title <span className="text-red-500"> *</span>
              </label>
              <div className="mt-2">
                <input
                  {...register("title", {
                    required: "Title is required",
                  })}
                  type="text"
                  name="title"
                  id="title"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-full">
              <label
                htmlFor="description"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Description <span className="text-red-500"> *</span>
              </label>
              <div className="mt-2">
                <textarea
                  {...register("description", {
                    required: "Description is required",
                  })}
                  name="description"
                  className="input-text "
                  id="description"
                  placeholder="Notes about your order, e.g. special notes for delivery."
                  rows="3"
                  cols="60"
                ></textarea>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add Notice
              </button>
            </div>
          </form>
        </div>
      </div>
      ;
    </div>
  );
};

export default AddNoticeScreen;
