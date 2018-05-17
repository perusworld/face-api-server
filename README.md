# Simple Face API Server, with options to switch to any backend in the future - Node.js TypeScript Express #

### NOTE: needs the following for now on heroku ###
```bash
heroku config:set NPM_CONFIG_PRODUCTION=false
```

### Run ###
- Bash
```bash
npm run build && npm start
```
 - Powershell
```powershell
npm run build ; npm start
```

#### URL
[Local](http://localhost:3000/)

### Calling Detect Persons
```bash
curl -X POST --data-binary @your-image.jpg http://localhost:3000/api/v1/detect-persons -H 'Content-Type: application/octet-stream'
```