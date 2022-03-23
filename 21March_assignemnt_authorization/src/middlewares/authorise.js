// const authorise = function (data,req,res,next){

// }
//permittedRoles=["seller","admin"];
const authorise = (permittedRoles) =>{
    return (req,res,next) =>{

        //getting the user
        let ispermitted =false;

        //checking if he has permitted roles
permittedRoles.map(role =>{
    if(req.user.role.includes(role)){
        ispermitted = true;
    }
});
//if permitted then just go ahead
if(ispermitted){
    return next();

}

//else just throw an error
else {
    return res.status(400).send({message:"You are not authorised to perform this operation"}) //status 401 is for un authorized access
}

   
    }
}
module.exports = authorise;

// {
//     "email":"mickey123selleradmin@gmail.com",
//     "password":"mickey1234selleradmin@gmail.com",
//     "role":["seller","admin"]
// }