import Product from '../modal/product.js'

export const add = async(req, res)=>{
     
    try{
        const data = req.body
        if(req.file){
            const image = req.file.path 
            const newproduct = new Product({...data, "image" : image})
            await newproduct.save()
            res.status(200).json(newproduct)
        }  
        
    }catch(err){
        console.log("error 409 product controller: " + err.message)
        res.status(err.code || 409).json({message: err.message})
    }
    
}
export const show = async(req, res)=>{ 
    try{
        const data = await Product.find({})
        res.status(200).json(data)
    }catch(err){
        res.status(err.code || 409).json({message: err.message})
    }
    
}

export const editproduct = async(req, res)=>{
    const _id = req.params.id 
    try{
        const data = await Product.findById({_id}) 
        res.status(200).json(data)
    }
    catch(err){
        res.status(err.code || 409).json({message: err.message})
    }
}




export const update = async(req, res)=>{  
    let {product_name, category, price, offer, replacement, warranty, product_detail, company, seller_id} = req.body
    let _id = req.params.id
    let image = req.body.image
    if(req.file){
        image = req.file.path
    }
    console.log(image)
    try{   
    await Product.updateOne({_id}, {$set: {product_name, category, price, offer, replacement, warranty, product_detail, company, seller_id, image}}); 
    res.status(200).json(req.body) 
    }
    catch(err){
        res.status(err.code || 409).json({message: err.message})
    } 
}

export const deleteproduct = async(req, res)=>{
    const _id = req.params.id 
    try{
        const Productdata = await Product.findById({_id}); 
        await Product.deleteOne({_id})
        res.status(200).json(Productdata)
    }
    catch(err){
        res.status(err.code || 409).json({message: err.message})
    }
}