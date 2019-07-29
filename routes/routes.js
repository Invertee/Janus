const crypto = require('crypto')

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
        let enc, status = ''
        if (req.body.input.length == 0 || req.body.input === 'Empty String') {enc = 'Empty String' ; status = 'error'} else {
            try {
                enc = encrypt( req.body.input , process.env.encPassword , process.env.encScheme )
                status = 'okay'
            } catch {
                enc = 'Unable to encrypt string'
                status = 'error'
            }
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send({ 'result': enc , 'status': status });
    });

    app.post("/decrypt" , (req,res) => {
        console.log( req.body )
        let enc, status = ''
        if (req.body.input.length == 0 || req.body.input === 'Empty String') {enc = 'Empty String' ; status = 'error'} else {
            try {
                enc = decrypt( req.body.input , process.env.encPassword , process.env.encScheme )   
                status = 'okay'         
            } catch (error) {
                enc = 'Unable to decrypt string'
                status = 'error'
            }
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send({ 'result': enc , 'status': status });
    });

    app.get('*', function(req, res){
        res.status(404).send( 'Not found my friend!' );
    });
};

module.exports = appRouter;