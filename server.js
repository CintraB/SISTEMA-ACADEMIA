require("dotenv").config();
const app = require("./src/app.js");

app.listen(process.env.PORTA, () => {
    console.log("Server ouvindo na porta " + process.env.PORTA);
});
