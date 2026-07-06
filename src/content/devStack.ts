/**
 * Stack & skills for the DEV CV page (/dev). Based on the cv.ts stack, enriched
 * with the data-science / AI depth (DSA formation) and Go/Rust in backend.
 *
 * Localized: `devStack` is keyed by `CVLang` ("pt-BR", "en", "it", "es").
 * Tech terms are language-agnostic; group labels and descriptive items are
 * translated per locale.
 */

import type { CVLang } from '@/content/cv';

export interface DevStackGroup {
  label: string;
  items: string[];
}

export const devStack: Record<CVLang, DevStackGroup[]> = {
  'pt-BR': [
    {
      label: 'Linguagens',
      items: ['TypeScript', 'JavaScript', 'Python', 'Go', 'Rust', 'C#'],
    },
    {
      label: 'Frontend',
      items: ['React', 'Next.js', 'React Native', 'Three.js / R3F & WebGL', 'GSAP', 'Tailwind CSS'],
    },
    {
      label: 'Backend',
      items: ['Node.js / NestJS', 'Go', 'Rust', 'DDD & Arquitetura Hexagonal', 'REST / APIs & integrações'],
    },
    {
      label: 'IA & Dados',
      items: [
        'Python',
        'Machine Learning',
        'Redes neurais & Transformers',
        'LLMs & Visão computacional',
        'LangGraph & LangChain',
        'RAG & Agentes',
        'Estatística & análise multivariada',
        'Séries temporais (Spark, Databricks)',
        'SageMaker & Microsoft Fabric',
        'Dashboards & storytelling de dados',
        'Bancos vetoriais & embeddings (Pinecone)',
      ],
    },
    {
      label: 'Desenvolvimento com IA',
      items: [
        'Workflow IA-driven & modo agente',
        'Claude Code, Cursor & Copilot',
        'Prompt & Context Engineering',
        'MCP (Model Context Protocol)',
        'Design docs como contexto para IA',
        'Testes & code review assistidos por IA',
        'Avaliação de agentes & LLMs (Langfuse, LangGraph)',
        'Caching de tokens & controle de custos de LLM',
      ],
    },
    {
      label: 'Cloud & DevOps',
      items: ['AWS', 'Docker', 'Terraform', 'Kubernetes', 'Ansible', 'Linux', 'CI/CD', 'Redes (HTTP, DNS, sockets)'],
    },
    {
      label: 'Segurança',
      items: [
        'HTTPS/TLS, CSP & security headers',
        'OWASP: XSS, SQLi, CSRF',
        'Autenticação & autorização (JWT, OAuth, RBAC)',
        'Criptografia & hashing de senhas',
        'AWS IAM & least privilege',
        'VPC, security groups & firewall',
        'Secrets management',
        'SSH & hardening Linux',
        'Rate limiting & proteção de APIs',
        'Auditoria de dependências',
        'LGPD & privacidade',
        'Backups & recuperação',
        'OWASP Top 10 LLM & Gen AI (prompt injection, guardrails)',
      ],
    },
  ],
  en: [
    {
      label: 'Languages',
      items: ['TypeScript', 'JavaScript', 'Python', 'Go', 'Rust', 'C#'],
    },
    {
      label: 'Frontend',
      items: ['React', 'Next.js', 'React Native', 'Three.js / R3F & WebGL', 'GSAP', 'Tailwind CSS'],
    },
    {
      label: 'Backend',
      items: ['Node.js / NestJS', 'Go', 'Rust', 'DDD & Hexagonal Architecture', 'REST / APIs & integrations'],
    },
    {
      label: 'AI & Data',
      items: [
        'Python',
        'Machine Learning',
        'Neural networks & Transformers',
        'LLMs & Computer vision',
        'LangGraph & LangChain',
        'RAG & Agents',
        'Statistics & multivariate analysis',
        'Time series (Spark, Databricks)',
        'SageMaker & Microsoft Fabric',
        'Dashboards & data storytelling',
        'Vector databases & embeddings (Pinecone)',
      ],
    },
    {
      label: 'AI-Driven Development',
      items: [
        'AI-driven workflow & agent mode',
        'Claude Code, Cursor & Copilot',
        'Prompt & Context Engineering',
        'MCP (Model Context Protocol)',
        'Design docs as AI context',
        'AI-assisted testing & code review',
        'Agent & LLM evaluation (Langfuse, LangGraph)',
        'Token caching & LLM cost control',
      ],
    },
    {
      label: 'Cloud & DevOps',
      items: ['AWS', 'Docker', 'Terraform', 'Kubernetes', 'Ansible', 'Linux', 'CI/CD', 'Networking (HTTP, DNS, sockets)'],
    },
    {
      label: 'Security',
      items: [
        'HTTPS/TLS, CSP & security headers',
        'OWASP: XSS, SQLi, CSRF',
        'Authentication & authorization (JWT, OAuth, RBAC)',
        'Cryptography & password hashing',
        'AWS IAM & least privilege',
        'VPC, security groups & firewall',
        'Secrets management',
        'SSH & Linux hardening',
        'Rate limiting & API protection',
        'Dependency auditing',
        'LGPD & privacy',
        'Backups & recovery',
        'OWASP Top 10 LLM & Gen AI (prompt injection, guardrails)',
      ],
    },
  ],
  it: [
    {
      label: 'Linguaggi',
      items: ['TypeScript', 'JavaScript', 'Python', 'Go', 'Rust', 'C#'],
    },
    {
      label: 'Frontend',
      items: ['React', 'Next.js', 'React Native', 'Three.js / R3F & WebGL', 'GSAP', 'Tailwind CSS'],
    },
    {
      label: 'Backend',
      items: ['Node.js / NestJS', 'Go', 'Rust', 'DDD & Architettura Esagonale', 'REST / API & integrazioni'],
    },
    {
      label: 'IA & Dati',
      items: [
        'Python',
        'Machine Learning',
        'Reti neurali & Transformer',
        'LLM & Visione artificiale',
        'LangGraph & LangChain',
        'RAG & Agenti',
        'Statistica & analisi multivariata',
        'Serie temporali (Spark, Databricks)',
        'SageMaker & Microsoft Fabric',
        'Dashboard & data storytelling',
        'Database vettoriali & embeddings (Pinecone)',
      ],
    },
    {
      label: 'Sviluppo con IA',
      items: [
        'Workflow IA-driven & agent mode',
        'Claude Code, Cursor & Copilot',
        'Prompt & Context Engineering',
        'MCP (Model Context Protocol)',
        "Design doc come contesto per l'IA",
        "Test & code review assistiti dall'IA",
        'Valutazione di agenti & LLM (Langfuse, LangGraph)',
        'Caching di token & controllo dei costi LLM',
      ],
    },
    {
      label: 'Cloud & DevOps',
      items: ['AWS', 'Docker', 'Terraform', 'Kubernetes', 'Ansible', 'Linux', 'CI/CD', 'Reti (HTTP, DNS, socket)'],
    },
    {
      label: 'Sicurezza',
      items: [
        'HTTPS/TLS, CSP & security headers',
        'OWASP: XSS, SQLi, CSRF',
        'Autenticazione & autorizzazione (JWT, OAuth, RBAC)',
        'Crittografia & hashing delle password',
        'AWS IAM & least privilege',
        'VPC, security groups & firewall',
        'Secrets management',
        'SSH & hardening Linux',
        'Rate limiting & protezione delle API',
        'Audit delle dipendenze',
        'LGPD & privacy',
        'Backup & ripristino',
        'OWASP Top 10 LLM & Gen AI (prompt injection, guardrails)',
      ],
    },
  ],
  es: [
    {
      label: 'Lenguajes',
      items: ['TypeScript', 'JavaScript', 'Python', 'Go', 'Rust', 'C#'],
    },
    {
      label: 'Frontend',
      items: ['React', 'Next.js', 'React Native', 'Three.js / R3F & WebGL', 'GSAP', 'Tailwind CSS'],
    },
    {
      label: 'Backend',
      items: ['Node.js / NestJS', 'Go', 'Rust', 'DDD & Arquitectura Hexagonal', 'REST / APIs & integraciones'],
    },
    {
      label: 'IA & Datos',
      items: [
        'Python',
        'Machine Learning',
        'Redes neuronales & Transformers',
        'LLMs & Visión computacional',
        'LangGraph & LangChain',
        'RAG & Agentes',
        'Estadística & análisis multivariado',
        'Series temporales (Spark, Databricks)',
        'SageMaker & Microsoft Fabric',
        'Dashboards & storytelling de datos',
        'Bases de datos vectoriales & embeddings (Pinecone)',
      ],
    },
    {
      label: 'Desarrollo con IA',
      items: [
        'Workflow IA-driven & modo agente',
        'Claude Code, Cursor & Copilot',
        'Prompt & Context Engineering',
        'MCP (Model Context Protocol)',
        'Design docs como contexto para la IA',
        'Tests & code review asistidos por IA',
        'Evaluación de agentes & LLMs (Langfuse, LangGraph)',
        'Caching de tokens & control de costos de LLM',
      ],
    },
    {
      label: 'Cloud & DevOps',
      items: ['AWS', 'Docker', 'Terraform', 'Kubernetes', 'Ansible', 'Linux', 'CI/CD', 'Redes (HTTP, DNS, sockets)'],
    },
    {
      label: 'Seguridad',
      items: [
        'HTTPS/TLS, CSP & security headers',
        'OWASP: XSS, SQLi, CSRF',
        'Autenticación & autorización (JWT, OAuth, RBAC)',
        'Criptografía & hashing de contraseñas',
        'AWS IAM & least privilege',
        'VPC, security groups & firewall',
        'Secrets management',
        'SSH & hardening de Linux',
        'Rate limiting & protección de APIs',
        'Auditoría de dependencias',
        'LGPD & privacidad',
        'Backups & recuperación',
        'OWASP Top 10 LLM & Gen AI (prompt injection, guardrails)',
      ],
    },
  ],
};
