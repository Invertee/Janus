const crypto = require('crypto')
const config = require('../config');

function encrypt( text , password , scheme )
{
    var cipher = crypto.createCipher( scheme , password )
    var crypted = cipher.update(text,'utf8','hex')
    crypted += cipher.final('hex');
    return crypted;
}

function decrypt( text , password , scheme ) 
{
    var decipher = crypto.createDecipher( scheme , password )
    var dec = decipher.update(text,'hex','utf8')
    dec += decipher.final('utf8');
    return dec;
}

const appRouter = app => {

    app.get("/" , (req, res) => 
    { 
        res.status(200).send( 'index' )    
    });

    app.post("/encrypt" , (req,res) => {
        let enc = encrypt( req.body.input , config.encpassword , config.encscheme )
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send({ 'result': enc });
    });

    app.post("/decrypt" , (req,res) => {
        let enc = decrypt( req.body.input , config.encpassword , config.encscheme )
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send({ 'result': enc });
    });

    app.get('*', function(req, res){
        res.status(404).send( 'Not found my friend!' );
    });
};

module.exports = appRouter;