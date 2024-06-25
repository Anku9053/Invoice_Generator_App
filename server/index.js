const express = require('express');
const axios = require('axios');
const cors = require('cors')
const app = express();
const port = 5000;

app.use(express.json());

const corsConfiguration = {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
};
app.use(cors(corsConfiguration));

app.post('/api/create-invoice', async (req, res) => {
    const api_key = 'sk_jnk6QWdQBl906sP5MLb3Jxh6kCtV4fOi';
    try {
        const response = await axios.post('https://invoice-generator.com', req.body, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${api_key}`
            },
            responseType: 'arraybuffer'  // Ensure the response is in the correct format
        });

        res.setHeader('Content-Disposition', 'attachment; filename=invoice.pdf');
        res.setHeader('Content-Type', 'application/pdf');
        res.send(response.data);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error creating invoice');
    }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
