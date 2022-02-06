var axios = require("axios").default;

const getCityWithLatAndLong = async (lat, long) => {
    const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${long}&key=9e337f81b0f049848a5606f253678b87`);
    if (response && response.data && response.data.results && response.data.results[0] && response.data.results[0].components) {
        const { city } = response.data.results[0].components;
        console.log('====================================');
        console.log(city);
        console.log('====================================');
        return city;
    }
    return null;
}

module.exports = {
    getCityWithLatAndLong
}