const https = require('https');

const imageMap = {
    'wind-farm-original': 'https://images.unsplash.com/photo-1466611653911-95282ee3956f?auto=format&fit=crop&w=800&q=80',
    'wind-farm-new': 'https://images.unsplash.com/photo-1466611653911-95281773ad90?auto=format&fit=crop&w=800&q=80',
    'fintech-original': 'https://images.unsplash.com/photo-1551288049-bbda38a10ad5?auto=format&fit=crop&w=800&q=80',
    'fintech-new': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    'hotel-original': 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80' // for control
};

function checkUrl(name, url) {
    return new Promise((resolve) => {
        https.get(url, (res) => {
            console.log(`${name}: ${res.statusCode} ${res.statusCode === 200 ? 'OK' : 'FAIL'}`);
            resolve(res.statusCode === 200);
        }).on('error', (e) => {
            console.log(`${name}: ERROR ${e.message}`);
            resolve(false);
        });
    });
}

async function run() {
    for (const [name, url] of Object.entries(imageMap)) {
        await checkUrl(name, url);
    }
}

run();
