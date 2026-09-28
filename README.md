# Post Composer

## Aim

To create a React Post Composer with platform selection and character-limit validation for Twitter and LinkedIn.

## Features

* **Twitter character limit**: 280 characters
* **LinkedIn character limit**: 3000 characters
* **Dynamic character count**: Updates in real-time as the user types
* **Character validation**: Highlights count in red when limit is exceeded
* **Error message**: Displays a clear alert message when the post is too long
* **Controlled textarea**: Form input synchronized with React state
* **Disabled Post button**: Prevents posting when content is empty or exceeds character limits

## React Concept Used

### Controlled Components & React State (`useState`)

In React, a **Controlled Component** is an input element (like `<textarea>` or `<select>`) whose value is controlled by React state rather than the DOM.

1. **State Storage**: The `useState` hook stores the current state values:
   - `platform`: holds `"Twitter"` or `"LinkedIn"`
   - `post`: holds the text entered in the textarea

2. **Single Source of Truth**:
   - The `<textarea>` receives its display text via `value={post}`.
   - Every keystroke fires an `onChange` event listener which calls `setPost(e.target.value)`.
   - This keeps the component state and UI in sync at all times, making real-time validation instant and predictable.

## Workflow

1. **User selects a platform**: The user chooses between Twitter or LinkedIn from the dropdown menu.
2. **User enters post content**: The user types text into the controlled textarea.
3. **React stores the input in state**: `useState` triggers a re-render with updated `platform` and `post` values.
4. **Platform determines character limit**: The limit dynamically updates (`Twitter → 280`, `LinkedIn → 3000`).
5. **Application validates character count**: Compares `post.length` against `limit`.
6. **Character count is displayed**: Renders `"Characters: X / Y"`. Turns red if `post.length > limit`.
7. **Error display & Button state**: If the limit is exceeded or text is empty, an error message appears and the "Post" button is disabled.

## Getting Started

### Installation

```bash
npm install
```

### Running the Development Server

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.
