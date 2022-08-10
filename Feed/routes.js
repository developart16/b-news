

const { createFeed, findFeed, updateFeed, deleteFeed } = require("./controller");
const feedNotFound = {
    ok: false,
    message: "Feed not found",
}

module.exports = (app)=>{

    app.post('/feed', async (req, res)=>{

        const bodyFeed = { ...req.body };
        
        if ( ! bodyFeed ) return res.status(404).send(feedNotFound);    

        const newFeed = await createFeed(bodyFeed);
        if ( newFeed ) return res.status(400).send({ 
            ok: true,
            message: "Feed created",
        });

        return res.status(400).send({ 
            ok: false,
            message: "Couldn't create feed"
        });

    });

    app.get('/feed/:oid', async (req, res)=>{

        const {oid} = req.params
        if ( !oid ) return res.status(404).send(feedNotFound);

        const feed = await findFeed(oid);
        if ( feed ) return res.status(400).send({ 
            ok: true,
            feed: feed
        });

        return res.status(404).send(feedNotFound);

    });


    app.put('/feed/:oid', async (req, res)=>{

        const {oid} = req.params
        const bodyFeed = { ...req.body };
        if ( ! bodyFeed || ! oid ) return res.status(404).send(feedNotFound);    

        const modFeed = await updateFeed( oid, bodyFeed );
        if ( !!modFeed ) return res.status(400).send({ 
            ok: true,
            message: "Feed updated",
        });

        return res.status(400).send({ 
            ok: false,
            message: "Couldn't update feed"
        });

    });


    app.delete('/feed/:oid', async (req, res)=>{

        const {oid} = req.params
        if ( !oid ) return res.status(404).send(feedNotFound);

        const deletedFeed = await deleteFeed(oid);
        if ( !!deletedFeed ) return res.status(400).send({ 
            ok: true,
        });

        return res.status(404).send(feedNotFound);

    });

}