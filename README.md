# 🏢 Companies Directory (Frontend)

A responsive React application for filtering and viewing company data with **Infinite Scroll**.

## ✨ Overview & Tech Stack

This project demonstrates proficiency in modern frontend development by centralizing state management and integrating a third-party UI library.

| Category | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | **React (v18)** | Core UI library. |
| **Build Tool** | **Vite** | Fast development and bundling (managed by **Bun**). |
| **UI/Styling** | **Chakra UI** | Responsive layout (`Grid`, `Card`) and accessible components (Bonus). |
| **State** | **`useState`**, **`useMemo`** | Centralized local state and optimized filtering/slicing logic. |
| **Bonus** | **`react-intersection-observer`** | Implements the **Infinite Scroll** for large datasets. |
| **API** | **`data.json`** | Static file mocking the API response (30 MNC records). |

***

## 🚀 Getting Started

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Tarunvegi-dev/CompanyDirectory_Frontend/
    cd CompanyDirectory_Frontend
    ```

2.  **Install dependencies (using Bun):**
    ```bash
    bun install
    ```

3.  **Run the application:**
    ```bash
    bun run dev
    ```

The application will be accessible at `http://localhost:5173`.

***

## 💡 Key Implementation Decisions

| Decision | Implementation | Rationale |
| :--- | :--- | :--- |
| **State Management** | **Local Component State** (`DirectoryContainer.jsx`) | Faster and cleaner than using Context/Redux, as the app is a single-view, single-page application. |
| **Filtering Logic** | **`useMemo`** hook | Optimizes performance by ensuring the expensive filter and data **slicing** logic only runs when the input dependencies (`filters` or `companies`) change. |
| **Infinite Scroll** | **`useInView` Hook** | Uses the Intersection Observer API to efficiently detect when the sentinel element at the end of the list enters the viewport, triggering the next batch load (`currentPage + 1`). |
