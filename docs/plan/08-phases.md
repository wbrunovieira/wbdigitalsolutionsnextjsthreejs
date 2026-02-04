# Fases de Execução

## Visão Geral das Fases

```
┌─────────────────────────────────────────────────────────────────┐
│                        TIMELINE                                  │
├─────────┬─────────┬─────────┬─────────┬─────────┬─────────────┤
│ FASE 1  │ FASE 2  │ FASE 3  │ FASE 4  │ FASE 5  │   FASE 6    │
│ Setup   │   Hub   │ Virtual │ Product │Learning │   Polish    │
│         │ Central │  Space  │Showcase │  Exp.   │   & Tour    │
├─────────┼─────────┼─────────┼─────────┼─────────┼─────────────┤
│  2 dias │ 3 dias  │ 2 dias  │ 3 dias  │ 3 dias  │   2 dias    │
└─────────┴─────────┴─────────┴─────────┴─────────┴─────────────┘
                                                    TOTAL: ~15 dias
```

---

## FASE 1: Setup e Estrutura Base (2 dias)

### Objetivo
Criar a infraestrutura básica: página, stores, e sistema de navegação.

### Tarefas

#### Dia 1: Estrutura
- [ ] Criar página `/experience/index.tsx`
- [ ] Criar estrutura de pastas `src/components/3d-experience/`
- [ ] Instalar dependências necessárias (zustand se não tiver)
- [ ] Criar store de navegação (`navigationStore.ts`)
- [ ] Criar store do tour guiado (`guidedTourStore.ts`)
- [ ] Criar componente wrapper `ExperiencePlatform.tsx`

#### Dia 2: Navegação Base
- [ ] Criar `CameraController.tsx`
- [ ] Criar `Hotspot.tsx` base
- [ ] Criar `TransitionOverlay.tsx`
- [ ] Criar `BackToHubButton.tsx`
- [ ] Testar transições de câmera básicas

### Entregável
Página funcionando com Canvas vazio e sistema de navegação pronto.

---

## FASE 2: Hub Central (3 dias)

### Objetivo
Criar o Hub Central completo com todos os 7 portais.

### Tarefas

#### Dia 1: Plataforma Base
- [ ] Criar `HubScene.tsx`
- [ ] Criar `HubPlatform.tsx` (hexágono base)
- [ ] Criar `HubLighting.tsx`
- [ ] Criar `HubParticles.tsx`
- [ ] Criar `CenterLogo.tsx`

#### Dia 2: Portais
- [ ] Criar `Portal.tsx`
- [ ] Criar `PortalArch.tsx`
- [ ] Criar `PortalEnergy.tsx`
- [ ] Posicionar os 7 portais
- [ ] Implementar hover nos portais

#### Dia 3: Interação
- [ ] Implementar click nos portais
- [ ] Criar animação de transição Hub → Experiência
- [ ] Testar navegação completa do Hub
- [ ] Otimizar para mobile (hotspots maiores)

### Entregável
Hub Central completo e navegável, com 7 portais funcionais (ainda sem experiências).

---

## FASE 3: Virtual Space (2 dias)

### Objetivo
Adaptar o OfficeScene existente para a experiência de Virtual Space.

### Tarefas

#### Dia 1: Adaptação
- [ ] Copiar base do OfficeScene para `VirtualSpace.tsx`
- [ ] Remover elementos específicos (bolas, botões, código)
- [ ] Criar `ContentStation.tsx`
- [ ] Substituir mesas por estações de conteúdo
- [ ] Adaptar textos para neutros

#### Dia 2: Integração
- [ ] Criar `ContentPanel.tsx` (painel que abre ao clicar)
- [ ] Implementar navegação interna
- [ ] Integrar com sistema de navegação principal
- [ ] Testar transição Hub ↔ Virtual Space
- [ ] Testar em mobile

### Entregável
Experiência Virtual Space completa e integrada ao Hub.

---

## FASE 4: Product Showcase (3 dias)

### Objetivo
Criar a experiência de showcase de produto 3D explorável.

### Tarefas

#### Dia 1: Objeto Principal
- [ ] Criar `ProductShowcase.tsx`
- [ ] Criar `ProductSphere.tsx` (ou geometria escolhida)
- [ ] Criar `OrbitalRing.tsx`
- [ ] Implementar rotação automática
- [ ] Implementar controles de rotação manual

#### Dia 2: Hotspots
- [ ] Criar `ProductHotspot.tsx`
- [ ] Posicionar 4-5 hotspots
- [ ] Criar `ProductInfoPanel.tsx`
- [ ] Implementar click → expandir info
- [ ] Criar animações de feedback

#### Dia 3: Polish e Integração
- [ ] Criar `ProductParticles.tsx` (fundo)
- [ ] Ajustar iluminação
- [ ] Integrar com navegação principal
- [ ] Testar transição Hub ↔ Product
- [ ] Testar em mobile (zoom, rotação)

### Entregável
Experiência Product Showcase completa e integrada ao Hub.

---

## FASE 5: Learning Experience (3 dias)

### Objetivo
Criar a experiência do cubo modular interativo.

### Tarefas

#### Dia 1: Cubo Base
- [ ] Criar `LearningExperience.tsx`
- [ ] Criar `LearningCube.tsx`
- [ ] Criar `CubeLayer.tsx`
- [ ] Implementar rotação do cubo fechado
- [ ] Definir posições das 4 camadas

#### Dia 2: Interação
- [ ] Implementar animação de "explosão"
- [ ] Criar `CubeCore.tsx` (núcleo revelado)
- [ ] Implementar seleção de camadas
- [ ] Criar `LayerContentPanel.tsx`
- [ ] Criar `CoreParticles.tsx`

#### Dia 3: Polish e Integração
- [ ] Ajustar animações de transição
- [ ] Criar botão de reset
- [ ] Integrar com navegação principal
- [ ] Testar transição Hub ↔ Learning
- [ ] Testar em mobile

### Entregável
Experiência Learning completa e integrada ao Hub.

---

## FASE 6: Polish e Tour Guiado (2 dias)

### Objetivo
Finalizar o modo guiado e polir toda a experiência.

### Tarefas

#### Dia 1: Modo Guiado
- [ ] Criar `GuidedTourController.tsx`
- [ ] Criar `NarrationOverlay.tsx`
- [ ] Criar `StepsIndicator.tsx`
- [ ] Criar `StartTourButton.tsx`
- [ ] Definir sequência completa de steps
- [ ] Implementar modo automático

#### Dia 2: Polish Final
- [ ] Criar `ElementHighlight.tsx`
- [ ] Testar tour completo (manual)
- [ ] Testar tour completo (automático)
- [ ] Otimizar performance geral
- [ ] Testar em diferentes dispositivos
- [ ] Corrigir bugs encontrados

### Entregável
Experiência completa pronta para apresentações e envio por link.

---

## Resumo dos Entregáveis por Fase

| Fase | Entregável | Demonstrável? |
|------|------------|---------------|
| 1 | Estrutura + Navegação | Não |
| 2 | Hub Central | Sim (parcial) |
| 3 | + Virtual Space | Sim |
| 4 | + Product Showcase | Sim |
| 5 | + Learning Experience | Sim |
| 6 | + Tour Guiado | Sim (completo) |

---

## Checkpoints de Validação

### Após Fase 2 (Hub)
- [ ] Hub carrega em < 3 segundos
- [ ] 60 FPS em desktop
- [ ] 30 FPS em mobile
- [ ] Todos os portais são clicáveis
- [ ] Animações são suaves

### Após Fase 3-5 (Experiências)
- [ ] Transições Hub ↔ Experiência funcionam
- [ ] Botão "Voltar" funciona
- [ ] Experiências carregam rapidamente
- [ ] Interações funcionam em mobile
- [ ] Não há memory leaks

### Após Fase 6 (Final)
- [ ] Tour automático roda sem erros
- [ ] Tour manual é intuitivo
- [ ] Experiência completa em < 3 minutos
- [ ] Funciona em Chrome, Safari, Firefox
- [ ] Funciona em iOS e Android

---

## Riscos e Mitigações

| Risco | Probabilidade | Impacto | Mitigação |
|-------|---------------|---------|-----------|
| Performance ruim em mobile | Média | Alto | Reduzir polígonos, desabilitar efeitos |
| Transições com glitches | Média | Médio | Usar GSAP com easings testados |
| Assets pesados demais | Baixa | Alto | Comprimir texturas, usar LOD |
| Tempo maior que estimado | Alta | Médio | Priorizar MVP, cortar features |

---

## Definição de "Pronto" (DoD)

Uma fase está "pronta" quando:
1. Todos os componentes listados estão criados
2. Funciona em desktop (Chrome)
3. Funciona em mobile (Safari iOS)
4. Não há erros no console
5. Performance está dentro do budget
6. Transições são suaves (sem jumps)
