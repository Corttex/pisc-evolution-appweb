# Design System: Piscinas Evolution

## Visão Geral
Este design system reflete o encontro entre o lazer de alto padrão e a engenharia de precisão. A marca é autoritária e refrescante, posicionando a **Piscinas Evolution** como líder em tecnologia aquática e construção de piscinas de luxo em Brasília.

## Identidade Visual
*   **Estilo:** Corporativo Moderno / Minimalismo Técnico.
*   **Elementos Chave:** Espaço em branco generoso, Glassmorphism, sombras ambientais sutis e tipografia técnica.
*   **Experiência:** Scroll suave (momentum), transições fluidas e foco em conversão para WhatsApp.

## Paleta de Cores
| Cor | Hex | Uso |
| :--- | :--- | :--- |
| **Azul Profundo** | `#0B3C5D` | Cor primária, botões principais, cabeçalhos, confiança. |
| **Azul Médio** | `#00658c` | Cor secundária, links, ícones de serviço. |
| **Amarelo Solar** | `#F2B705` | Destaques de "Aquecimento", "Energia", CTAs de urgência. |
| **Grafite** | `#2B2B2B` | Tipografia principal, labels técnicas, modo escuro. |
| **Azul Claro** | `#4FA3D1` | Suporte, backgrounds leves, transparências. |
| **Branco Puro** | `#FFFFFF` | Backgrounds limpos, acabamento premium. |

## Tipografia
*   **Headlines (H1, H2, H3):** `Work Sans`
    *   Peso: Bold (700) ou SemiBold (600).
    *   Estilo: Espaçamento entre letras levemente reduzido (-0.02em).
*   **Corpo de Texto & UI:** `Manrope`
    *   Peso: Regular (400) ou Medium (500).
    *   Estilo: Altura de linha generosa (1.6) para legibilidade.

## Componentes & Formas
*   **Arredondamento:** 
    *   Padrão: `4px` (lg no tailwind padrão).
    *   Cards/Seções: `12px` (xl no tailwind padrão).
*   **Botões:**
    *   Primário: Azul Profundo com texto Branco.
    *   Aquecimento: Amarelo Solar com texto Branco/Preto.
*   **Glassmorphism:** Aplicado em menus flutuantes e overlays com `backdrop-blur-md` e transparência de 80-90%.

## Estrutura do Projeto (Next.js App Router)
*   `src/app/(site)`: Site institucional, páginas de SEO e Galeria.
*   `src/app/(auth)`: Login para Clientes e Admin.
*   `src/app/(admin)`: Painel Administrativo ERP/CRM.
*   `src/app/(portal)`: Área do Cliente (Acompanhar Agenda).

## Tecnologias
*   **Framework:** Next.js 14+ (App Router).
*   **Styling:** Tailwind CSS.
*   **Animações:** Framer Motion (para transições suaves e scroll).
*   **Pagamentos:** API do Asaas (Integração Pix).
