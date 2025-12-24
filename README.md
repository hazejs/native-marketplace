# Marketplace Expo App

A marketplace application built with Expo, React Native, Redux Toolkit, Redux Saga, and Styled Components.

### Prerequisites

- Node.js (v18+)
- npm or yarn

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
- **`features/`**: Redux slices and sagas.
- **`components/`**: Reusable UI components.
- **`api/`**: Mock data generation and simulated API calls.
- **`store/`**: Redux store configuration and root saga.
- **`theme/`**: Global styling configuration for Styled Components.
- **`types/`**: TypeScript interfaces and types.
