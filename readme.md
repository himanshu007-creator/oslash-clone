![](assets/oslash.png)
# Oslash Backend

Backend implementation of a personalised URL manager.

## Getting Started

This project is based on Tyepscript, Nodejs based on a MVC framework.

### Prerequisites

Requirements for the software and other tools to build, test and push 
- [Nodejs](https://nodejs.org/en/download/https://www.example.com)
- [NPM (package manager)](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- [Postman](https://www.postman.com/downloads/)

### Installing

Once above prerequisites are ensured to be there, follow these steps

Clone this project locally

```git
git clone https://github.com/himanshu007-creator/oslash-clone.git
```

now navigate to root and install the dependencies
```git
cd oslash-clone
```
```npm
npm install
```
Now our project is ready but we need to create a Config file. In root, create a folder named config and inside it create a file <code>config.js</code> and store following credentials

```
export default {
  port: XXXX,
  dbUri:
    "mongodb+srv://....true&w=majority",
  hash: "------",
  jwt: "---",
  corsOrigin: "http://localhost:3000",
};
```
Now simply run the development version of your project
```git
npm run dev
```

### endpoints available
<code>GET /o/:id</code> : redirects after geting full link from short link

 <code>POST /api/auth/login</code>: logins user based on user credentials

 <code>POST /api/auth/register</code>: Reigster new user

 <code>POST /api/auth/token</code>: provide access token using refresh token

 <code>DELETE /api/auth/logout</code>: revokes access from refreshtoken

  <code>POST /api/user/create</code>: creates new short url for user
  
<code>GET /api/user/links</code>: provides all user links with additional sorting based on <code>shortlink</code> or <code>create_at</code> property

 <code>DELETE /api/user/:short</code>: deletes a link 

 <code>GET /api/user/search</code>: search user based on <code>shortUrl</code> or <code>tag</code>

 <code>GET /api/performance</code> provide URL stats of individual user [under progress]

### WIP 
- Updaating route to update shortURL
- Deployment and in-house documentation


### Future enhancements
- handle token expiration on logout route
- ShortURL analytics following backlinks and visits.