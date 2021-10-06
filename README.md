# github-search
github-search is a project to search Github repositories

## Getting Started
### Prerequisites
Node v12 or higher

### Create personal access token
Add [personal-access-token](https://github.com/settings/tokens/) to .env 
```
REAT_APP_AUTH=YOUR_TOKEN
```
### Start project
1. `yarn install`
2. `yarn start`

##  Architecture 
- react-bootstrap
- react-router-dom
- react-spinners
- ...

## Feature
- Debounce input change
- Highlight keywords in repo tile or description
- Use intersectionOberver to load more repos
- Pasrse url params as input
- Notificate user when too much requests


