# Marketplace Expo App

A robust marketplace application built with Expo, React Native, Redux Toolkit, Redux Saga, and Styled Components.

## Features

- **Product List**: Infinite scroll pagination, multi-field search, category filtering, and sorting.
- **Product Details**: Comprehensive view with images, ratings, stock status, and quantity selection.
- **Cart Management**: Add/remove items, update quantities, and subtotal calculation.
- **Mock API**: Simulates a backend with 2,000 products, network latency, and server-side logic.
- **Clean Architecture**: Layered structure with clear separation between UI, state management, and infrastructure.

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn
- Expo Go app on your mobile device (optional)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the App

Start the development server:

```bash
npx expo start
```

- Press **i** for iOS simulator
- Press **a** for Android emulator
- Press **w** for web
- Scan the QR code with Expo Go (Android) or Camera (iOS) to run on a physical device.

### Running Tests

Execute the test suite using Jest:

```bash
npm test
```

## Architecture

- **`app/`**: File-based routing (Expo Router).
- **`features/`**: Redux slices and sagas organized by domain.
- **`components/`**: Reusable UI components.
- **`api/`**: Mock data generation and simulated API calls.
- **`store/`**: Redux store configuration and root saga.
- **`theme/`**: Global styling configuration for Styled Components.
- **`types/`**: TypeScript interfaces and types.

## Technologies

- **Framework**: Expo / React Native
- **State Management**: Redux Toolkit + Redux Saga
- **Styling**: Styled Components
- **Image Loading**: Expo Image
- **Icons**: Expo Symbols / Vector Icons
- **Testing**: Jest + Redux Saga Test Plan
