# 🍴 Recipe & Meal Planner

A responsive recipe and meal-planning application built with **Next.js, TypeScript, Tailwind CSS, and React Context API**.

The application allows users to browse recipes, search recipes, save favorites, plan meals for the week, and automatically generate a shopping list based on their planned meals.

## 🌐 Live Demo

👉 **[View Recipe & Meal Planner](https://recipe-planner-puce.vercel.app)**

## 🚀 Features

---

### Recipe Browsing

- Browse recipes from local mock JSON data
- Recipe cards with:
  - Recipe name
  - Image
  - Cuisine
  - Difficulty
  - Cook time
  - Rating
  - Meal type
- Responsive recipe grid
- Recipe detail pages
- Dynamic recipe routing using `/recipes/[id]`

### 🔎 Search

Users can search recipes by:

- Recipe name
- Ingredients
- Cuisine
- Difficulty
- Tags
- Meal type

Search works from the home/recipe listing page and supports pressing **Enter** or clicking the search button.

### ❤️ Favorites

Users can:

- Add recipes to favorites
- Remove recipes from favorites
- View all favorite recipes
- Favorite recipes from recipe cards and recipe detail pages
- Select the ingredients from the list and add to cart

Favorites are persisted using `localStorage`, so they remain available after refreshing the browser.

### 📅 Weekly Meal Planner

Users can plan recipes across a weekly calendar:

- Monday – Sunday
- Add recipes to a specific day
- Remove planned recipes
- View the planned recipes for each day
- Planned meals are managed using React Context

### 🛒 Shopping List

The shopping list is generated automatically from planned meals.

Features include:

- Automatically collects ingredients from planned recipes
- De-duplicates ingredients
- Displays how many planned recipes use an ingredient
- Check off ingredients
- Card Virtualization
- Pagination for large ingredient lists
- Empty state when no meals are planned

The shopping list is **derived from planner state** rather than being stored separately.

### 📱 Responsive UI

The application is designed to work across:

- Desktop
- Tablet
- Mobile

# 🛠️ Tech Stack

- **Next.js 16+**
- **Next.js App Router**
- **TypeScript**
- **React**
- **Tailwind CSS**
- **React Context API**
- **localStorage**
- **JSON mock data**
- **Next.js Image component**
- **React Icons**
- **react-virtuoso**

No external state management library is used.
