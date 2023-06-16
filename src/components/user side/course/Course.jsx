import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Radio } from "@material-tailwind/react";
import Navbar from '../navbar/Navbar';
import notfound from '../../../images/not found.png';
import Footer from '../footer/Footer';
import img from '../../../images/avatar.jpg'
import Pagination from '../../Pagination';
import instance from '../../../utils/axios';
import { useSearchParams } from 'react-router-dom';

function Course() {
  const [courses, setCourses] = useState([]);
  const [category, setCategory] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(2);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const searchKey = searchParams.get("key");
  const [showAllCourses, setShowAllCourses] = useState(true);

  const handleCategoryFilter = (categoryName) => {
    setSelectedCategory(categoryName);
    setShowAllCourses(false);
  };

  const handleCancelFilter = () => {
    setSelectedCategory('');
    setShowAllCourses(true);
  };

  useEffect(() => {
    async function getCourse() {
      const response = await instance.get('/courses/course/');
      const allCourses = response.data;

      if (searchKey) {
        // Filter courses based on searchKey
        const filteredCourses = allCourses.filter(course =>
          course.title.toLowerCase().includes(searchKey.toLowerCase())
        );
        setCourses(filteredCourses);
      } else if (selectedCategory && !showAllCourses) {
        // Filter courses based on selected category
        const filteredCourses = allCourses.filter(course =>
          course.category.name === selectedCategory
        );
        setCourses(filteredCourses);
      } else {
        setCourses(allCourses);
      }
    }

    getCourse();
  }, [searchKey, selectedCategory, showAllCourses]);

  useEffect(() => {
    async function getCategory() {
      const response = await instance.get('/courses/category/');
      setCategory(response.data);
    }
    getCategory();
  }, []);

  const handleSort = () => {
    const sortedCourses = [...courses].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
    setCourses(sortedCourses);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentCourses = courses.slice(firstPostIndex, lastPostIndex);

  return (
    <div className='w-full h-full font-poppins relative'>
      <Toaster position='top-center' limit={3}></Toaster>
      <div className="w-full h-20 flex flex-col gap-3 place-content-between">
        <Navbar />
      </div>
      <div className='p-5 w-full h-full min-h-screen flex'>
        <div className="shadow-xl w-1/5 h-auto px-5 rounded-xl bg-white-900 flex flex-col gap-5 py-5">
          <div className="w-full flex flex-col ">
            <h2 className='text-lg font-semibold'>Sort By</h2>
            <Radio id="low-to-high" name="sort" label="Low to high" onChange={handleSort} color="lightBlue" />
            <Radio id="high-to-low" name="sort" label="High to low" onChange={handleSort} color="lightBlue" />
          </div>
        </div>
        <div className="w-full flex flex-col gap-4 mx-3">
          <div className="w-full">
            <h3 className='text-xl font-semibold'>Categories</h3>
          </div>
          <div className="w-full flex flex-wrap gap-2">
            {category.map(categoryItem => (
              <div key={categoryItem.name}>
                <button
                  type='button'
                  className={`border-2 border-gray-600 px-3 py-2 hover:bg-blue-900 rounded-3xl hover:text-white first-letter:capitalize ${
                    selectedCategory === categoryItem.name ? 'bg-blue-900 text-white' : ''
                  }`}
                  onClick={() => handleCategoryFilter(categoryItem.name)}
                >
                  {categoryItem?.name}
                </button>
              </div>
            ))}
            {selectedCategory && (
              <div>
                <button
                  type='button'
                  className="border-2 border-gray-600 px-3 py-2 hover:bg-blue-900 rounded-3xl hover:text-white first-letter:capitalize"
                  onClick={handleCancelFilter}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
          <div className="w-full mt-10">
            <h3 className='text-lg font-normal pl-2'>{courses.length} results</h3>
            {courses?.length > 0 ? (
              currentCourses.map(course => (
                <div className='flex flex-col gap-3' key={course.id}>
                  <Link to={`/coursedetail/${course?.id}`} className="w-full px-3 py-5 rounded-xl shadow-xl my-2 bg-white flex gap-5 cursor-pointer">
                    <div className='w-1/5 h-40'>
                      <img className='w-full h-full rounded-md' src={`${course.image}`} alt="course_image" />
                    </div>
                    <div className='w-3/5 flex flex-col place-content-start gap-3'>
                      <h1 className='text-2xl font-semibold'>{course?.title}</h1>
                      <p className='text-gray-600 font-normal'>{course?.description}</p>
                      <div className="w-full flex flex-col gap-2 place-items-center">
                        <div className="w-full flex gap-2 place-items-center font-semibold text-gray-700">
                          <img className='w-12 rounded-3xl h-12' src={img} alt="tutor_profile" />
                        </div>
                        <div className="flex gap-3 w-full place-content-start">
                          <p className='text-lg font-normal text-gray-600'>{'₹ ' + course?.price}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <div className="w-full flex flex-col place-content-center place-items-center">
                <img className='w-2/5' src={notfound} alt="no_results_found" />
                <p className='text-xl font-semibold'>No matching results found</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Pagination totalPosts={courses.length} postsPerPage={postsPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage} />
      <Footer />
    </div>
  );
}

export default Course;
