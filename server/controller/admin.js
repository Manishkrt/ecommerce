import Admin from '../modal/admin.js'

export const add = async (req, res)=>{
    const data = req.body
    const newadmin = new Admin(data)
    console.log(data)
    console.log(newadmin)
    try{
        await newadmin.save() 
        res.status(200).json(newadmin)
    }
    catch(err){ 
        res.status(err.code || 500).json({message: err.message})
    }
}

export const login = async(req, res)=>{
    const data = req.body 
    try{
        await Admin.findOne({email : data.email, password : data.password}).then((data)=>{
            if(data == null){
                res.status(500).json({message: "emai and password did not matched"})
            }else{
                res.status(200).json(data)
            }
        })
    }catch(err){
        res.status(err.code || 500).json({message: err})
    }
}