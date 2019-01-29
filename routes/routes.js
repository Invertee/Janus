const crypto = require('crypto')
const key = '1JemjN9N6UWB0e@jiDxdHIMnsOIv%NvKCkAK%0clMNU6'

function encrypt( text , password )
{
    var cipher = crypto.createCipher( 'aes-256-ctr' , password )
    var crypted = cipher.update(text,'utf8','hex')
    crypted += cipher.final('hex');
    return crypted;
}

function decrypt( text , password ) 
{
    var decipher = crypto.createDecipher( 'aes-256-ctr' , password )
    var dec = decipher.update(text,'hex','utf8')
    dec += decipher.final('utf8');
    return dec;
}

const appRouter = app => {

    app.get("/" , (req, res) => 
    { 
        res.sendFile( 'index' )    
    });

    app.post("/encrypt" , (req,res) => {
        let enc = encrypt( req.body.input , key )
        res.setHeader('Content-Type', 'application/json');
        res.send({ 'result': enc });
    });

    app.post("/decrypt" , (req,res) => {
        let enc = decrypt( req.body.input , key )
        res.setHeader('Content-Type', 'application/json');
        res.send({ 'result': enc });
    });

    app.get('*', function(req, res){
        res.send('Not found my friend!', 404);
    });
};

module.exports = appRouter;