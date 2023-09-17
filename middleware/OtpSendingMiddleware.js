const optmiddleware=(req,res,next)=>{
    if(req.params.otp){
        next()
    }
    else{
        res.send("wrong otp")
    }
}

module.exports={
    optmiddleware
}