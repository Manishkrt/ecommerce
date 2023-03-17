import Category from '../modal/category.js'

export const createcategory = async(req, res)=>{
    const name = req.body.name 
    const icon = req.files.icon[0].path
    const image = req.files.image[0].path 
    const newcategory = new Category({name, icon, image}) 
    try{
        await newcategory.save()
        res.status(200).json(newcategory)
    } catch(err){
        res.status(500).json({message: err.message})
    }
}
export const getcategory = async(req, res)=>{
    try{
        const data = await Category.find({})
        res.status(200).json(data)
    } catch(err){
        res.status(500).json({message: err.message})
    }
}


