if (process.env.NODE_ENV!=='production') {
    require('dotenv').config();    
}
const app = require('./app');
app.listen(app.get('port'),()=>{
    console.log('server online', app.get('port'));    
    console.log('server online', process.env.NODE_ENV);    
})
// me quedo en los 30 minutos