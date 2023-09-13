export const errorHandler = (res,code=500,msg="Something Went wrong") =>{
res.status(code).json({
    success:false,
    status:code,
    message:msg
})
}