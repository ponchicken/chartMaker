# chartMaker
server which generates chart image

`npm i`

`npm start`

Запусткается на порте из env CHARTMAKER_PORT либо на 3300

```
REQUEST:
POST http://localhost:{PORT}/
BODY {
  data: [
    {
      "x": "{UNIX TIMESTAMP}",
      "y": "{NUMBER}"
  ]
}
```

```
RESPONSE:
png image
```

