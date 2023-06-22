module.exports = (req, res, next) => {
  if(req.cookies.name === "Admin"){
    next();
   }
   else{
   res.redirect("/admin");
   }
};



