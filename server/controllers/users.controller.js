
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userModel = require('../models/user.model')
const courseModel = require('../models/course.model')
const config = require('../config/config')

const getUsers = (req,res)=>{
    userModel.find((err, result)=>{
        if (err){
            res.status(400).send(err);
        }
        res.status(200).send(result)
    })
}

const register = async (req,res)=>{
    const {firstName, lastName, email, password, address, city, phoneNumber, program} = req.body;

    const user = await userModel.findOne({email});

    if (user){
        return res.status(400).json({message:'email is already registered'});
    }
    const passwordHash = await bcrypt.hash(password, 10);

    let newUser = new userModel({
        email,
        passwordHash,
        firstName,
        lastName,
        address,
        city,
        phoneNumber,
        program
    })

    userModel.create(newUser, (err, result)=>{
        if (err){
            res.send(err);
        }

        const insertedId = result._id;

        jwt.sign({
            id: insertedId,
            email,
            firstName,
            lastName,
            address,
            city,
            phoneNumber,
            program
        },
        config.jwtSecret,
        {
            expiresIn: '2d'
        },
        (err, token)=>{
            if(err){
                return res.status(500).send(err);
            }
            res.status(200).json({token});
        }
        )
    })
}

const login = async (req, res) =>{
    const {email, password} = req.body;

    userModel.findOne({email}, async (err, user)=>{
        if (err){
            res.send(err);
        }
        if (!user){
            return res.status(401).json({message: 'email or password are incorrect'});
        }

        const {id, firstName, lastName, email, passwordHash, address, city, phoneNumber, program} = user;

        const isCorrect = await bcrypt.compare(password, passwordHash);

        if (isCorrect){
            jwt.sign({id, firstName, lastName, email, passwordHash, address, city, phoneNumber, program},
                config.jwtSecret,
                {expiresIn: '2d'},
                (err, token)=>{
                    if(err){
                        res.status(500).json(err);
                    }
                    res.status(200).json({token})
                })
        }else {
            res.status(401).json({message:'email or password are incorrect'});
        }
    })
}


const update = async(req,res)=>{
    const {authorization} = req.headers;
    const {userId} = req.params;

    const {firstName, lastName, email, password, address, city, phoneNumber, program} = req.body;


    if (!authorization){
        return res.status(401).json({message:'no authorization header sent'});
    }

    const token = authorization.split(' ')[1];

    jwt.verify(token, config.jwtSecret, async(err, decoded)=>{
        if (err){
            return res.status(401).json({message:'Unable to verify token'});
        }


        const {id} = decoded;
        if (id != userId) return res.status(403).json({message: 'Not allowed to update user\'s data'})
    
        const passwordHash = await bcrypt.hash(password, 10);

        let updateUser = userModel({
            "_id": userId,
            email,
            firstName,
            lastName,
            passwordHash,
            address,
            city,
            phoneNumber,
            program
        })

        userModel.findByIdAndUpdate({_id: userId}, updateUser,{new: true}, (err, result)=>{
            if (err){
                return res.send(err);
            } 
            const {id,email,firstName,lastName,passwordHash,
                    address,city,phoneNumber,program} = result;
            jwt.sign({id,email,firstName,lastName,passwordHash,
                address,city,phoneNumber,program},
                config.jwtSecret,
                {expiresIn: '2d'},
                (err, token)=>{
                    if(err){
                        return res.status(200).json(err);
                    }
                    res.status(200).json(token);
                })
        });
    })
}


const deleteUser = async(req,res)=>{
    const {authorization} = req.headers;
    const {userId} = req.params;

    if (!authorization){
        return res.status(401).json({message: 'no authorization header sent'});
    }

    const token = authorization.split(' ')[1];

    jwt.verify(token, config.jwtSecret, async(err, decoded)=>{
        if (err){
            return res.status(401).json({message:'Unable to verify token'});  
        }
        const {id} = decoded;

        if (id !== userId) return res.status(403).json({message: 'Not allowed to update user\'s data'})

        userModel.deleteOne({_id:userId}, (err)=>{
            if (err){
                return res.end(err);
            }
            res.status(200).json({message:'user was deleted'})
        })
    })
}

const getUserCourses = async (req,res)=>{
    const {userId} = req.params;

    courseModel.find({students:{$all:userId}}, (err,result)=>{
        if (err){
            return res.status(400).send(err);
        }
        res.status(200).send(result);
    })
}

const getUser = async (req,res)=>{
    const {userId} = req.params;

    userModel.findOne({_id:userId}, (err, result)=>{
        if (err){
            res.status(400).send(err);
        }

        res.status(200).send(result);
    })
}

module.exports = {
    getUsers,
    register,
    login,
    update,
    deleteUser,
    getUserCourses,
    getUser
}