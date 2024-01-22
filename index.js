const express = require('express');
const app = express();
const zod = require('zod');

// app.use(express.json());

function users(req, res, next) {
    const { username, password, email } = req.headers;

    const userZod = {
        usernameZod: zod.string().min(2),
        passwordZod: zod.string().min(8),
        emailZod: zod.string().email()
    };

    const result = zod.object(userZod).safeParse({
        usernameZod: username,
        passwordZod: password,
        emailZod: email
    });

    if(!(username == 'leo' && password == 'leonelmessi' && email == 'leo@gmail.com')){
        res.json({msg:'username or password or email is wrong!'})
        return;
    }
    if (result.success) { 
        next();
    } else {
        res.json({ msg: 'Error in input data' });
    }
}

// app.post('/',users, (req, res) => {
//     res.send('Zod authentication is successful');
// });

app.get('/', users,(req, res) => {
    res.json({ msg: 'Welcome to your login page' });
});

app.listen(3030, () => {
    console.log('Server is running on port 3030');
});
