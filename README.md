# Modified for TWI 8.60
link should be https://twifan860.github.io/8.60/#
![TWI Preview](https://user-images.githubusercontent.com/96718769/147500597-5806a997-3cc4-4c02-b497-33dcd2622ead.png)

Steps:
1. copy twi chapter 8.60 to `src/twi860.txt`
1. `cd src/`
1. `python gen.py`
1. `npm start`

Others:
1. to deploy to gh-pages: `npm run deploy`
1. to debug: change to using `dummy.txt` in `gen.py`

---
# Discord React Clone

![Preview](https://i.imgur.com/0UpCir4.gif)

Demo: [https://rafaelalmeidatk.github.io/discord-react-clone/](https://rafaelalmeidatk.github.io/discord-react-clone/)

This project is a front-end replication of Discord's app made with React. This is not a full replication so I added the most used parts of the app.

The main objective of this project was to learn React hooks and `styled-components` (so aside from normalize.css, this is the only library utilized).

Some observations:
* The styled scrollbars only work on webkit-based browsers
* As it is a front-end only project, all the data is mocked in a single file
* I don't have the official font that Discord utilizes so I utilized Catamaran instead, it is not very similar but isn't so bad
* All arts (except the cats) were extracted from the official app, all the rights belong to Discord

## Running the project

    npm start
    # or
    yarn start

This will run the app in development mode, open [http://localhost:3000](http://localhost:3000) to view it in the browser.
