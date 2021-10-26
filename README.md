# github-search
github-search is a project to search Github repositories
<br><br>

## Getting Started
### Prerequisites
Node v12 or higher
### Create personal access token
Add [personal-access-token](https://github.com/settings/tokens/) to .env 
```REACT_APP_AUTH=YOUR_TOKEN```
### Start project
1. `npm install`
2. `npm start`
<br><br><br>

##  Architecture 
### modules
- react-bootstrap
- react-router-dom
- react-spinners
- useContext + useReducer
- ...
### Introduction
The project has **Search** and **RepoList** two main components<br>
**Search** save input change and url params ```word``` as ```search``` to context<br>
**RepoList** use react ```useEffect``` to fetch repos depends on context ```search``` change, and ```useRef``` to record last repo <br>
<br><br>

## Features
- Debounce input change
- Highlight keywords in repo tile or description
- Use intersectionOberver to load more repos
- Pasrse url params as input
- Notificate user when too much requests


