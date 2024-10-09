const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const path = require('path');

const db = require('./config/mongoose-connection');
const ownersRouter = require('./routes/ownersRouter');
const usersRouter = require('./routes/usersRouter');
const productsRouter = require('./routes/productsRouter');
const userModel = require('./models/user-model')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/owners', ownersRouter);

// Combine the two root handlers
app.get('/', (req, res) => {
    const error = [];
    res.render("index", { error });
});

app.post('/users/register', async (req, res) => {
    try {
        let { email, password, fullName } = req.body;
        const user = await userModel.create({
            email,
            password,
            fullName,
        })
        res.send(user)
        res.redirect('shop')

    } catch (err) {
        console.log(err)
    }

})
app.get('/shop', async (req, res) => {
    try {

        const products = [
            {
                name: "Product 1",
                price: 100,
                bgcolor: "#f0f0f0",
                panelcolor: "#ffffff",
                textcolor: "#000000",
                image: "some-image-binary-data"
            },
            {
                name: "Product 2",
                price: 200,
                bgcolor: "#e0e0e0",
                panelcolor: "#fafafa",
                textcolor: "#333333",
                image: "some-image-binary-data"
            },
            {
                name: "Product 3",
                price: 200,
                bgcolor: "#e0e0e0",
                panelcolor: "#fafafa",
                textcolor: "#333333",
                image: "some-image-binary-data"
            }
        ];


        // Render the shop page and pass the products array
        res.render('shop', { products });
    } catch (error) {
        console.error("Error fetching products: ", error);
        res.status(500).send("Internal Server Error");
    }
});


app.post('/users/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email, password });
        if (user) {
            res.redirect('shop')
            // res.send('Login successful');
        } else {
            res.send('Invalid email or password')
        }
    } catch (err) {
        console.log(err)
    }
})

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
