const mongoose = require('mongoose');
mongoose.connect(process.env.MONGOURL,{
    useNewUrlParser: true
}).then(db=> console.log('db on line')).catch(err=>console.log(err))