# 🛸 Rick and Morty Dashboard (RS School React Task)

[English Version](#english-version) | [Русская Версия](#русская-версия)

---

<a name="english-version"></a>

## 🇺🇸 English Version

This is a modern React application created as part of the [RS School](https://rs.school/courses/reactjs) course. The project evolved from class-based components to a modern architecture using hooks and functional components.

### 🚀 Key Features

- **Functional Components & Hooks**: Fully refactored from class components.
- **Search Params Routing**: Navigation (search, pagination, details) is managed entirely via URL Search Params.
- **Master-Detail Pattern**: Character list on the left and a details panel on the right, synchronized with the URL.
- **Persistent State**: Search queries are saved in `localStorage` and restored on page reload.
- **Error Boundary**: Global error handling with an option to recovery (refresh).
- **Modern UI**: Sleek Glassmorphism design, dark mode, and responsive grid.

### 🛠 Tech Stack

- **Core**: React 18 + TypeScript
- **Bundler**: Vite
- **Routing**: React Router v7
- **Testing**: Vitest + React Testing Library (RTL)
- **Code Quality**: ESLint (Airbnb config) + Prettier

### 📦 Installation and Setup

1. **Clone the repository**:
   ```bash
   git clone [your-repo-url]
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Run development server**:
   ```bash
   npm run dev
   ```

### 🧪 Testing and Quality

- **Run all tests**: `npm run test`
- **Check Coverage**: `npm run test:coverage` (Current coverage: **~97%**)
- **Linting**: `npm run lint`

---

<a name="русская-версия"></a>

## 🇷🇺 Русская Версия

Это современное React-приложение, созданное в рамках обучения в [RS School](https://rs.school/courses/reactjs). Проект прошел путь от классовых компонентов до современной архитектуры на хуках.

### 🚀 Основные возможности

- **Functional Components & Hooks**: Полностью переписан на функциональные компоненты.
- **Search Params Routing**: Вся навигация (поиск, пагинация, детали) управляется через URL Search Params.
- **Master-Detail Pattern**: Список персонажей слева и панель деталей справа, синхронизированная с URL.
- **Persistent State**: Поисковый запрос сохраняется в `localStorage`.
- **Error Boundary**: Глобальный перехват ошибок с кнопкой перезагрузки.
- **Modern UI**: Стеклянный дизайн (Glassmorphism), темная тема и адаптивная сетка.

### 🛠 Технологический стек

- **Core**: React 18 + TypeScript
- **Bundler**: Vite
- **Routing**: React Router v7
- **Testing**: Vitest + RTL
- **Code Quality**: ESLint + Prettier

### 📦 Установка и запуск

1. **Установите зависимости**: `npm install`
2. **Запустите проект**: `npm run dev`

### 🧪 Тестирование

- **Запуск тестов**: `npm run test`
- **Проверка покрытия**: `npm run test:coverage` (**Текущее покрытие: ~97%**)
- **Линтинг**: `npm run lint`

---

## 📁 Project Structure / Структура проекта

```text
src/
├── components/      # Reusable components (Card, SearchBar, ErrorBoundary, etc.)
├── hooks/           # Custom hooks (useLocalStorage)
├── routes/          # Page components (CharacterDetails, NotFound, About)
├── __tests__/       # Unit tests
├── App.tsx          # Main container component
└── main.tsx         # Entry point and router config
```

## ✍️ Author / Автор

**Kanykei Zulumova**

---

_Created for RS School React Course 2026._
