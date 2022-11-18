## To run on local server

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install --shamefully-hoist
```

Start the development server on http://localhost:3000

```bash
npm run dev
```

Start the local json server to get user data on http://localhost:5000/users

```bash
npx json-server --watch data/db.json --port 5000
```