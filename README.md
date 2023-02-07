# E-commerce API backend

>📛 Here are Backend files, but look through [Frontend](https://github.com/Artuchka/mini-projects/tree/e-commerce) part if you're interested 

>### [🔗Docgen Documentation](https://long-gray-helmet.cyclic.app/)

>### 📚About the Project:

&nbsp;&nbsp;My motivation was to showcase part(!) of my cool skills on creating complex REST API via Express and MongoDB.


>### 🧰Technologies Used:
- Node JS
- Express
- JWT
- MongoDB
- Mongoose
- bcryptjs


>### 🛠️Setup / Installation: 

1. clone this repo to your local machine
2. in terminal run following to install dependencies
```
npm i
```

3. to start live server
```
npm run dev
```

Please, provide Enviromental Variables:\
PORT=\
MONGO_URL=\
JWT_SECRET=\
JWT_LIFETIME=

>### 🚶Approach:
File structure pattern is well known and common:
- <route_name>Router.js at /routers folder for setting up routes 
- <route_name>Controller.js at /controllers folder for setting up controllers of specified route 
- <route_name>Model.js at /models folder for setting up MongoDB schema


```bcryptjs``` is used for hashing passwords with salt before storing them in Database

```jsonwebtoken``` with ```cookie-parser``` is used for creating\decoding crypted Tokens, safely containing info about current user. JWT are stored in cookies.


For hosting the server I chose cyclic.sh, becauser it has generous free tier with no sleep

>### 📝Credits: 
Thanks to my teachers: 
- Kyle from [Web Dev Simplified](https://www.youtube.com/@WebDevSimplified)
- John from [Coding Addict](https://www.youtube.com/@CodingAddict)
- Jeff from [Fireship](https://www.youtube.com/@Fireship)



>### ©️License: 
MIT license @Artuchka




