
const func = (req,res,next) => {
    console.log(`This is usermiddleware request : ${req.body} and ${req.url}`);
    next();
}

module.exports = func;