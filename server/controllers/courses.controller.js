
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const courseModel = require('../models/course.model')
const config = require('../config/config')
const userModel = require('../models/user.model')


const addCourse = async(req,res)=>{
    const {authorization} = req.headers;
    
    const {courseCode, courseName, section, semester} = req.body;

    if (!authorization){
        return res.status(401).json({message: 'no authorization header sent'});
    }

    const courseExist = await courseModel.findOne({courseCode});

    if (courseExist){
        return res.status(400).json({message: 'course with the current course code already exists'})
    }

    const token = authorization.split(' ')[1];

    jwt.verify(token, config.jwtSecret, async(err, decoded)=>{
        if (err){
            return res.status(401).json({message: 'Unable to verify token'});
        }

        const {id} = decoded;

        let students = [id];

        let newCourse = courseModel({
            courseCode,
            courseName,
            section,
            semester,
            students
        })

        courseModel.create(newCourse, (err, result)=>{
            if (err){
                res.send(err);
            }
            userModel.findByIdAndUpdate(
                {_id:id},
                {$addToSet:{courses:result._id}},
                (err)=>{
                    if (err){
                        res.send(err);
                    }
                }
            )
            res.status(200).send(result);
        })

    })
}

const updateCourse = async(req,res)=>{
    const {authorization} = req.headers;

    const {courseId} = req.params;
    
    const {courseCode, courseName, section, semester} = req.body;

    if (!authorization){
        return res.status(401).json({message: 'no authorization header sent'});
    }

    const token = authorization.split(' ')[1];

    jwt.verify(token, config.jwtSecret, async(err, decoded)=>{
        if (err){
            return res.status(401).json({message: 'Unable to verify token'});
        }


        let updateCourse = courseModel({
            "_id":courseId,
            courseCode,
            courseName,
            section,
            semester
        })
        
        courseModel.findOneAndUpdate(
            {_id:courseId}, 
            updateCourse,
            {new: true},    
            (err, result)=>{
            if (err){
                return res.send(err);
            }

            res.status(200).json(result);
        })

    })
}

const getCourse = async(req,res)=>{
    const {courseId} = req.params;
    courseModel.findOne({_id: courseId}, (err, result)=>{
        if (err){
            return res.status(400).send(err);
        }

        res.status(200).send(result);
    })
}

const getCourses = async(req,res)=>{
    courseModel.find((err, result)=>{
        if (err){
            return res.status(400).json(err);
        }

        res.status(200).send(result);

    })
}

const takeCourse = async(req,res)=>{

    const {authorization} = req.headers;

    const {courseId} = req.params;

    if (!authorization){
        return res.status(401).json({message: 'no authorization header sent'});
    }

    const token = authorization.split(' ')[1];

    jwt.verify(token, config.jwtSecret, async(err, decoded)=>{
        if (err){
            return res.status(401).json({message: 'Unable to verify token'});
        }

        const {id:userId} = decoded;

        courseModel.findOneAndUpdate(
            {_id:courseId}, 
            {$addToSet:{students: userId}},
            {new: true},    
            (err, result)=>{
            if (err){
                return res.send(err);
            }

            userModel.findByIdAndUpdate(
                {_id:userId},
                {$addToSet:{courses:courseId}},
                (err)=>{
                    if (err){
                        res.send(err);
                    }
                }
            )

            res.status(200).json({success:true, course: result});
        })

    })

}

const dropCourse = async(req,res)=>{
    const {authorization} = req.headers;

    const {courseId} = req.params;

    if (!authorization){
        return res.status(401).json({message: 'no authorization header sent'});
    }

    const token = authorization.split(' ')[1];

    jwt.verify(token, config.jwtSecret, async(err, decoded)=>{
        if (err){
            return res.status(401).json({message: 'Unable to verify token'});
        }

        const {id:userId} = decoded;

        courseModel.findOneAndUpdate(
            {_id:courseId}, 
            {$pull:{students: userId}},
            {new: true},    
            (err, result)=>{
            if (err){
                return res.send(err);
            }

            userModel.findByIdAndUpdate(
                {_id:userId},
                {$pull:{courses:courseId}},
                (err)=>{
                    if (err){
                        res.send(err);
                    }
                }
            )

            res.status(200).json({success:true, course: result});
        })

    })
}


const deleteCourse = async(req,res)=>{

    const {authorization} = req.headers;

    const {courseId} = req.params;

    if (!authorization){
        return res.status(401).json({message: 'no authorization header sent'});
    }

    const token = authorization.split(' ')[1];

    jwt.verify(token, config.jwtSecret, async(err, decoded)=>{
        if (err){
            return res.status(401).json({message: 'Unable to verify token'});
        }
        
        courseModel.remove({_id:courseId}, (err)=>{
            if (err){
                res.status(400).send({err, success:false});
            }

            userModel.find({courses:{$all: courseId}}, (err,result)=>{
                if (err){
                    res.status(400).send({err, success:false});
                }
                result.forEach(user =>{
                    userModel.findOneAndUpdate({_id:user.id}, {$pull:{courses:courseId}}, (err)=>{
                        if (err){
                            res.status(400).send({err, success:false});
                        }
                    })
                })
                res.status(200).send({success:true, message:'Course was removed'})
            })
        })

    })

}

const getCourseStudents = async(req,res)=>{

    const {courseId} = req.params;

    userModel.find({courses:{$all: courseId}}, (err,result)=>{
        if (err){
            res.status(400).send(err);
        }
        res.status(200).send(result);
    })


}



module.exports = {
    addCourse,
    updateCourse,
    getCourse,
    getCourses,
    deleteCourse,
    takeCourse,
    dropCourse,
    getCourseStudents
}