import schema from "./auth.schema";
const {register}=schema;

const authValidation={
   async register(req,res,next){
    const value=await register.validate(req.body);
    if(value?.error){
        const err=new Error(`${value.error.details[0].message}`)
        err.statusCode=422;
        next(err)
    }
    else{
        next()
    }
   }
}
export default authValidation