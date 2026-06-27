# Arabic Mathematical Editor

A highly specialized, web-based rich-text editor for writing complex mathematical equations in Arabic. Built from the ground up with React, TypeScript, and the Slate.js framework, this project tackles the unique challenges of rendering right-to-left (RTL) mathematical notations.

[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Slate.js](https://img.shields.io/badge/Slate.js-2B313B?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjU2IiBoZWlnaHQ9IjI1NiIgdmlld0JveD0iMCAwIDI1NiAyNTYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEyOCAwTDI1NiA2NFYxOTJMMTI4IDI1NkwwIDE5MlY2NFoiIGZpbGw9IiMyQjMxM0IiLz48cGF0aCBkPSJNNjQgMzJMMTkyIDgwVjE3Nkw2NCAxMjhaIiBmaWxsPSIjRkZGIi8+PC9zdmc+)](https://www.slatejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

**[View the Live Demo &raquo;](https://arabic-math-editor.vercel.app/)**

---

## 🎯 Project Overview

Standard text editors often fail to properly support the complex, nested, and RTL nature of Arabic mathematical formulas. This project provides a robust solution by creating a custom, extensible editor that allows users to intuitively write and see complex equations rendered beautifully in real-time.

## ✨ Key Features

- **Custom Mathematical Components:** Implements custom, editable components for a wide range of mathematical notations.
- **Nested Editable Zones:** Each part of a formula (e.g., numerator, denominator, base, power) is its own editable field for a seamless user experience.
- **Smart Input:** Automatically creates paired brackets `()`, `[]`, `{}` to speed up writing.
- **RTL-First Design:** Built with Right-to-Left layout as a primary consideration.
- **Extensible Architecture:** The use of Slate.js allows for easy addition of new mathematical symbols and structures in the future.
- **Zero Dependencies on Math Libraries:** All rendering logic is custom-built, demonstrating a deep understanding of the DOM and CSS.

### Implemented Mathematical Structures

- **Fractions:** `(كسر)`
- **Superscripts & Subscripts:** `(أس و أساس)`
- **Summations (Sigma):** `(رمز التجميع)`
- **Integrals:** `(رمز التكامل)`
- **N-th Roots:** `(الجذر النوني)`
- **Limits:** `(النهايات)`
- **Matrices:** `(المصفوفات)`
- **Paired Brackets:** `(الأقواس المتمددة)`

---

## 📸 Screenshots

_(It's highly recommended to add screenshots of your application here to showcase the UI)_

| Editor Interface |
| ---------------- |
| !Desktop Preview |

---

## 🛠️ Tech Stack

- **Framework:** React
- **Language:** TypeScript
- **Editor Core:** Slate.js, Slate-React
- **Styling:** Tailwind CSS
- **Build Tool:** Vite

---

## 🚀 How to Run Locally

To get a local copy up and running, follow these simple steps.

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/nouran-Omar/Arabic-mathematical-editor.git
    cd Arabic-mathematical-editor
    ```

2.  **Install NPM packages:**

    ```bash
    npm install
    ```

3.  **Run the development server:**

    ```bash
    npm run dev
    ```

    Open http://localhost:5173 (or the port specified in your terminal) to view it in your browser.

---

## 🧠 Core Concepts & Implementation

The editor leverages Slate.js's custom element and rendering capabilities.

- **`withMath` Plugin:** A custom Slate plugin is used to define which elements should be treated as `inline` to allow them to sit correctly within a line of text.
- **`renderElement` Function:** This is the heart of the visual rendering. A large `switch` statement maps each custom element type (e.g., `'fraction'`, `'summation'`) to its corresponding React component (`<FractionElement />`, `<SummationElement />`).
- **Custom Components:** Each mathematical structure is a dedicated React component that uses Flexbox and relative/absolute positioning to arrange its children (the editable parts) correctly.
- **`onKeyDown` Handler:** Intercepts keyboard events to implement smart features, like wrapping a selection in paired brackets.

This project is an excellent example of solving a complex UI problem with a deep understanding of a framework's architecture.
