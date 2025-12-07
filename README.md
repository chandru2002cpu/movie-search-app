# 🎬 Movie Search App

A full-featured movie search application built with React that integrates with the OMDB API. Search for movies, TV series, and episodes, view detailed information, and filter results by type.

![React](https://img.shields.io/badge/React-18.2.0-blue)
![Vite](https://img.shields.io/badge/Vite-5.0.8-purple)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3.6-cyan)
![React Router](https://img.shields.io/badge/React_Router-6.20.0-red)

## ✨ Features

- 🔍 **Advanced Search** - Search for movies, TV series, and episodes by title or keywords
- 🎭 **Type Filtering** - Filter results by type (All, Movies, Series, Episodes) using API endpoint
- 📄 **Pagination** - Navigate through large result sets with intelligent pagination
- 🎥 **Detailed View** - View comprehensive movie information including:
  - High-quality posters
  - Plot summaries
  - Release year, genre, runtime
  - IMDb and other ratings
  - Cast and crew information
  - Awards and box office data
- 🎨 **Modern UI** - Beautiful, responsive design with Tailwind CSS
- ⚡ **Fast Performance** - Built with Vite for optimal speed
- 🚀 **Error Handling** - User-friendly error messages and loading states
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices

## 🛠️ Tech Stack

- **Frontend Framework:** React 18.2.0
- **Build Tool:** Vite 5.0.8
- **Routing:** React Router DOM 6.20.0
- **Styling:** Tailwind CSS 3.3.6
- **API:** OMDB API (Open Movie Database)
- **Language:** JavaScript (ES6+)

## 📁 Project Structure

```
Movie searching app/
├── public/
├── src/
│   ├── components/
│   │   ├── MovieCard.jsx       # Movie card component for grid display
│   │   └── Pagination.jsx      # Pagination component
│   ├── pages/
│   │   ├── SearchPage.jsx      # Main search page with filters
│   │   └── MovieDetails.jsx    # Detailed movie information page
│   ├── services/
│   │   └── omdbAPI.js          # API service functions
│   ├── App.jsx                 # Main app component with routing
│   ├── main.jsx                # Application entry point
│   └── index.css               # Global styles with Tailwind
├── .env                        # Environment variables (API key)
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager
- OMDB API Key (free from [OMDB API](https://www.omdbapi.com/apikey.aspx))

### Installation

1. **Clone or navigate to the project directory**

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up your OMDB API Key**
   
   - Get a free API key from [https://www.omdbapi.com/apikey.aspx](https://www.omdbapi.com/apikey.aspx)
   - Open the `.env` file in the root directory
   - Replace `your_api_key_here` with your actual API key:
   
   ```env
   VITE_OMDB_API_KEY=your_actual_api_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## 📖 Usage Guide

### Searching for Movies

1. **Enter a search term** in the search bar (e.g., "Inception", "Batman", "Marvel")
2. **Select a type filter** from the dropdown (optional):
   - All Types
   - Movies
   - Series
   - Episodes
3. **Click the Search button** or press Enter

### Filtering Results

- Use the **Type Filter dropdown** to filter by content type
- The filter uses the OMDB API endpoint (no client-side filtering)
- Results update automatically when filter changes

### Viewing Movie Details

- **Click on any movie card** to view detailed information
- Details include:
  - Full plot summary
  - Complete cast and crew
  - Multiple rating sources
  - Awards and achievements
  - Box office information
  - Link to IMDb page

### Pagination

- Navigate through results using **Previous/Next buttons**
- Click on **page numbers** to jump to specific pages
- Results are limited to 10 per page (OMDB API standard)

## 🔧 API Integration

### OMDB API Endpoints Used

**Search Movies:**
```
GET https://www.omdbapi.com/?apikey=YOUR_KEY&s=SEARCH_TERM&page=1&type=movie
```

**Get Movie Details:**
```
GET https://www.omdbapi.com/?apikey=YOUR_KEY&i=IMDB_ID&plot=full
```

### API Service Functions

Located in `src/services/omdbAPI.js`:

- **`searchMovies(searchTerm, page, type)`** - Search for movies with pagination and type filtering
- **`getMovieDetails(imdbID)`** - Fetch detailed information for a specific movie

## 🎨 Features Implemented

### ✅ Core Requirements

- [x] OMDB API integration
- [x] API service functions for search and details
- [x] Search bar with keyword input
- [x] Grid display of search results
- [x] Pagination for large result sets
- [x] Detailed movie view with comprehensive information
- [x] Type filter dropdown (uses API endpoint, no array.filter())
- [x] React Router navigation
- [x] Error handling with user-friendly messages
- [x] Loading states and empty states
- [x] Clean, documented code
- [x] README documentation

### 🎯 Additional Features

- Responsive grid layout (1-5 columns based on screen size)
- Smooth animations and hover effects
- Placeholder images for missing posters
- Total results count display
- Scroll to top on page change
- External IMDb links
- Genre badges
- Multiple rating sources display
- Dark theme UI

## 🐛 Error Handling

The app handles various error scenarios:

- **No API Key:** Displays helpful message to add API key
- **Network Errors:** Shows connection error message
- **No Results Found:** Displays "no results" message
- **Invalid Movie ID:** Shows error when movie not found
- **Empty Search:** Prevents empty searches with validation

## 🎯 Best Practices Followed

- **Component-Based Architecture** - Reusable, modular components
- **Clean Code** - Well-commented and readable code
- **Error Boundaries** - Comprehensive error handling
- **Performance** - Optimized rendering and API calls
- **Accessibility** - Semantic HTML and ARIA attributes
- **Responsive Design** - Mobile-first approach
- **Environment Variables** - Secure API key storage
- **No Client-Side Filtering** - Uses API endpoints for type filtering

## 📝 Notes

- The OMDB API has rate limits (1000 requests/day for free tier)
- Search results are limited to 10 items per page by the API
- Type filter uses the API `&type=` parameter (not client-side filtering)
- All movie posters are served via HTTPS from OMDB

## 🤝 Contributing

Feel free to fork this project and submit pull requests for any improvements!

## 📄 License

This project is open source and available for educational purposes.

## 🙏 Acknowledgments

- [OMDB API](https://www.omdbapi.com/) for providing the movie data
- [React](https://react.dev/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS
- [Vite](https://vitejs.dev/) for the lightning-fast build tool

---

**Built with ❤️ using React, Vite, and Tailwind CSS**
