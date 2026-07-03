/**
 * Stack & skills for the DEV CV page (/dev). Based on the cv.ts stack, enriched
 * with the data-science / AI depth (DSA formation) and Go/Rust in backend.
 *
 * Localized: `devStack` is keyed by `CVLang` ("pt-BR", "en", "it", "es").
 * Tech terms are language-agnostic; group labels and descriptive items are
 * translated per locale.
 */

import type { CVLang } from "@/content/cv";

export interface DevStackGroup {
  label: string;
  items: string[];
}

export const devStack: Record<CVLang, DevStackGroup[]> = {
  "pt-BR": [
    {
      label: "Linguagens",
      items: ["TypeScript", "JavaScript", "Python", "Go", "Rust", "C#"],
    },
    {
      label: "Frontend",
      items: ["React", "Next.js", "React Native", "Three.js / R3F & WebGL", "GSAP", "Tailwind CSS"],
    },
    {
      label: "Backend",
      items: ["Node.js / NestJS", "Go", "Rust", "DDD & Arquitetura Hexagonal", "REST / APIs & integrações"],
    },
    {
      label: "IA & Dados",
      items: [
        "Python",
        "Machine Learning",
        "Redes neurais & Transformers",
        "LLMs & Visão computacional",
        "LangGraph & LangChain",
        "RAG & Agentes",
        "Estatística & análise multivariada",
        "Séries temporais (Spark, Databricks)",
        "SageMaker & Microsoft Fabric",
        "Dashboards & storytelling de dados",
      ],
    },
    {
      label: "Cloud & DevOps",
      items: ["AWS", "Docker", "Terraform", "Kubernetes", "Ansible", "Linux", "CI/CD", "Redes (HTTP, DNS, sockets)"],
    },
    {
      label: "Segurança",
      items: [
        "HTTPS/TLS, CSP & security headers",
        "OWASP: XSS, SQLi, CSRF",
        "Autenticação & autorização (JWT, OAuth, RBAC)",
        "Criptografia & hashing de senhas",
        "AWS IAM & least privilege",
        "VPC, security groups & firewall",
        "Secrets management",
        "SSH & hardening Linux",
        "Rate limiting & proteção de APIs",
        "Auditoria de dependências",
        "LGPD & privacidade",
        "Backups & recuperação",
      ],
    },
  ],
  en: [
    {
      label: "Languages",
      items: ["TypeScript", "JavaScript", "Python", "Go", "Rust", "C#"],
    },
    {
      label: "Frontend",
      items: ["React", "Next.js", "React Native", "Three.js / R3F & WebGL", "GSAP", "Tailwind CSS"],
    },
    {
      label: "Backend",
      items: ["Node.js / NestJS", "Go", "Rust", "DDD & Hexagonal Architecture", "REST / APIs & integrations"],
    },
    {
      label: "AI & Data",
      items: [
        "Python",
        "Machine Learning",
        "Neural networks & Transformers",
        "LLMs & Computer vision",
        "LangGraph & LangChain",
        "RAG & Agents",
        "Statistics & multivariate analysis",
        "Time series (Spark, Databricks)",
        "SageMaker & Microsoft Fabric",
        "Dashboards & data storytelling",
      ],
    },
    {
      label: "Cloud & DevOps",
      items: ["AWS", "Docker", "Terraform", "Kubernetes", "Ansible", "Linux", "CI/CD", "Networking (HTTP, DNS, sockets)"],
    },
    {
      label: "Security",
      items: [
        "HTTPS/TLS, CSP & security headers",
        "OWASP: XSS, SQLi, CSRF",
        "Authentication & authorization (JWT, OAuth, RBAC)",
        "Cryptography & password hashing",
        "AWS IAM & least privilege",
        "VPC, security groups & firewall",
        "Secrets management",
        "SSH & Linux hardening",
        "Rate limiting & API protection",
        "Dependency auditing",
        "LGPD & privacy",
        "Backups & recovery",
      ],
    },
  ],
  it: [
    {
      label: "Linguaggi",
      items: ["TypeScript", "JavaScript", "Python", "Go", "Rust", "C#"],
    },
    {
      label: "Frontend",
      items: ["React", "Next.js", "React Native", "Three.js / R3F & WebGL", "GSAP", "Tailwind CSS"],
    },
    {
      label: "Backend",
      items: ["Node.js / NestJS", "Go", "Rust", "DDD & Architettura Esagonale", "REST / API & integrazioni"],
    },
    {
      label: "IA & Dati",
      items: [
        "Python",
        "Machine Learning",
        "Reti neurali & Transformer",
        "LLM & Visione artificiale",
        "LangGraph & LangChain",
        "RAG & Agenti",
        "Statistica & analisi multivariata",
        "Serie temporali (Spark, Databricks)",
        "SageMaker & Microsoft Fabric",
        "Dashboard & data storytelling",
      ],
    },
    {
      label: "Cloud & DevOps",
      items: ["AWS", "Docker", "Terraform", "Kubernetes", "Ansible", "Linux", "CI/CD", "Reti (HTTP, DNS, socket)"],
    },
    {
      label: "Sicurezza",
      items: [
        "HTTPS/TLS, CSP & security headers",
        "OWASP: XSS, SQLi, CSRF",
        "Autenticazione & autorizzazione (JWT, OAuth, RBAC)",
        "Crittografia & hashing delle password",
        "AWS IAM & least privilege",
        "VPC, security groups & firewall",
        "Secrets management",
        "SSH & hardening Linux",
        "Rate limiting & protezione delle API",
        "Audit delle dipendenze",
        "LGPD & privacy",
        "Backup & ripristino",
      ],
    },
  ],
  es: [
    {
      label: "Lenguajes",
      items: ["TypeScript", "JavaScript", "Python", "Go", "Rust", "C#"],
    },
    {
      label: "Frontend",
      items: ["React", "Next.js", "React Native", "Three.js / R3F & WebGL", "GSAP", "Tailwind CSS"],
    },
    {
      label: "Backend",
      items: ["Node.js / NestJS", "Go", "Rust", "DDD & Arquitectura Hexagonal", "REST / APIs & integraciones"],
    },
    {
      label: "IA & Datos",
      items: [
        "Python",
        "Machine Learning",
        "Redes neuronales & Transformers",
        "LLMs & Visión computacional",
        "LangGraph & LangChain",
        "RAG & Agentes",
        "Estadística & análisis multivariado",
        "Series temporales (Spark, Databricks)",
        "SageMaker & Microsoft Fabric",
        "Dashboards & storytelling de datos",
      ],
    },
    {
      label: "Cloud & DevOps",
      items: ["AWS", "Docker", "Terraform", "Kubernetes", "Ansible", "Linux", "CI/CD", "Redes (HTTP, DNS, sockets)"],
    },
    {
      label: "Seguridad",
      items: [
        "HTTPS/TLS, CSP & security headers",
        "OWASP: XSS, SQLi, CSRF",
        "Autenticación & autorización (JWT, OAuth, RBAC)",
        "Criptografía & hashing de contraseñas",
        "AWS IAM & least privilege",
        "VPC, security groups & firewall",
        "Secrets management",
        "SSH & hardening de Linux",
        "Rate limiting & protección de APIs",
        "Auditoría de dependencias",
        "LGPD & privacidad",
        "Backups & recuperación",
      ],
    },
  ],
};
