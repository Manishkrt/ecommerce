import User from '../modal/user.js'


export const createuser = async(req, res)=>{
    const data = req.body 
    const newuser = new User(data) 
    try{
        await newuser.save();
        res.status(201).json(newuser)
    } catch (err) {
        res.status(409).json({message: err.message})
    }
}


export const getuser = async(req, res)=>{
    const data = await User.find({})
    res.status(200).json(data)
}

export const login = async(req, res)=>{
    const data = req.body; 
    try{
        await User.findOne({email : data.email, password : data.password}).then((item)=>{ 
            if(item == null){
                res.status(409).json({message: "emai and password did not matched"})
            }else{
                res.status(200).json(item)
            } 
        })
    } catch(err){
        res.status(409).json({message: err.message})
    }
}




