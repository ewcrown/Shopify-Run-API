import dotenv from "dotenv";
dotenv.config();
import axios from "axios";

class Controller {
    async get_themes(req, res) {
        try {
            // Build the URL
            const shopUrl = process.env.SHOP_URL;
            const apiVersion = process.env.API_VERSION || '2024-01';
            const endpoint = process.env.API_ENDPOINT || 'themes.json';
            const url = `${shopUrl}/admin/api/${apiVersion}/${endpoint}`;
            
            console.log('Making request to:', url);
            console.log('Shop URL:', shopUrl);
            console.log('API Version:', apiVersion);
            console.log('Endpoint:', endpoint);
            console.log('Has Access Token:', !!process.env.ACCESS_TOKEN);

            const config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: url,
                headers: {
                    'Content-Type': 'application/json',
                    'X-Shopify-Access-Token': process.env.ACCESS_TOKEN,
                }
            };

            const response = await axios.request(config);
            res.json(response.data);
        } catch (error) {
            console.error('\n=== ERROR DETAILS ===');
            console.error('Error message:', error.message);
            
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error('Status:', error.response.status);
                console.error('Status Text:', error.response.statusText);
                console.error('Response Data:', JSON.stringify(error.response.data, null, 2));
                console.error('Response Headers:', error.response.headers);
                
                res.status(error.response.status).json({
                    error: 'Shopify API Error',
                    status: error.response.status,
                    statusText: error.response.statusText,
                    data: error.response.data
                });
            } else if (error.request) {
                // The request was made but no response was received
                console.error('No response received');
                console.error('Request config:', error.config);
                
                res.status(500).json({
                    error: 'No response from Shopify API',
                    message: 'The request was made but no response was received',
                    url: error.config?.url
                });
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Error setting up request:', error.message);
                
                res.status(500).json({
                    error: 'Request setup error',
                    message: error.message
                });
            }
            console.error('===================\n');
        }
    }
}

export default new Controller();
