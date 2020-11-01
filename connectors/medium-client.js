const env = require('dotenv').config().parsed;
var unirest = require('unirest');

// function to return list of articles written by me on medium. 
async function getMyArticles() {
    return new Promise((resolve, reject) => {
        unirest.get(`https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@kailashwall`)
            .end(response => {
                if (!response.ok) {
                    reject(response.body);
                } else {
                    resolve(response.body.items.filter(el => el.categories.length > 0));
                }
            });
    });
}

exports.getMyArticles = getMyArticles;