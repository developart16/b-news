const { createFeed, deleteFeed, updateFeed, findFeed } = require("./controller")
const mongoose = require('mongoose');

describe("Comprueba CRUD de Feed",()=>{

    beforeAll(()=>{
        mongoose.connect('mongodb://localhost:27017/news');
    });
    

    const feed = {
        title: "tituloPrueba",
        body: "cuerpoPrueba",
        image: "imagenPrueba",
        source: "sourcePrueba",
        publisher: "publisherPrueba",
    };

    it("Creacion de feed", async ()=>{

        const newFeed = await createFeed(feed);
        
        feed.oid = newFeed._id;
        expect(!!newFeed._id).toBe(true)
        
        return
    })

    
    it("Busqueda de feed", async ()=>{

        const find = await findFeed(feed.oid);
        return expect(find.title).toBe("tituloPrueba")

    })

    it("Modificacion de feed", async ()=>{

        const update = await updateFeed(feed.oid, { title: "tituloPrueba2" });
        expect(update).toBe(1)

        const find = await findFeed(feed.oid);
        return expect(find.title).toBe("tituloPrueba2")

    })


    it("Borrado de feed", async ()=>{

        const isDeleted = await deleteFeed(feed.oid);
        return expect(isDeleted).toBe(1)

    })
    


})