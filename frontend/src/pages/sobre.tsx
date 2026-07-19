import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BookOpen, Code2, Database, Layout, Palette, Server, Layers, ArrowLeft, Github, Cpu, Shield } from 'lucide-react';

export default function Sobre() {
  const tecnologias = [
    {
      icon: <Layout className="w-6 h-6" />,
      nome: 'React',
      descricao: 'Biblioteca JavaScript para construção de interfaces de usuário componentizadas e reativas.',
      cor: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
    },
    {
      icon: <Palette className="w-6 h-6" />,
      nome: 'Tailwind CSS',
      descricao: 'Framework CSS utility-first para estilização rápida e responsiva com classes atômicas.',
      cor: 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400',
    },
    {
      icon: <Database className="w-6 h-6" />,
      nome: 'Prisma ORM',
      descricao: 'ORM moderno para Node.js e TypeScript com tipagem segura e migrações automáticas.',
      cor: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400',
    },
    {
      icon: <Cpu className="w-6 h-6" />,
      nome: 'SQLite',
      descricao: 'Banco de dados relacional leve e embutido, ideal para desenvolvimento e prototipação.',
      cor: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400',
    },
    {
      icon: <Server className="w-6 h-6" />,
      nome: 'Express',
      descricao: 'Framework web minimalista para Node.js, utilizado na construção da API REST.',
      cor: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
    },
    {
      icon: <Shield className="w-6 h-6" />,
      nome: 'TypeScript',
      descricao: 'Superset do JavaScript que adiciona tipagem estática para maior segurança e produtividade.',
      cor: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
    },
    {
      icon: <Layers className="w-6 h-6" />,
      nome: 'Next.js',
      descricao: 'Framework React com renderização híbrida, roteamento file-based e otimizações integradas.',
      cor: 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300',
    },
    {
      icon: <Code2 className="w-6 h-6" />,
      nome: 'Arquitetura Componentizada',
      descricao: 'Frontend e backend separados em componentes reutilizáveis e independentes.',
      cor: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 py-16 relative">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-700 dark:text-blue-300 text-sm font-medium mb-6">
              <BookOpen className="w-4 h-4" />
              <span>Sobre o Projeto</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Agenda Psicológica
              </span>
            </h1>
          </div>
        </div>
      </div>

      {/* Descrição Principal */}
      <div className="max-w-4xl mx-auto px-4 pb-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 md:p-12 shadow-lg border border-gray-100 dark:border-gray-700">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Code2 className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Projeto de Estudo e Aprimoramento
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto">
              Este projeto foi elaborado para estudo, com o intuito de aprimoramento em{' '}
              <span className="font-semibold text-blue-600 dark:text-blue-400">React</span> e{' '}
              <span className="font-semibold text-cyan-600 dark:text-cyan-400">Tailwind CSS</span>, 
              utilizando <span className="font-semibold text-indigo-600 dark:text-indigo-400">ORM Prisma</span>,{' '}
              <span className="font-semibold text-amber-600 dark:text-amber-400">SQLite</span>, 
              com <span className="font-semibold text-purple-600 dark:text-purple-400">frontend e backend componentizados</span>.
            </p>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-center max-w-2xl mx-auto">
              A aplicação simula uma plataforma completa de agendamento de consultas psicológicas, 
              abrangendo três perfis de usuário (Administrador, Psicólogo e Paciente), autenticação JWT, 
              operações CRUD, e uma interface moderna construída com componentização e boas práticas de desenvolvimento.
            </p>
          </div>
        </div>
      </div>

      {/* Tecnologias */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 dark:text-white mb-10">
          Tecnologias Utilizadas
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tecnologias.map((tech) => (
            <div
              key={tech.nome}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700"
            >
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${tech.cor}`}>
                {tech.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {tech.nome}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {tech.descricao}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Estrutura do Projeto */}
      <div className="max-w-4xl mx-auto px-4 pb-16">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 md:p-12 shadow-lg border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Estrutura do Projeto
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <Layout className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h3 className="font-semibold text-gray-900 dark:text-white">Frontend</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li>• Next.js com TypeScript</li>
                <li>• Tailwind CSS para estilização</li>
                <li>• React Hook Form + Yup</li>
                <li>• Context API para estado global</li>
                <li>• Componentes reutilizáveis</li>
                <li>• Temas claro/escuro</li>
                <li>• Layout responsivo</li>
              </ul>
            </div>

            <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <Server className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <h3 className="font-semibold text-gray-900 dark:text-white">Backend</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li>• Express com TypeScript</li>
                <li>• Prisma ORM + SQLite</li>
                <li>• Autenticação JWT</li>
                <li>• Middleware de autorização</li>
                <li>• Senhas com hash (bcrypt)</li>
                <li>• Arquitetura MVC</li>
                <li>• Migrations automáticas</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-3xl mx-auto px-4 pb-20 text-center">
        <Link
          href="/login"
          className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Acessar o Sistema
        </Link>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-700 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>© {new Date().getFullYear()} Agenda Psicológica. Todos os direitos reservados.</p>
          <p className="mt-1">Desenvolvido com ❤️ para profissionais da saúde mental</p>
          <div className="mt-4 flex justify-center">
            <Image
              src="/jdv-systems.png"
              alt="JDV Systems"
              width={50}
              height={50}
              className="block opacity-70 hover:opacity-100 transition-opacity"
            />
          </div>
        </div>
      </footer>
    </main>
  );
}