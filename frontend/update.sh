#!/bin/bash
echo "🔧 Configurando Tailwind CSS v3 do zero..."

cd frontend

# Limpar TUDO
rm -rf node_modules package-lock.json .next .turbo
rm -f postcss.config.mjs tailwind.config.js postcss.config.js

# Criar package.json limpo
cat > package.json << 'EOF'
{
  "name": "agenda-psicologica-frontend",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@hookform/resolvers": "^3.3.2",
    "axios": "^1.4.0",
    "lucide-react": "^0.263.1",
    "next": "13.4.9",
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "react-hook-form": "^7.45.4",
    "yup": "^1.2.0"
  },
  "devDependencies": {
    "@types/node": "20.3.1",
    "@types/react": "18.2.14",
    "@types/react-dom": "18.2.6",
    "@types/yup": "^0.32.0",
    "autoprefixer": "10.4.14",
    "eslint": "8.43.0",
    "eslint-config-next": "13.4.9",
    "postcss": "8.4.24",
    "tailwindcss": "3.3.2",
    "typescript": "5.1.6"
  }
}
EOF

# Instalar
npm install --legacy-peer-deps

# Criar configurações
cat > postcss.config.js << 'EOF'
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
EOF

cat > tailwind.config.js << 'EOF'
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
EOF

# Criar CSS
mkdir -p src/styles
cat > src/styles/globals.css << 'EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;

:root { --bg: #fff; --fg: #0a0a0a; --primary: #2563eb; --border: #e5e7eb; }
.dark { --bg: #0a0a0a; --fg: #ededed; --primary: #3b82f6; --border: #374151; }

body { background: var(--bg); color: var(--fg); transition: all 0.3s; }

.btn-primary { background: var(--primary); color: white; padding: 0.5rem 1rem; border-radius: 0.5rem; border: none; cursor: pointer; }
.btn-primary:hover { background: var(--primary-hover); }

.btn-danger { background: #dc2626; color: white; padding: 0.5rem 1rem; border-radius: 0.5rem; border: none; cursor: pointer; }
.btn-danger:hover { background: #b91c1c; }

.btn-success { background: #16a34a; color: white; padding: 0.5rem 1rem; border-radius: 0.5rem; border: none; cursor: pointer; }
.btn-success:hover { background: #15803d; }

.input-field { width: 100%; padding: 0.75rem; border: 1px solid var(--border); border-radius: 0.5rem; background: var(--bg); color: var(--fg); }
.input-field:focus { outline: none; border-color: var(--primary); }

.card { background: var(--card-bg); padding: 1.5rem; border-radius: 0.75rem; border: 1px solid var(--border); }
.glass { background: rgba(255,255,255,0.8); backdrop-filter: blur(10px); }
.dark .glass { background: rgba(0,0,0,0.8); }
.animate-fade-in { animation: fadeIn 0.5s; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
EOF

echo "✅ Configuração concluída!"
echo "🚀 Para iniciar: npm run dev"