/**
 * Stack & skills for the DEV CV page (/dev). Based on the cv.ts stack, enriched
 * with the data-science / AI depth (DSA formation) and Go/Rust in backend.
 *
 * WIP: authored in pt-BR while the content is being assembled. Tech terms are
 * mostly language-agnostic; localize group labels (and the few pt items) to
 * en / it / es once finalized.
 */

export interface DevStackGroup {
  label: string;
  items: string[];
}

export const devStack: DevStackGroup[] = [
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
];
