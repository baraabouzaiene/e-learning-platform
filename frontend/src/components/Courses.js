// display data in react
import React, { useEffect, useState } from 'react';
import { getCourses } from '../api';

const Courses = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            const data = await getCourses();
            setCourses(data);
        };
        fetchCourses();
    }, []);

    return (
        <div>
            <h2>Courses</h2>
            <ul>
                {courses.map((course, index) => (
                    <li key={index}>{course.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default Courses;
