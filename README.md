# chartMaker
server which generates chart image

`./build/run.sh`

# запуск dev
`npm i & npm start`

Запускается на порте из env CHARTMAKER_PORT либо на 3300

```
REQUEST:
POST http://localhost:{PORT}/
BODY {
  data: [
    {
      "x": "{UNIX TIMESTAMP}",
      "y": "{NUMBER}"
    }, ...
  ]
}
```

```
RESPONSE:
png image
```

