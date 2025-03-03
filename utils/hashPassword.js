const bcrypt = require("bcrypt");
exports.hash = async(password)=>{
    const genSalt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password,genSalt);
}