# odin-todo-list

A modular JavaScript Todo List application built as part of The Odin Project curriculum.

## 🛠️ Getting Started

These instructions will help you set up and run the project on your local machine for development and testing purposes.

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14 or later)
- npm or yarn package manager

### Installation

```bash
# clone the repository
git clone git@github.com:rimanz/odin-todo-list.git

# navigate into the project directory
cd odin-todo-list

# install dependencies
npm install
# or
# yarn install
```

### Available Scripts

- `npm run build` - Build the project for production (outputs to `dist/`)
- `npm run dev` - Start the development server with hot reloading using `webpack-dev-server`

> Replace `npm` with `yarn` if you prefer using Yarn.

## 📂 Project Structure

```
webpack.common.js
webpack.dev.js
webpack.prod.js
src/
  index.js
  styles.css
  template.html
package.json
README.md
```

- **`src/`** contains application source files
- **`webpack.*.js`** configuration files for different environments

## 🚀 Usage

1. Start development server:
   ```bash
   npm run dev
   ```
2. Build for production:
   ```bash
   npm run build
   ```
3. Open `dist/index.html` in your browser or use a static server.

## 📄 Author

Riman Das
