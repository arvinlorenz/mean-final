const bcrypt = require('bcrypt'); //encryption funcitonalities
const jwt = require('jsonwebtoken');

const User = require('../models/user')


exports.createUser = async (req,res,next)=>{
    let hash = await bcrypt.hash(req.body.password, 10);
       
    const user = new User({
        email: req.body.email,
        password: hash
    });

    try{
        let result = await user.save();
        res.status(201).json({
            message: 'User Created',
            result
        });
    }
    catch(e){
        res.status(500).json({
            message: 'Invalid authentication credentials'
        });
    }  
}


exports.userLogin = (req,res,next)=>{
    let fetchedUser;
    //email exist
    User.findOne({email: req.body.email})
        .then(user=>{
            if(!user){
                return res.status(401).json({
                    message: 'Auth failed'
                });  
            }
        fetchedUser = user;
        //checking password
        return bcrypt.compare(req.body.password, user.password); //return promise to chain outside
            
        })
        .then(result =>{
            if(!result){
                return res.status(401).json({
                    message: 'Auth failed'
                });  
            }
            //if theres a result create a token (jwt)
            const token = jwt.sign(
                { email: fetchedUser.email, userId: fetchedUser._id}, 
                 process.env.JWT_KEY,
                 {expiresIn:'1h'}
                ); //1st arg - based on our choice; 2nd arg - secret word, 3rd(optional)
            
            //sent it to the front end
            res.status(200).json({
                token,
                expiresIn: 3600,
                userId: fetchedUser._id
            });
        })
        .catch(err =>{
            return res.status(401).json({
                message: 'Invalid authentication credentials'
            });  
        });
}