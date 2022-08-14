# Oslash Backend

Backen implementation of a personalised URL manager.

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
```git
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

### WIP 
- Updaating route to update shortURL
- Deployment and in-house documentation


### Future enhancements
- handle token expiration on logout route
- ShortURL analytics following backlinks and visits.