# <?= proj_des ?>

## Usage
- init
  - ```git clone the repo.```
  - ```yarn / npm i```

- develop
  - ```yarn start / npm start```
  - open http://localhost:2666 to view it in the browser.

- build
  - ```yarn run build / npm run build```
  - build it for production mode, you can find the outputs in ``` dist ``` folder.

- deploy
  - rewrite all reqs to the ``` index.html ``` file.

## About
- project structure
  ```
  .
  ├── config                        
  │   ├── webpack.config.dev.js     # webpack config file
  ├── src                           # source code
  │   ├── components                # common components
  │   ├── conf                      # app common configs
  │   │   ├── config.js             # app config file
  │   │   ├── locales               # i18n
  │   ├── assets                    # static file
  │   │   ├── images                # images
  │   │   └── common.scss           # style file
  │   └── redux                     # redux(reducer actions)
  ├── .babelrc                      # babel config file
  ├── .gitignore                    
  ├── package.json                  
  ├── README.md                    
  ├── CHANGELOG.md                     
  └── yarn.lock                     # yarn lock file
  ```


