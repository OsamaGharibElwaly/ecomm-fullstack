# 🛍️ ShopHub - Modern E-Commerce Platform

<div align="center">

![Angular](https://img.shields.io/badge/Angular-21.0-red?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1-38bdf8?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-black?style=for-the-badge&logo=vercel&logoColor=white)

**A full-featured, modern e-commerce application built with Angular 21, featuring server-side rendering, optimized performance, and accessibility compliance.**

[Features](#-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [Architecture](#-architecture) • [Deployment](#-deployment)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Development](#-development)
- [Performance & Accessibility](#-performance--accessibility)
- [Deployment](#-deployment)
- [Contributing](#-contributing)

---

## 🎯 Overview

ShopHub is a production-ready e-commerce platform that provides a seamless shopping experience with modern web technologies. The application features a clean, responsive design, optimized performance, and full accessibility compliance.

### Key Highlights

- ⚡ **High Performance**: Optimized builds with code splitting, lazy loading, and critical CSS inlining
- ♿ **Accessible**: WCAG 2.1 Level AA compliant with proper ARIA labels and semantic HTML
- 🎨 **Modern UI**: Beautiful, responsive design built with Tailwind CSS
- 🔒 **Secure**: Authentication with route guards and token-based authorization
- 🚀 **SSR Ready**: Server-side rendering support for better SEO and initial load times
- 📱 **Mobile First**: Fully responsive design optimized for all devices

---

## ✨ Features

### 🛒 Shopping Experience
- **Product Catalog**: Browse products with categories, search, and filtering
- **Product Details**: Detailed product pages with image galleries, color variants, and specifications
- **Shopping Cart**: Add to cart, quantity management, and order summary
- **Favorites**: Save favorite products for quick access
- **Recommendations**: "You May Also Like" product suggestions

### 👤 User Management
- **Authentication**: Secure login and registration
- **User Account**: Profile management and order history
- **Session Management**: Persistent authentication with token refresh

### 🎨 User Interface
- **Responsive Design**: Mobile-first approach with breakpoints for all screen sizes
- **Loading States**: Skeleton loaders for better perceived performance
- **Error Handling**: Graceful error handling with user-friendly messages
- **Navigation**: Intuitive bottom navigation and header with cart/favorites indicators

### ⚡ Performance Optimizations
- **Image Optimization**: NgOptimizedImage with lazy loading and placeholders
- **Code Splitting**: Route-based lazy loading for optimal bundle sizes
- **Resource Hints**: Preconnect and DNS-prefetch for faster external resource loading
- **Build Optimization**: Minification, tree-shaking, and performance budgets

### ♿ Accessibility
- **Keyboard Navigation**: Full keyboard support with skip links
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Alt Text**: Descriptive alt text for all images
- **Focus Management**: Visible focus indicators and logical tab order

---

## 🛠️ Tech Stack

### Core Framework
- **[Angular 21](https://angular.dev/)** - Modern web framework with standalone components
- **[TypeScript 5.9](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[RxJS 7.8](https://rxjs.dev/)** - Reactive programming for async operations

### Styling & UI
- **[Tailwind CSS 4.1](https://tailwindcss.com/)** - Utility-first CSS framework
- **[PostCSS](https://postcss.org/)** - CSS processing and optimization

### State Management
- **Angular Signals** - Reactive state management
- **Computed Properties** - Derived state with automatic updates
- **Facade Pattern** - Clean separation of concerns

### HTTP & API
- **Angular HttpClient** - HTTP client with interceptors
- **Fetch API** - Modern fetch-based HTTP requests
- **RxJS Observables** - Reactive data streams

### Testing
- **[Vitest 4.0](https://vitest.dev/)** - Fast unit testing framework
- **Angular Testing Utilities** - Component and service testing

### Deployment
- **[Vercel](https://vercel.com/)** - Serverless deployment platform
- **Server-Side Rendering (SSR)** - Express.js server for SSR support

---

## 🏗️ Architecture

### Design Patterns

#### Facade Pattern
Each page component uses a dedicated facade service that:
- Manages page-specific state using Angular Signals
- Handles business logic and API interactions
- Provides computed properties for derived state
- Keeps components thin and focused on presentation

```typescript
// Example: HomeFacade
@Injectable()
export class HomeFacade {
  private productsApi = inject(ProductsApiService);
  
  products = signal<Product[]>([]);
  isLoading = signal(false);
  
  filteredProducts = computed(() => 
    this.products().filter(/* ... */)
  );
}
```

#### API Service Layer
Centralized API services in `core/api/`:
- **ProductsApiService**: Product catalog and details
- **AuthApiService**: Authentication endpoints
- **AccountApiService**: User account management

All services use typed DTOs and handle errors gracefully.

#### Component Architecture
- **Standalone Components**: No NgModules, tree-shakeable
- **Feature-Scoped Services**: Facades provided at component level
- **Shared UI Components**: Reusable components in `shared/ui/`
- **Lazy Loading**: Route-based code splitting

### Project Structure

```
src/
├── app/
│   ├── core/
│   │   └── api/              # API service layer
│   ├── guards/               # Route guards
│   ├── interceptors/         # HTTP interceptors
│   ├── pages/                # Page components
│   │   ├── home/
│   │   ├── product-details/
│   │   ├── cart/
│   │   ├── account/
│   │   ├── auth/
│   │   └── favorites/
│   ├── services/             # Core services (Auth, etc.)
│   └── shared/
│       ├── ui/               # Reusable UI components
│       ├── data/              # Data services (Cart, Favorites)
│       └── constants/         # Shared constants
├── assets/                   # Static assets
└── index.html                # Main HTML file
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 20.x or higher
- **npm** 11.6.0 or higher
- **Angular CLI** 21.0.5

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ecomm-fullstack.git
   cd ecomm-fullstack
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment** (if needed)
   ```bash
   # Create environment files
   # src/environments/environment.ts
   # src/environments/environment.prod.ts
   ```

4. **Start development server**
   ```bash
   npm start
   # or
   ng serve
   ```

5. **Open your browser**
   ```
   Navigate to http://localhost:4200
   ```

---

## 📁 Project Structure

```
ecomm-fullstack/
├── public/                   # Static files (robots.txt, favicon)
├── src/
│   ├── app/
│   │   ├── core/            # Core functionality
│   │   │   └── api/         # API services
│   │   ├── guards/          # Route guards
│   │   ├── interceptors/    # HTTP interceptors
│   │   ├── pages/           # Page components
│   │   ├── services/        # Core services
│   │   └── shared/          # Shared modules
│   ├── assets/              # Static assets
│   ├── index.html           # Main HTML
│   ├── main.ts              # Application entry point
│   └── styles.css           # Global styles
├── angular.json              # Angular configuration
├── package.json             # Dependencies
├── tsconfig.json            # TypeScript configuration
├── vercel.json              # Vercel deployment config
└── README.md                # This file
```

---

## 💻 Development

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start development server on `http://localhost:4200` |
| `npm run build` | Build for production to `dist/browser/` |
| `npm run watch` | Build in watch mode for development |
| `npm test` | Run unit tests with Vitest |
| `ng serve` | Start development server (Angular CLI) |
| `ng build` | Build the project |
| `ng generate` | Generate components, services, etc. |

### Development Workflow

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Follow the facade pattern for new pages
   - Use Angular Signals for state management
   - Add proper TypeScript types

3. **Run tests**
   ```bash
   npm test
   ```

4. **Build and verify**
   ```bash
   npm run build
   ```

5. **Commit and push**
   ```bash
   git commit -m "feat: your feature description"
   git push origin feature/your-feature-name
   ```

### Code Style

- **TypeScript**: Strict mode enabled
- **Prettier**: Configured for consistent formatting
- **ESLint**: Linting rules (if configured)
- **Angular Style Guide**: Follows official Angular style guide

---

## ⚡ Performance & Accessibility

### Performance Optimizations

- ✅ **Code Splitting**: Route-based lazy loading
- ✅ **Image Optimization**: NgOptimizedImage with lazy loading
- ✅ **Critical CSS**: Inlined critical styles
- ✅ **Resource Hints**: Preconnect and DNS-prefetch
- ✅ **Bundle Optimization**: Minification and tree-shaking
- ✅ **Performance Budgets**: Enforced bundle size limits

### Accessibility Features

- ✅ **WCAG 2.1 Level AA** compliance
- ✅ **Keyboard Navigation**: Full keyboard support
- ✅ **Screen Reader Support**: ARIA labels and semantic HTML
- ✅ **Skip Links**: Quick navigation to main content
- ✅ **Focus Management**: Visible focus indicators
- ✅ **Alt Text**: Descriptive alt text for all images

See [PERFORMANCE_ACCESSIBILITY_IMPROVEMENTS_REPORT.md](./PERFORMANCE_ACCESSIBILITY_IMPROVEMENTS_REPORT.md) for detailed improvements.

---

## 🚢 Deployment

### Vercel Deployment

The project is configured for easy deployment on Vercel:

1. **Connect your repository** to Vercel
2. **Configure build settings**:
   - Build Command: `npm run build`
   - Output Directory: `dist/browser`
3. **Deploy**: Vercel will automatically deploy on push to main

### Environment Variables

Configure these in your Vercel project settings (if needed):
- `API_BASE_URL`: Backend API base URL
- `ENVIRONMENT`: `production` or `development`

### Build Configuration

The production build includes:
- AOT compilation
- Minification and optimization
- Source map generation (disabled for production)
- License extraction
- Performance budgets

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'feat: Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Contribution Guidelines

- Follow the existing code style and patterns
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure accessibility compliance

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Angular](https://angular.dev/) - The web framework
- [Tailwind CSS](https://tailwindcss.com/) - The CSS framework
- [Vercel](https://vercel.com/) - Deployment platform
- All contributors and open-source libraries used

---

## 📧 Contact

For questions, suggestions, or support:

- **Issues**: [GitHub Issues](https://github.com/yourusername/ecomm-fullstack/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/ecomm-fullstack/discussions)

---

<div align="center">

**Made with ❤️ using Angular**

⭐ Star this repo if you find it helpful!

</div>
