const https = require('https');

const urls = [
    'https://images.unsplash.com/photo-1548337138-e87d889cc369?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1413806151398-c43837905d6e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-11551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80' // try the same fintech ID with a typo? no.
];

function checkUrl(url) {
    return new Promise((resolve) => {
        https.get(url, (res) => {
            console.log(`${url}: ${res.statusCode} ${res.statusCode === 200 ? 'OK' : 'FAIL'}`);
            resolve(res.statusCode === 200);
        }).on('error', (e) => {
            console.log(`${url}: ERROR ${e.message}`);
            resolve(false);
        });
    });
}

async function run() {
    for (const url of urls) {
        await checkUrl(url);
    }
}

run();
