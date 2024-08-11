import dotenv from "dotenv";
dotenv.config();
import axios from "axios";

class Controller {
    async get_themes(req, res) {
        try {
            const config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${process.env.SHOP_URL}/admin/api/${process.env.API_VERSION}/${process.env.API_ENDPOINT}`,
                headers: {
                    'Content-Type': 'application/json',
                    'X-Shopify-Access-Token': process.env.ACCESS_TOKEN,
                }
            };

            const response = await axios.request(config);
            res.json(response.data);
        } catch (error) {
            console.error(error);
            res.status(500).send('Hello world');
        }
    }
}

export default new Controller();
