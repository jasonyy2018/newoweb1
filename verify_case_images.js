const https = require('https');

const imageMap = {
    'manufacturing-quality-control': 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    'smart-retail-recommendation': 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80',
    'predictive-maintenance-wind-farm': 'https://images.unsplash.com/photo-1548337138-e87d889cc369?auto=format&fit=crop&w=800&q=80',
    'fintech-risk-assessment': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    'logistics-route-optimization': 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
    'precision-agriculture-yield': 'https://images.unsplash.com/photo-1560493676-04071c5f467b?auto=format&fit=crop&w=800&q=80',
    'smart-education-personalized': 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=800&q=80',
    'smart-grid-management': 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80',
    'real-estate-valuation-ai': 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',
    'media-sentiment-analysis': 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80',
    'hotel-guest-experience': 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    'drone-powerline-inspection': 'https://images.unsplash.com/photo-1506941433945-99a2aa4bd50a?auto=format&fit=crop&w=800&q=80'
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
    console.log('Final Verification of Case Study Images:');
    let allOk = true;
    for (const [name, url] of Object.entries(imageMap)) {
        const ok = await checkUrl(name, url);
        if (!ok) allOk = false;
    }
    console.log('\nOverall Result: ' + (allOk ? 'PASSED' : 'FAILED'));
}

run();
