require('dotenv').config({ path: "./.env" })
const app = require("./app.js"); 


const PORT = process.env.PORT || 8000;

app.listen(PORT || 8000, () => {
    console.log(`Server is running at port: ${PORT}`);
});

// db code coming in future