# webservice.kailash.space

webservices.kailash.space is a node web service created to support kailash.space. It is build with hapi library.

## Installation

Install the [node package manager](https://nodejs.org/en/download/) to install node_modules required for running webservice.kailash.space. 


```bash
npm i 
```

## Post-Installation
Run following command to set up .env file. replace the .env file content with appropritate values.
```
npm run setup-win                   // if running on windows
npm run setup-linux                 // if running on other machines
```

Run the following command to access webservice.kailash.space code locally


```bash
npm run start
```

## Available API's

| Route  | explanation |
| ------------- | ------------- |
| /  | returns the api version number  |
| /bonuses  | returns list of recognitions received by me.   |
| /latest-achievements  | returns list of achievements received by me if foundin latest achievements field |
| /articles  | returns list of articles written by me on medium site |


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)