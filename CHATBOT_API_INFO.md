# 📋 Informações do Chatbot - Integração API

## 🔄 Atualização Importante - Dados Enviados pelo Frontend

O componente de chat do site agora envia informações adicionais junto com cada mensagem. Isso permite personalização e contexto melhor nas respostas.

## 📤 Payload Enviado para o Endpoint `/chat`

Quando o usuário envia uma mensagem pelo chat do site, a API recebe:

```json
{
  "message": "Mensagem do usuário aqui",
  "user_id": "user_1736470234567_a1b2c3d4e",
  "language": "pt-BR",
  "current_page": "/websites",
  "page_url": "https://wbdigitalsolutions.com/websites",
  "timestamp": "2025-01-09T20:30:45.123Z"
}
```

## 📊 Descrição dos Campos

### 1. **`message`** (string)
- Texto enviado pelo usuário
- Campo já existente, sem mudanças

### 2. **`user_id`** (string) 
- **NOVO**: ID único e persistente do usuário
- Formato: `user_{timestamp}_{random}`
- Salvo no localStorage do navegador
- Permite rastrear conversas do mesmo usuário
- Exemplo: `"user_1736470234567_a1b2c3d4e"`

### 3. **`language`** (string)
- **NOVO**: Idioma selecionado no site
- Valores possíveis: `"en"`, `"pt-BR"`, `"es"`, `"it"`
- Use para responder no idioma correto
- Exemplo: `"pt-BR"`

### 4. **`current_page`** (string)
- **NOVO**: Rota/página atual do site
- Valores comuns:
  - `"/"` - Home
  - `"/websites"` - Página de Websites
  - `"/automation"` - Página de Automação
  - `"/ai"` - Página de IA
  - `"/contact"` - Página de Contato
  - `"/blog"` - Blog
  - `"/blog/[id]"` - Post específico do blog
- Use para dar contexto sobre o que o usuário está vendo
- Exemplo: `"/websites"`

### 5. **`page_url`** (string)
- **NOVO**: URL completa da página
- Inclui domínio e parâmetros
- Exemplo: `"https://wbdigitalsolutions.com/websites"`

### 6. **`timestamp`** (string)
- **NOVO**: Data/hora ISO 8601 da mensagem
- Use para logs e análise temporal
- Exemplo: `"2025-01-09T20:30:45.123Z"`

## 💡 Sugestões de Uso no Backend

### 1. **Personalização por Idioma**
```python
# Responder no idioma do usuário
if language == "pt-BR":
    system_prompt = "Responda em português brasileiro..."
elif language == "en":
    system_prompt = "Respond in English..."
elif language == "es":
    system_prompt = "Responde en español..."
elif language == "it":
    system_prompt = "Rispondi in italiano..."
```

### 2. **Contexto da Página**
```python
# Dar contexto sobre a página atual
if current_page == "/websites":
    context = "O usuário está vendo nossos serviços de desenvolvimento web..."
elif current_page == "/automation":
    context = "O usuário está interessado em automação de processos..."
elif current_page == "/ai":
    context = "O usuário está explorando soluções de IA..."
```

### 3. **Rastreamento de Conversa**
```python
# Manter histórico por usuário
user_history = get_user_history(user_id)
# Usar histórico para contexto
```

### 4. **Análise e Métricas**
```python
# Salvar para análise posterior
analytics_data = {
    "user_id": user_id,
    "page": current_page,
    "language": language,
    "timestamp": timestamp,
    "message_length": len(message)
}
save_analytics(analytics_data)
```

## 🔧 Exemplo Completo de Processamento

```python
@app.post("/chat")
async def chat(request: Request):
    body = await request.json()
    
    # Extrair todos os campos
    user_input = body.get("message")
    user_id = body.get("user_id", "anon")
    language = body.get("language", "pt-BR")
    current_page = body.get("current_page", "/")
    page_url = body.get("page_url", "")
    timestamp = body.get("timestamp", "")
    
    # Criar contexto enriquecido
    enriched_context = f"""
    Contexto da Conversa:
    - Idioma do usuário: {language}
    - Página atual: {current_page}
    - URL: {page_url}
    - Hora: {timestamp}
    
    Instrução: Responda em {language} considerando que o usuário 
    está na página {current_page} do site da WB Digital Solutions.
    """
    
    # Adicionar ao state para o LangGraph
    state = {
        "user_input": user_input,
        "user_id": user_id,
        "language": language,
        "current_page": current_page,
        "enriched_context": enriched_context,
        "messages": [],
        "memory": {},
        "metadata": {
            "page_url": page_url,
            "timestamp": timestamp
        },
        "qdrant_client": qdrant
    }
    
    # Processar com o graph
    result = await graph.ainvoke(state)
    
    return {
        "raw_response": result.get("response"),
        "revised_response": result.get("revised_response"),
        "detected_intent": result.get("intent"),
        "final_step": result.get("step"),
        "language_used": language,  # Confirmar idioma usado
        "cached": False
    }
```

## 📝 Notas Importantes

1. **Retrocompatibilidade**: O campo `message` continua igual, então o bot funcionará mesmo sem processar os novos campos.

2. **Campos Opcionais**: Todos os novos campos têm valores padrão se não forem enviados.

3. **User ID Persistente**: O `user_id` fica salvo no localStorage do navegador, então o mesmo usuário terá o mesmo ID mesmo após recarregar a página.

4. **Privacidade**: Não são enviados dados pessoais além do que o usuário digita. O ID é anônimo.

## 🚀 Benefícios

- ✅ Respostas no idioma correto automaticamente
- ✅ Contexto sobre o que o usuário está vendo
- ✅ Possibilidade de personalizar respostas por página
- ✅ Rastreamento de conversas por usuário
- ✅ Métricas e análise de uso por página/idioma
- ✅ Melhor experiência do usuário

## 📞 Contato

Se tiverem dúvidas sobre a integração:
- Email: bruno@wbdigitalsolutions.com
- WhatsApp: +55 11 98286-4581

---

**Última atualização**: 09/01/2025
**Implementado por**: Bruno Vieira / Claude Code