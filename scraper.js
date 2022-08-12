const axios = require('axios');
const cheerio = require('cheerio');
const { createFeed } = require('./Feed/controller');


const generateFeed = async ({
    url,
    source,
    title,
    body,
    image
}) => {

	try {
		const { data } = await axios.get(
			url
		);
		const page = cheerio.load(data);

        const result = {
            source: "",
            title: "",
            body: "",
            image: "",
            publisher: url
        }

        if (source) {
            if (source.attr) result.source = page(source.route)[source.execute](source.attr);
            else result.source = page(source.route)[source.execute]();
        }
        
        if (title) {
            if (title.attr) result.title = page(title.route)[title.execute](title.attr);
            else result.title = page(title.route)[title.execute]();
        }

        if (body) {
            if (body.attr) result.body = page(body.route)[body.execute](body.attr);
            else result.body = page(body.route)[body.execute]();
        }

        if (image) {
            if (image.attr) result.image = page(image.route)[image.execute](image.attr);
            else result.image = page(image.route)[image.execute]();
        }

		return result

	} catch (error) {
		throw error;
	}
};


const dailyGenerate = async ()=>{
    const websites = [
        {
            url: "https://elpais.com/",
            source: {
                route:'main > div > section :nth-child(2) > article > header > a',
                execute: 'attr',
                attr: 'href'
            },
            title: { 
                route:'main > div > section :nth-child(2) > article > header > a',
                execute: 'text'
            },
            body: { 
                route:'main > div > section :nth-child(2) > article > p',
                execute: 'text'
            },
            image: { 
                route:'main > div > section :nth-child(2) > article > figure > a > img',
                execute: 'attr',
                attr: "src"
            }
        },
        {
            url: "https://www.elmundo.es/",
            source: {
                route:'div.ue-l-cover-grid.flex-war > div > div > div > div > div.ue-l-cover-grid__column.size9of12 > div > div:nth-child(2) > div > article > a',
                execute: 'attr',
                attr: 'href'
            },
            title: { 
                route:'div.ue-l-cover-grid.flex-war > div > div > div > div > div.ue-l-cover-grid__column.size9of12 > div > div:nth-child(2) > div > article > div.ue-c-cover-content__body > div.ue-c-cover-content__main > header > a > h2',
                execute: 'text'
            },
            image: { 
                route:'div.ue-l-cover-grid.flex-war > div > div > div > div > div.ue-l-cover-grid__column.size9of12 > div > div:nth-child(2) > div > article > div.ue-c-cover-content__body > div.ue-c-cover-content__media > figure > picture > img',
                execute: 'attr',
                attr: "src"
            }
        }
    ]
    

    const inserted = []
    for await (const page of websites) {
        const feed = await generateFeed(page);
        const created = await createFeed(feed)
        inserted.push(created)
    }

    return inserted
}

module.exports.dailyGenerate = dailyGenerate;