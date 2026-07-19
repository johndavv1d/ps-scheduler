// src/pages/_app.tsx
import React from 'react';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '../contexts/ThemeContext';
import { AuthProvider } from '../contexts/AuthContext';
import { Header } from '../components/common/Header';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
          <Header />
          <Component {...pageProps} />
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}