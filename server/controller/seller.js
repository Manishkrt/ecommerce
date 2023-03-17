import Seller from '../modal/seller.js'


export const createseller = async(req, res)=>{
    const data = req.body 
    const newseller = new Seller(data) 
    try{
        await newseller.save();
        res.status(201).json(newseller)
    } catch (err) {
        res.status(err.code).json({message: err.message})
    }
}


export const getseller = async(req, res)=>{
    const data = await Seller.find({})
    res.status(200).json(data)
}

export const login = async(req, res)=>{
    const data = req.body; 
    try{
        await Seller.findOne({email : data.email, password : data.password}).then((item)=>{ 
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




