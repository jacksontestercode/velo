Este é o meu workflow atual:

Agora aplique a solução considerando esse arquivo.

Você é um especialista em CI/CD com Vercel e ambientes isolados.

Contexto:
Tenho um pipeline que:
- Faz build usando `vercel pull --environment=preview`
- Deploy preview
- Roda testes E2E
- Usa `vercel promote`

Problema:
As variáveis VITE_* são embutidas no build.
Isso faz com que, após o promote, produção use o Supabase de preview.

Objetivo:
Modificar o workflow para garantir:
- Preview usa Supabase preview
- Produção usa Supabase produção
- NÃO usar `vercel promote`

Tarefa:
- Reescrever o workflow para:
  1. Build preview
  2. Deploy preview
  3. Rodar E2E
  4. Fazer um NOVO build com environment=production
  5. Deploy para produção

Formato:
- YAML completo
- Comentado linha a linha