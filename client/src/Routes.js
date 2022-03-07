import {BrowserRouter, Routes, Route } from "react-router-dom";
import { useLoggedInContext } from "./Context/LoggedInContext";
import Register from './components/Register';
import StudentList from "./components/StudentList";
import Layout from "./components/Layout";
import Login from "./components/Login";
import CourseList from "./components/CoursesList";
import AddCourseForm from './components/AddCourseForm';
import UpdateCourseForm from './components/UpdateCourseForm';
import CourseDetails from "./components/CourseDetails";
import StudentInfo from "./components/StudentInfo";
import StudentAccount from "./components/StudentAccount";
import UpdateStudentAccountForm from "./components/UpdateStudentAccountForm";

export default function Routing(){

    const loggedInContext = useLoggedInContext();

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<CourseList/>}/>
                    <Route path="login" element={<Login/>}/>
                    <Route path="register" element={<Register/>}/>
                    <Route path="list-students" element={loggedInContext.loggedIn ? <StudentList/> : <Login/>}/>
                    <Route path="add-course-form" element={loggedInContext.loggedIn ? <AddCourseForm/> : <Login/>}/>
                    <Route path="update-course-form/:courseId" element={loggedInContext.loggedIn ? <UpdateCourseForm/> : <Login/>}/>
                    <Route path="courses/:courseId" element={<CourseDetails/>}/>
                    <Route path="student-info/:userId" element={loggedInContext.loggedIn ? <StudentInfo/> : <Login/>} />
                    <Route path="student-account" element={loggedInContext.loggedIn ? <StudentAccount/> : <Login/>}/>
                    <Route path="student-update-account" element={loggedInContext.loggedIn ? <UpdateStudentAccountForm/> : <Login/>}/>
                </Route>
            </Routes>
      </BrowserRouter>
    )
}