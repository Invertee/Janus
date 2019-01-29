const appRouter = app => {

    app.get("/" , (req, res) => 
    { 
        res.render( 'index' )    
    });

    app.post("/encode" , (req,res) => {

    });
};

module.exports = appRouter;