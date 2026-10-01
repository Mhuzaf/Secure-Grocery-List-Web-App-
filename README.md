# Secure Grocery List Web Application

A full-stack, server-side rendered grocery list application built with **Deno, JavaScript, SQLite, HTML, and CSS**.

The application allows users to create accounts, authenticate securely, manage grocery items, and receive feedback through server-side validation and flash messages. The project focuses heavily on **secure web development**, including password hashing, session management, SQL injection prevention, XSS protection, and secure handling of user input.

---

## Features

### User Authentication
- User registration and login
- Password hashing using **PBKDF2 with SHA-256**
- UUID-based session creation
- Session management using HTTP cookies
- Persistent user records stored in SQLite

### Grocery List Management
- View grocery items stored in the database
- Add new grocery items
- Server-side validation of submitted items
- Dynamic rendering of grocery items
- Error messages for invalid input

### Validation
- Reusable server-side validation system
- Schema-based validation
- Required-field validation
- Minimum-length validation
- Field-specific error messages
- Preservation of submitted values when validation fails

### Security
- **Parameterized SQL queries** to protect against SQL injection
- **HTML escaping** to protect against Cross-Site Scripting (XSS)
- Password hashing instead of storing plaintext passwords
- Session identifiers generated using UUIDs
- Cookie-based session management
- Encoded flash-message cookies
- Server-side validation rather than relying only on client-side validation

### User Interface
- Server-side rendered HTML
- Semantic HTML elements
- Accessibility attributes such as `aria-labelledby`
- CSS Grid-based layouts
- Login and registration forms
- Client-side password confirmation validation
- Temporary flash notifications

---

## Technologies Used

| Technology | Purpose |
|---|---|
| **Deno** | Server-side JavaScript runtime |
| **JavaScript** | Application logic and client-side functionality |
| **SQLite** | Database and persistent data storage |
| **HTML5** | Structure and semantic markup |
| **CSS3** | Styling and page layout |
| **Web APIs** | Requests, responses, cookies, cryptography and browser functionality |

### Deno Libraries

- `@db/sqlite` — SQLite database interaction
- `@std/http` — HTTP utilities and cookie handling
- `@std/html` — HTML entity escaping
- `@std/encoding` — Base64 URL encoding and decoding

---

## Application Architecture

The application follows an **MVC-style structure** to separate different responsibilities within the application.

```text
Request
   │
   ▼
Server / Router
   │
   ▼
Controller
   │
   ├──► Validation
   │
   ├──► Model ───► SQLite Database
   │
   ▼
View
   │
   ▼
Render
   │
   ▼
HTTP Response
