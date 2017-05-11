# random-power-data
Simple api which pushes random power usage values in format `[avg, min, max]` every 500ms over a websocket

## Usage
Connect to my live instance of the API:
```javascript
const ws = new WebSocket('ws://power.rijks.website:80');

ws.onmessage = function(message) {
  console.log(JSON.parse(message.data));
}
```

_Note: The live API will probably be taken down by the end of May 2017_

Create an own instance:
```bash
$ git clone https://github.com/rijkvanzanten/random-power-data.git
```

```bash
$ cd random-power-data && npm install
```

Start the app:
```bash
$ npm start
```

Start the app in dev mode (with debugging messages):
```bash
$ npm run dev
```

### ENV settings
You can modify the port on which the server runs by providing a PORT env variable.

## License

MIT License

Copyright © 2017 Rijk van Zanten
