# Funcionamento e Manutenção do ChatBot

## Visão Geral
O ChatBot é um componente flutuante que oferece interação ao usuário em todas as páginas do site, com foco em responsividade, UX e clareza visual.

## Estrutura de Componentes
- **src/components/ChatBot.tsx**: Componente principal do chat.
- **src/components/ChatBot.module.css**: Estilos do chat, incluindo responsividade e rolagem.
- **Wrapper externo**: Definido em `src/app/page.tsx`, controla altura e posicionamento do chat.

## Responsividade
- **Desktop**: Altura fixa de 500px (máximo 80vh), largura máxima de 400px. Conteúdo rola internamente.
- **Mobile**: Wrapper externo limita altura (ex: 65vh). Chat ocupa 100% da altura do wrapper. Conteúdo rola internamente.
- **Botão flutuante**: Sempre visível, fixa a base do chat acima dele.

## Altura Fixa e Rolagem Interna
- O chat nunca cresce além do limite definido.
- `.chatbotMessages` sempre usa `flex: 1 1 auto` e `overflow-y: auto`.
- O input nunca empurra a caixa para baixo.

## Pontos de Atenção
- Nunca remova ou sobrescreva os limites de altura do chat.
- Sempre teste em diferentes tamanhos de tela após ajustes.
- O botão flutuante deve permanecer visível e não ser sobreposto pelo chat.
- Ajustes de altura devem ser feitos no wrapper externo (mobile) ou no CSS do chat (desktop).

## Como Ajustar
- **Altura desktop**: Edite `.chatbotContainer` em `ChatBot.module.css` (`height: 500px !important; max-height: 80vh !important;`).
- **Altura mobile**: Edite o wrapper externo em `page.tsx` (`height: 65vh` ou valor desejado).
- **Rolagem interna**: Garanta que `.chatbotMessages` tenha `flex: 1 1 auto` e `overflow-y: auto`.
- **Botão flutuante**: Ajuste o `bottom` do wrapper externo para alinhar a base do chat acima do botão.

## Boas Práticas
- Documente qualquer ajuste relevante neste arquivo.
- Siga o padrão de commits e deploy descrito em `docs/deploy-e-commits.md`.
- Consulte este documento antes de alterar responsividade, altura ou comportamento do chat.

## Histórico de Decisões
- Altura fixa e rolagem interna foram adotadas para garantir UX consistente e evitar problemas de sobreposição.
- O wrapper externo foi usado para garantir responsividade real em mobile.

---

Mantenha este documento atualizado a cada ajuste relevante! 