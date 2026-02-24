# 🎨 Thumblify — AI-Powered YouTube Thumbnail Generator

<div align="center">

![Thumblify Banner](https://img.shields.io/badge/Thumblify-AI%20Thumbnail%20Generator-blueviolet?style=for-the-badge&logo=google&logoColor=white)

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb)](https://www.mongodb.com/)
[![Gemini AI](https://img.shields.io/badge/Google-Gemini%20AI-4285F4?style=flat-square&logo=google)](https://deepmind.google/technologies/gemini/)
[![Stripe](https://img.shields.io/badge/Stripe-Payments-635BFF?style=flat-square&logo=stripe)](https://stripe.com/)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-Image%20CDN-3448C5?style=flat-square&logo=cloudinary)](https://cloudinary.com/)
[![Vite](https://img.shields.io/badge/Vite-7.x-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)

**Thumblify** is a full-stack AI web application that lets you generate stunning, professional-grade YouTube thumbnails in seconds — using the power of Google Gemini's image generation API.

[🚀 Live Demo](#) · [📖 Docs](#project-structure) · [🐛 Report Bug](https://github.com/RohitKModi777/Thumblify-The-Thumbnail-Generator-/issues)

</div>

---

## 📌 Why I Built This

As a content creator or developer, designing YouTube thumbnails from scratch is time-consuming and often requires expensive design tools. I built **Thumblify** to solve this problem by creating an AI-powered platform that:

- **Removes the design barrier** — No Photoshop or Canva skills needed
- **Saves hours of work** — Generate professional thumbnails in seconds
- **Offers creative control** — Choose from multiple styles, color schemes, and aspect ratios
- **Serves as a portfolio project** — Demonstrates full-stack skills with AI integration, payment systems, and cloud storage

This project was built to explore how **Generative AI** (specifically Google Gemini's image generation) can be integrated into a production-ready SaaS application, complete with user authentication, subscription billing, and cloud-based asset management.

---

## ✨ Key Features

| Feature | Description |
|---|---|
| 🤖 **AI Thumbnail Generation** | Uses Google Gemini AI (`gemini-3-pro-image-preview`) to generate thumbnails from text prompts |
| 🎨 **5 Visual Styles** | Bold & Graphic, Tech/Futuristic, Minimalist, Photorealistic, Illustrated |
| 🌈 **8 Color Schemes** | Vibrant, Sunset, Forest, Neon, Purple, Monochrome, Ocean, Pastel |
| 📐 **3 Aspect Ratios** | 16:9 (YouTube), 1:1 (Square), 9:16 (Shorts/Reels) |
| 🔐 **Auth System** | Email/password registration + Google OAuth 2.0 login |
| 🗂️ **My Generations** | View, manage, and delete all your generated thumbnails |
| 💳 **Stripe Payments** | Subscription-based billing (INR currency support) |
| ☁️ **Cloudinary CDN** | All generated images are stored and served via Cloudinary |
| 📱 **Responsive Design** | Fully responsive UI built with React + TailwindCSS v4 |
| 🔔 **Toast Notifications** | Real-time feedback via react-hot-toast and react-toastify |
| 🌀 **Smooth Scrolling** | Lenis-powered smooth scroll experience |
| 🎭 **Jewel-Tone Theme** | Unique jewel-tone color per page (violet, emerald, rose, cyan, purple, sapphire) |

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| **React 19** | UI framework |
| **TypeScript** | Type-safe development |
| **Vite 7** | Lightning-fast bundler & dev server |
| **TailwindCSS v4** | Utility-first styling |
| **React Router v7** | Client-side routing |
| **Framer Motion (motion)** | Animations & transitions |
| **Lenis** | Smooth scroll library |
| **@react-oauth/google** | Google OAuth integration |
| **Axios** | HTTP client for API calls |
| **Lucide React** | Icon library |
| **React Hot Toast** | Toast notifications |
| **React Toastify** | Alert notifications |
| **React Fast Marquee** | Scrolling marquee component |
| **Stripe.js** | Payment integration |

### Backend
| Technology | Purpose |
|---|---|
| **Node.js + Express 5** | REST API server |
| **TypeScript** | Type-safe server code |
| **MongoDB + Mongoose** | Database & ODM |
| **express-session** | Session-based authentication |
| **connect-mongo** | MongoDB session store |
| **@google/genai** | Google Gemini AI SDK |
| **Cloudinary** | Image upload & CDN |
| **Stripe** | Payment processing |
| **bcrypt** | Password hashing |
| **google-auth-library** | Google OAuth token verification |
| **tsx + nodemon** | Dev server with hot-reload |

---

## 📁 Project Structure

```
Thumblify/
├── 📁 client/                          # React Frontend (Vite + TypeScript)
│   ├── index.html                      # App entry HTML
│   ├── vite.config.ts                  # Vite configuration
│   ├── tsconfig.json                   # TypeScript config
│   ├── vercel.json                     # Vercel deployment config
│   └── src/
│       ├── App.tsx                     # Root component, routes setup
│       ├── main.tsx                    # React DOM entry point
│       ├── globals.css                 # Global styles, CSS variables, jewel-tone themes
│       ├── types.ts                    # Shared TypeScript interfaces
│       ├── 📁 components/              # Reusable UI components
│       │   ├── Navbar.tsx              # Navigation bar with auth state
│       │   ├── Footer.tsx              # Site footer with links
│       │   ├── Login.tsx               # Login/Signup modal with Google OAuth
│       │   ├── PreviewPanel.tsx        # Live thumbnail preview panel
│       │   ├── AspectRatioSelector.tsx # Aspect ratio toggle (16:9, 1:1, 9:16)
│       │   ├── ColorSchemeSelector.tsx # Color scheme picker
│       │   ├── StyleSelector.tsx       # Thumbnail style options
│       │   ├── SectionTitle.tsx        # Animated section heading component
│       │   ├── TestimonialCard.tsx     # Testimonial display card
│       │   ├── TiltImage.tsx           # 3D tilt effect image card
│       │   ├── LenisScroll.tsx         # Lenis smooth scroll initializer
│       │   └── SoftBackdrop.tsx        # Blurred backdrop overlay
│       ├── 📁 pages/                   # Full page views
│       │   ├── HomePage.tsx            # Landing page (all sections)
│       │   ├── Generate.tsx            # Main thumbnail generation page
│       │   ├── MyGeneration.tsx        # User's saved thumbnails gallery
│       │   ├── About.tsx               # About the project page
│       │   ├── Contact.tsx             # Contact form page
│       │   ├── PaymentSuccess.tsx      # Post-payment success page
│       │   └── YtPreview.tsx           # YouTube thumbnail preview mode
│       ├── 📁 sections/               # Homepage section components
│       │   ├── HeroSection.tsx         # Hero landing section
│       │   ├── FeaturesSection.tsx     # Feature highlights
│       │   ├── PricingSection.tsx      # Pricing plans with Stripe
│       │   ├── TestimonialSection.tsx  # User testimonials
│       │   ├── CTASection.tsx          # Call-to-action section
│       │   └── ContactSection.tsx      # Contact form section
│       ├── 📁 context/
│       │   └── AuthContext.tsx         # Global auth state (user, login, logout)
│       ├── 📁 config/
│       │   └── axios.ts                # Axios instance with base URL & credentials
│       └── 📁 data/
│           └── (static data files)    # Testimonials, styles, pricing data
│
└── 📁 server/                          # Express Backend (Node.js + TypeScript)
    ├── server.ts                       # Main server entry — Express app, CORS, session, routes
    ├── tsconfig.json                   # Backend TypeScript config
    ├── vercel.json                     # Vercel serverless deployment config
    ├── 📁 config/
    │   ├── db.ts                       # MongoDB connection via Mongoose
    │   └── ai.ts                       # Google Gemini AI client initialization
    ├── 📁 models/
    │   ├── User.ts                     # User schema (name, email, password, googleId, avatar)
    │   └── Thumbnail.ts                # Thumbnail schema (style, color, prompt, image_url, etc.)
    ├── 📁 controllers/
    │   ├── AuthController.ts           # Register, Login, Logout, Verify, Google OAuth
    │   ├── ThumbnailController.ts      # Generate, Delete, Get thumbnail (Gemini + Cloudinary)
    │   ├── UserController.ts           # Get user profile
    │   └── PaymentController.ts        # Stripe checkout session creation
    ├── 📁 routes/
    │   ├── AuthRoutes.ts               # /api/auth routes
    │   ├── ThumbnailRoutes.ts          # /api/thumbnail routes
    │   ├── UserRoute.ts                # /api/user routes
    │   └── PaymentRoutes.ts            # /api/payment routes
    └── 📁 middleware/
        └── (auth middleware)          # Session/auth verification middleware
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** v18+ 
- **MongoDB Atlas** account (or local MongoDB)
- **Google Gemini API Key** ([Get one here](https://aistudio.google.com/))
- **Cloudinary** account ([Sign up free](https://cloudinary.com/))
- **Stripe** account ([Sign up](https://stripe.com/))
- **Google OAuth** credentials ([Google Console](https://console.cloud.google.com/))

---

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/RohitKModi777/Thumblify-The-Thumbnail-Generator-.git
cd Thumblify-The-Thumbnail-Generator-
```

---

### 2️⃣ Setup the Backend (Server)

```bash
cd server
npm install
```

Create a `.env` file in the `server/` directory:

```env
# MongoDB
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/thumblify

# Session Secret (any random long string)
SESSION_SECRET=your_super_secret_session_key_here

# Google Gemini AI
GEMINI_API_KEY=your_gemini_api_key_here

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Google OAuth
GOOGLE_CLIENT_ID=your_google_oauth_client_id

# Stripe
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key

# Environment
PORT=3000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

Start the backend server:

```bash
# Development (with hot-reload)
npm run server

# Production
npm start
```

The server runs at `http://localhost:3000`

---

### 3️⃣ Setup the Frontend (Client)

```bash
cd client
npm install
```

Create a `.env` file in the `client/` directory:

```env
VITE_BACKEND_URL=http://localhost:3000
VITE_GOOGLE_CLIENT_ID=your_google_oauth_client_id
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
```

Start the frontend:

```bash
npm run dev
```

The app runs at `http://localhost:5173`

---

## 🔌 API Endpoints

### Auth Routes (`/api/auth`)
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Register new user |
| `POST` | `/api/auth/login` | Login with email/password |
| `POST` | `/api/auth/logout` | Logout & destroy session |
| `GET` | `/api/auth/verify` | Verify active session |
| `POST` | `/api/auth/google` | Login/Register via Google OAuth |

### Thumbnail Routes (`/api/thumbnail`)
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/thumbnail/generate` | Generate AI thumbnail (Gemini + Cloudinary) |
| `GET` | `/api/thumbnail/:id` | Fetch a single thumbnail by ID |
| `DELETE` | `/api/thumbnail/:id` | Delete a thumbnail |

### User Routes (`/api/user`)
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/user/profile` | Get authenticated user profile |

### Payment Routes (`/api/payment`)
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/payment/checkout` | Create Stripe checkout session |

---

## 🎨 How Thumbnail Generation Works

```
User Input (title + style + color + ratio + optional prompt)
        ↓
Backend receives POST /api/thumbnail/generate
        ↓
Session verified → User authenticated
        ↓
MongoDB entry created (isGenerating: true)
        ↓
Prompt constructed:
  "Create a [style] thumbnail for: [title].
   Use [color scheme]. Additional: [user prompt].
   Should be [aspect ratio]..."
        ↓
Google Gemini AI generates image (base64)
        ↓
Image saved temporarily to /images/ folder
        ↓
Uploaded to Cloudinary CDN
        ↓
MongoDB updated with image_url (isGenerating: false)
        ↓
Temp file deleted → Response returned to client
```

---

## 💡 Thumbnail Styles

| Style | Description |
|---|---|
| **Bold & Graphic** | Eye-catching, bold typography, vibrant colors, dramatic lighting |
| **Tech/Futuristic** | Sleek UI, holographic effects, cyber-tech aesthetic, glowing accents |
| **Minimalist** | Clean layout, simple shapes, limited palette, flat design |
| **Photorealistic** | Ultra-realistic, DSLR-style, natural lighting, candid movement |
| **Illustrated** | Digital illustration, stylized characters, vector art style |

---

## 🌈 Color Schemes

| Scheme | Palette Description |
|---|---|
| Vibrant | High saturation, bold contrasts, energetic |
| Sunset | Orange, pink & purple hues, cinematic glow |
| Forest | Natural greens, earthy tones, organic |
| Neon | Electric blues & pinks, cyberpunk glow |
| Purple | Magenta & violet tones, modern & stylish |
| Monochrome | Black & white, high contrast, timeless |
| Ocean | Cool blues & teals, aquatic, fresh |
| Pastel | Soft, low saturation, calm & friendly |

---

## 🌐 Deployment

### Frontend → Vercel
```bash
cd client
# vercel.json is already configured for SPA routing
vercel --prod
```

### Backend → Vercel (Serverless)
```bash
cd server
# vercel.json routes all requests to server.ts
vercel --prod
```

---

## 📸 Screenshots

> *(Add screenshots of your deployed app here)*

| Page | Preview |
|---|---|
| 🏠 Home / Hero Section | Coming Soon |
| ⚡ Generate Page | Coming Soon |
| 🗂️ My Generations | Coming Soon |
| 💳 Pricing Page | Coming Soon |

---

## 🤝 Contributing

Contributions are welcome! Feel free to:
1. Fork the repo
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

## 👤 Author

**Rohit K. Modi**

[![GitHub](https://img.shields.io/badge/GitHub-RohitKModi777-181717?style=flat-square&logo=github)](https://github.com/RohitKModi777)

---

<div align="center">

⭐ **If this project helped you, please give it a star!** ⭐

*Built with ❤️ using React, Node.js, and Google Gemini AI*

</div>
