
```markdown
# OpenTDB Visualizer

A mini data visualization tool built with **React + Vite**, using the [Open Trivia DB API](https://opentdb.com).  
It lets you explore trivia questions, filter by category, and view distributions by **category** and **difficulty**.

---

## Features
- Fetches 50+ trivia questions from OpenTDB.
- Dropdown to filter questions by category.
- Interactive **Bar Chart** (questions by category).
- Interactive **Pie Chart** (questions by difficulty).
- Styled with **Tailwind CSS**.
- State management with **Zustand**.
- Responsive layout with `Recharts` for data visualization.

---

## Project Structure

````

src/
- api/          API requests (fetch token, questions, categories)
- components/   Reusable UI components (Header, Controls, Charts, List)
- data/         Static config (colors, constants)
- hooks/         Custom hooks (e.g., useInit, useToken)
- selectors/    Selectors to group/filter questions
- store/        Zustand stores (categories, questions)
- types/        TypeScript types for questions, categories, API responses
- App.tsx       Root component
- main.tsx      React/Vite entry point
- index.css     Tailwind & global styles
- App.css       Additional styles

````

---

## 🛠️ Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/<your-repo>.git
   cd <your-repo>
````

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run in development mode:

   ```bash
   npm run dev
   ```

4. Build for production:

   ```bash
   npm run build
   ```

5. (Optional) Preview the build locally:

   ```bash
   npm run preview
   ```

---

##  Deployment

This project can be deployed as a static site on **GitHub Pages**, **Vercel**, or **Netlify**.

### GitHub Pages Deployment

1. Install gh-pages:

   ```bash
   npm install -D gh-pages
   ```

2. Add the following to your `package.json`:

   ```json
   {
     "homepage": "https://<your-username>.github.io/<your-repo>/",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. Deploy with:

   ```bash
   npm run deploy
   ```

---


##  Tech Stack

* [React](https://react.dev/)
* [Vite](https://vitejs.dev/)
* [Tailwind CSS](https://tailwindcss.com/)
* [Recharts](https://recharts.org/)
* [Zustand](https://github.com/pmndrs/zustand)

---

## 📜 License

MIT – free to use, modify, and share.



