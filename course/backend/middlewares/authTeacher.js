import jwt from  'jsonwebtoken'

// Teacher authentication middleware
const authTeacher = async (req, res, next) => {
    const {ttoken} = req.headers
    if (!ttoken) {     
        return res.json({success:false, message:'Not Authorized Login Again'})
    }
    try {
        const token_decode = jwt.verify(ttoken, process.env.JWT_SECRET)
        req.body.teacherId = token_decode.id
        next()
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

export default authTeacher