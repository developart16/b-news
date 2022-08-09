const { ValidateFeed } = require("./controller");


module.exports = (app)=>{

    app.get('/feed', (req, res)=>{
        return res.send({
            ok: true,
            message: "Welcome to feed"
        })
    })

}