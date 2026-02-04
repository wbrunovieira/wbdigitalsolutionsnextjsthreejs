# 3D Experience Platform - Plano de Execução

## Visão Geral

Uma demo 3D modular que serve como máquina de vendas para 7 produtos diferentes, usando uma única experiência imersiva.

---

## Objetivo

Permitir que o prospect pense:
> "Isso serviria exatamente para o MEU negócio."

**A demo NÃO:**
- Explica tecnologia
- Mostra código
- É longa

**A demo DEVE:**
- Impressionar em 30 segundos
- Escalar na mente do cliente
- Permitir múltiplas leituras (educação, vendas, marketing, onboarding)

---

## Decisões Técnicas

| Item | Decisão |
|------|---------|
| **Conceito** | Hub Central com portais |
| **Navegação** | Híbrido (click-to-move desktop + hotspots mobile) |
| **Estrutura** | Hub + Experiências isoladas |
| **Modo Guiado** | Manual + Automático |
| **Mobile** | Obrigatório |
| **Estilo Visual** | Manter atual (roxo #792990, amarelo #ffb947, azul #4a90e2) |

---

## MVP - Escopo Inicial

### Fase 1: Fundação
1. **Hub Central** - Plataforma hexagonal com 7 portais

### Fase 2: Primeiras Experiências
2. **Virtual Space** - Adaptar OfficeScene existente
3. **Product Showcase** - Objeto 3D explorável
4. **Learning Experience** - Cubo modular com camadas

### Fase 3: Expansão (Pós-MVP)
5. Interactive Landing
6. Sales Demo
7. Brand Experience
8. Micro Experience

---

## Os 7 Produtos Representados

| Ponto | Experiência | Produto que Vende |
|-------|-------------|-------------------|
| 1 | Cubo modular interativo | 3D Learning Experience |
| 2 | Produto 3D explorável | 3D Product Showcase |
| 3 | Página 3D com scroll | 3D Interactive Landing |
| 4 | Sala navegável | 3D Virtual Space |
| 5 | Tour guiado | 3D Sales Demo |
| 6 | Storytelling visual | 3D Brand Experience |
| 7 | Micro interação | 3D Micro Experience |

---

## Estrutura de Arquivos Proposta

```
src/
├── components/
│   └── 3d-experience/
│       ├── ExperiencePlatform.tsx      # Orquestrador principal
│       ├── HubCentral/
│       │   ├── HubScene.tsx            # Cena do hub
│       │   ├── Portal.tsx              # Portal individual
│       │   ├── PortalRing.tsx          # Anel decorativo
│       │   └── HubLighting.tsx         # Iluminação do hub
│       ├── experiences/
│       │   ├── VirtualSpace.tsx        # Ponto 4: Sala navegável
│       │   ├── ProductShowcase.tsx     # Ponto 2: Produto 3D
│       │   ├── LearningExperience.tsx  # Ponto 1: Cubo interativo
│       │   ├── InteractiveLanding.tsx  # Ponto 3: Landing 3D
│       │   ├── SalesDemo.tsx           # Ponto 5: Tour guiado
│       │   ├── BrandExperience.tsx     # Ponto 6: Storytelling
│       │   └── MicroExperience.tsx     # Ponto 7: Micro
│       ├── navigation/
│       │   ├── NavigationSystem.tsx    # Sistema de navegação
│       │   ├── Hotspot.tsx             # Ponto clicável
│       │   ├── CameraController.tsx    # Controle de câmera
│       │   └── MobileControls.tsx      # Controles mobile
│       ├── guided/
│       │   ├── GuidedMode.tsx          # Modo guiado
│       │   ├── TourSequence.tsx        # Sequência do tour
│       │   └── NarrationOverlay.tsx    # Overlay de narração
│       ├── ui/
│       │   ├── ExperienceUI.tsx        # UI principal
│       │   ├── BackToHub.tsx           # Botão voltar
│       │   ├── ProgressIndicator.tsx   # Indicador de progresso
│       │   └── Tooltip3D.tsx           # Tooltip no espaço 3D
│       └── constants/
│           ├── index.ts                # Constantes gerais
│           ├── experiences.ts          # Config das experiências
│           └── colors.ts               # Paleta de cores
├── pages/
│   └── experience/
│       └── index.tsx                   # Página da experiência
└── hooks/
    ├── useExperienceNavigation.ts      # Hook de navegação
    ├── useGuidedTour.ts                # Hook do tour guiado
    └── useDeviceType.ts                # Detecção de dispositivo
```

---

## Documentos do Plano

1. [Arquitetura Técnica](./01-architecture.md)
2. [Hub Central](./02-hub-central.md)
3. [Virtual Space](./03-virtual-space.md)
4. [Product Showcase](./04-product-showcase.md)
5. [Learning Experience](./05-learning-experience.md)
6. [Sistema de Navegação](./06-navigation.md)
7. [Modo Guiado](./07-guided-mode.md)
8. [Fases de Execução](./08-phases.md)
9. [Checklist](./09-checklist.md)
10. [Modelos 3D - Guia de Assets](./10-3d-models.md)
