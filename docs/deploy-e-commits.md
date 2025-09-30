# Guia de Deploy e Commits Automatizados

## 1. Fluxo de Commits

- Sempre escreva mensagens de commit claras e objetivas.
- Use o padrão: `<tipo>: descrição breve`
  - Exemplos de tipos: `feat` (feature), `fix` (correção), `docs` (documentação), `refactor` (refatoração), `chore` (tarefa), `style` (estilo).
- Exemplo:
  ```sh
  git add .
  git commit -m "feat: adiciona componente de resultados animados"
  git push origin main
  ```

## 2. Fluxo de Deploy (Vercel + GitHub)

- O deploy é feito automaticamente a cada push na branch `main` do GitHub.
- Não é necessário rodar comandos manuais na Vercel.
- Para forçar um novo deploy, basta fazer um novo commit e push, mesmo que seja um ajuste mínimo.
- Exemplo:
  ```sh
  git commit --allow-empty -m "chore: trigger redeploy"
  git push origin main
  ```

## 3. Boas Práticas

- Sempre verifique se o `.gitignore` está atualizado para evitar subir arquivos desnecessários.
- Antes de commitar, rode `git status` para revisar o que será enviado.
- Use branches para features grandes e faça merge na `main` após revisão.
- Documente mudanças relevantes no README ou em arquivos de documentação.

## 4. Automatização Sugerida

- **Git Hooks:** Use ferramentas como Husky para padronizar mensagens de commit e rodar lint/testes antes do push.
- **CI/CD:** A Vercel já faz deploy contínuo, mas pode-se integrar testes automatizados no pipeline.
- **Scripts úteis:**
  - `npm run lint` para checar padrões de código.
  - `npm run build` para garantir que o build está funcionando localmente.

## 5. Checklist Rápido

- [ ] Mensagem de commit clara
- [ ] Código testado localmente
- [ ] Push realizado na branch correta
- [ ] Deploy verificado na Vercel

---

## 6. Manutenção e Ajustes do ChatBot

- O ChatBot possui altura fixa e rolagem interna tanto no desktop quanto no mobile, garantindo que a caixa nunca cresça além do limite e o conteúdo role internamente.
- O posicionamento do botão flutuante e o espaçamento da base são essenciais para boa UX.
- Para ajustes de responsividade, altura ou comportamento, consulte o documento `docs/chatbot-funcionamento.md`.
- Sempre teste o comportamento do chat em diferentes tamanhos de tela após qualquer ajuste.
- Caso precise alterar altura, rolagem ou responsividade, siga as boas práticas descritas na documentação do ChatBot.

---

**Dúvidas ou sugestões? Atualize este documento conforme o time evoluir!** 