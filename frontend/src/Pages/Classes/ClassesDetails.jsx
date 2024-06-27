import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { FaLanguage, FaUser } from "react-icons/fa";
import { MdBookOnline } from "react-icons/md";
import { GiDuration } from "react-icons/gi";
import useUser from "../../hooks/useUser";
// import { RiTwitterXLine } from "react-icons/ri";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAxiosFetch from "../../hooks/useAxiosFetch";
import handleImg from "../../assets/gallary/image1.png";
import BannerImg from "../../assets/home/banner-1.jpg";
import { MdEmail } from "react-icons/md";
const ClassesDetails = () => {
  const data = useLoaderData();
  console.log(data);
  const { currentUser } = useUser();
  const role = currentUser?.role;
  const [enrolledClasses, setEnrolledClasses] = useState([]);
  const axiosSecure = useAxiosSecure();
  const axiosFetch = useAxiosFetch();




  
  const handleSelect = (id) => {
    console.log(id);
    axiosSecure
      .get(`/enrolled-classes/${currentUser?.email}`)
      .then((res) => {
        console.log(res);
        setenrolledclasses(res.data)
        console.log("fghj kl;");
      })
      .catch((err) => console.log(err));
    if (!currentUser) {
      alert("please login First..");
      return navigate("/");
    }
    axiosSecure
      .get(`/cart-items/${id}?email=${currentUser.email}`)
      .then((res) => {
        console.log(res);
        if (res.data.classId === id) {
          return alert("Already added to the cart");
        } else if (enrolledclasses.find((item) => item.classes._id === id)) {
          return alert("Already Enrolled");
        } else {
          const data = {
            classId: id,
            userEmail: currentUser?.email,
            date: new Date(),
          };
          axiosSecure.post("/add-to-cart", data).then((res) => {
            alert("Add to cart successfully");
            console.log(res.data);
          });
        }
      })
      .catch((error) => console.error(error));
  };
  return (
    <>
      <div className="font-gilray font-medium text-gray dark:text-white text-lg leading-[27px] w-[90%] mx-auto">
        <div className="breakcrumbs bg-primary py-20 mt-20 bg-cover bg-center bg-no-repeat">
          <div className="container text-center">
            <h2>Course Details</h2>
          </div>
        </div>
        <div className="nav-tab-wrapper tabs section-padding mt-8">
          <div className="container">
            <div className="grid grid-cols-12 gap-6">
              <div className="lg:col-span-8 col-span-12">
                <div className="single-course-details">
                  <div className="course-main-thumb h-[470px] mb-10">
                    <img
                      src={data.image}
                      alt="Course"
                      className="rounded-md object-cover w-full h-full"
                    />
                  </div>
                  <h2 className="text-2xl mb-2">{data.name}</h2>
                  <div className="author-meta mt-6 sm:flex lg:space-x-16 sm:space-x-5 space-y-5 sm:space-y-0 items-center">
                    <div className="flex space-x-4 items-center group">
                      <div className="flex-none">
                        <div className="h-12 w-12 rounded-full">
                          <img
                            src="https://media.istockphoto.com/id/1327592506/vector/default-avatar-photo-placeholder-icon-grey-profile-picture-business-man.jpg?s=612x612&w=0&k=20&c=BpR0FVaEa5F24GIw7K8nMWiiGmbb8qmhfkpXcp1dhQg="
                            alt="Instructor"
                            className="object-cover w-full h-full rounded-full"
                          />
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-secondary">{data.instructorName}</p>
                      </div>
                    </div>
                    <div>
                      <span>
                        Last Update:
                        <a href="#" className="text-black ml-1">
                          {new Date(data.submitted).toDateString()}
                        </a>
                      </span>
                    </div>
                  </div>
                  <div className="nav-tab-wrapper ml-12">
                    <ul className="flex gap-4 ml-4">
                      <li className="active">
                        <a href="#overview">Overview</a>
                      </li>
                      <li className="active">
                        <a href="#curriculum">Curriculum</a>
                      </li>
                      <li className="active">
                        <a href="#instructor">Instructor</a>
                      </li>
                      <li className="active">
                        <a href="#reviews">Review</a>
                      </li>
                    </ul>
                    <div className="tab-content">
                      <div id="overview">
                        <h3 className="ml-4">Course Description:</h3>
                        <p className="ml-4">{data.description}</p>
                        <div className="bg-[#F8F8F8] dark:bg-indigo-500 space-y-6 p-8 rounded-md my-8">
                          <h4 className="text-2xl">What you will learn?</h4>
                       
                            <div
                             
                              className="bg-white rounded px-5 py-[18px] flex shadow-box2 space-x-[10px] items-center"
                            >
                              <span className="flex-none">
                                <img
                                  src="https://png.pngtree.com/png-vector/20211023/ourmid/pngtree-salon-logo-png-image_4004444.png"
                                  alt="Icon"
                                  className="w-5 h-5"
                                />
                              </span>
                              <span className="flex-1 text-black">
                                commuication
                              </span>
                            </div>
                     
                        </div>
                      </div>
                      <div id="curriculum">
                        <h3 className="text-2xl mt-8">Lesson Plan</h3>
                        <p className="ml-4">
                          In publishing and graphic design, Lorem ipsum is a
                          placeholder text commonly used to demonstrate the
                          visual form of a document or a typeface without
                          relying on meaningful content. Lorem ipsum may be used
                          as a placeholder before the final copy is available.
                        </p>
                        <div className="bg-[#F8F8F8] dark:bg-indigo-500 space-y-6 p-8 rounded-md my-8">
                          <h4 className="text-2xl">Course is for beginners</h4>
                        </div>
                        <div>
                          <h4 className="text-2xl">What you will learn?</h4>
                          <p>
                            In publishing and graphic design, Lorem ipsum is a
                            placeholder text commonly used to demonstrate the
                            visual form of a document or a typeface without
                            relying on meaningful content. Lorem ipsum may be
                            used as a placeholder before the final copy is
                            available.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Right */}
              <div className="lg:col-span-4 col-span-12 mt-8 md:mt-5">
                <div className="sideWrapper space-y-[30px]">
                  <div className="relative">
                    <a
                      href={data.image}
                      className="block w-full h-full object-cover rounded"
                    >
                      <img
                        src={data.image}
                        alt="Course"
                        className="rounded-md object-cover w-full h-full"
                      />
                    </a>
                    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                   
                    </div>
                    <h3 className="text-3xl font-bold mt-4">${data.price}</h3>
                    <button
                      onClick={() => handleSelect(data._id)}
                      title={
                        role === "instructor"
                          ? "Instructor/Admin cannot select"
                          : data.availableseat < 1
                          ? "No seats available"
                          : "You can select this class"
                      }
                      disabled={
                        role === "admin" ||
                        role === "instructor" ||
                        data.availableseat < 1
                      }
                      className="btn btn-primary w-full text-center bg-secondary py-2 px-6 text-white mt-4"
                    >
                      Enroll Now
                    </button>
                    <ul className="mt-6 space-y-4">
                      <li className="flex justify-between items-center border-b border-[#FCFFCFC] pb-4">
                        <div className="flex items-center space-x-3">
                          <FaUser className="inline" />
                          <div className="text-black font-semibold">
                            Instructor
                          </div>
                        </div>
                        <div>{data.instructorName}</div>
                      </li>
                      <li className="flex justify-between items-center border-b border-[#FCFFCFC] pb-4">
                        <div className="flex items-center space-x-3">
                          <MdBookOnline />
                          <div className="text-black font-semibold">
                            Lectures
                          </div>
                        </div>
                        <div>{data.lectures}</div>
                      </li>
                      <li className="flex justify-between items-center border-b border-[#FCFFCFC] pb-4">
                        <div className="flex items-center space-x-3">
                          <GiDuration />
                          <div className="text-black font-semibold">
                            Duration
                          </div>
                        </div>
                        <div>24 Hr</div>
                      </li>
                      <li className="flex justify-between items-center border-b border-[#FCFFCFC] pb-4">
                        <div className="flex items-center space-x-3">
                          <FaUser />
                          <div className="text-black font-semibold">
                            Enrolled
                          </div>
                        </div>
                        <div>{data.totalEnrolled}</div>
                      </li>
                      <li className="flex justify-between items-center border-b border-[#FCFFCFC] pb-4">
                        <div className="flex items-center space-x-3">
                          <FaUser />
                          <div className="text-black font-semibold">
                            Course Level
                          </div>
                        </div>
                        <div>Intermediate</div>
                      </li>
                      <li className="flex justify-between items-center border-b border-[#FCFFCFC] pb-4">
                        <div className="flex items-center space-x-3">
                          <FaLanguage />
                          <div className="text-black font-semibold">
                            Language
                          </div>
                        </div>
                        <div>English</div>
                      </li>
                    </ul>
                    <ul className="flex space-x-4 items-center pt-3 justify-center">
                      <li className="text-black font-semibold">Share On:</li>
                      <li className="items-center">
                        <a href="#" className="flex h-10 w-10 items-center">
                        <MdEmail className="w-5 h-5  "/>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="flex h-10 w-10 items-center" >
                        <MdEmail className="w-5 h-5  "/>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="flex h-10 w-10">
                          <img alt="Share Icon" />
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-2xl">Related Courses</h4>
                    <ul>
                      <li className="flex space-x-4 border-b pb-6 mb-6">
                        <div className="flex-none">
                          <div className="h-20 w-20 rounded">
                            <img
                              src={handleImg}
                              alt="Related Course"
                              className="w-full h-full object-cover rounded"
                            />
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex space-x-3 mb-4">
                            <span className="text-tertiary">★★★★★</span>
                          </div>
                          <div className="mb-2 font-semibold text-black">
                            Greatest session in...
                          </div>
                          <span className="text-secondary font-semibold">
                            $30.00
                          </span>
                        </div>
                      </li>
                      <li className="flex space-x-4 border-b pb-6 mb-6">
                        <div className="flex-none">
                          <div className="h-20 w-20 rounded">
                            <img
                              src={BannerImg}
                              alt="Related Course"
                              className="w-full h-full object-cover rounded"
                            />
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="mb-1 font-semibold text-black">
                            Greatest session in...
                          </div>
                          <span className="text-secondary font-semibold">
                            $30.00
                          </span>
                        </div>
                      </li>
                      <li className="flex space-x-4 border-b pb-6 mb-6">
                        <div className="flex-none">
                          <div className="h-20 w-20 rounded">
                            <img
                              src={BannerImg}
                              alt="Related Course"
                              className="w-full h-full object-cover rounded"
                            />
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="mb-1 font-semibold text-black">
                            Greatest session in...
                          </div>
                          <span className="text-secondary font-semibold">
                            $30.00
                          </span>
                        </div>
                      </li>
                      <li className="flex space-x-4 border-b pb-6 mb-6">
                        <div className="flex-none">
                          <div className="h-20 w-20 rounded">
                            <img
                              src={BannerImg}
                              alt="Related Course"
                              className="w-full h-full object-cover rounded"
                            />
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="mb-1 font-semibold text-black">
                            Greatest session in...
                          </div>
                          <span className="text-secondary font-semibold">
                            $30.00
                          </span>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClassesDetails;
