# 🧩 PokeList

PokeList é uma aplicação web desenvolvida com **Angular** e estilizada com **Bootstrap**, que consome a [PokéAPI](https://pokeapi.co/) para listar, favoritar e visualizar detalhes de Pokémons.

---

## 🚀 Funcionalidades

- ✅ **Listagem de Pokémons** com paginação
- ⭐ **Favoritar Pokémons** com persistência local (`localStorage`)
- 📄 **Página de detalhes** de cada Pokémon (com stats, tipos, habilidades, peso e altura)
- 📌 **Página exclusiva de favoritos**
- 🎨 **Cores dinâmicas** no card com base no tipo do Pokémon

---

## 🛠 Tecnologias utilizadas

- [Angular](https://angular.io/) 17+
- [Bootstrap](https://getbootstrap.com/)
- [PokéAPI](https://pokeapi.co/)
- [TypeScript](https://www.typescriptlang.org/)
- `localStorage` para persistência de favoritos

---

## 📂 Estrutura do Projeto

src/
├── app/
│ ├── home/ # Página principal com listagem de Pokémons
│ ├── pokemon/ # Página de detalhes de cada Pokémon
│ ├── favoritos/ # Página com lista de favoritos
│ ├── services/
│ │ └── pokemon-style.service.ts # Serviço para cores dinâmicas por tipo
│ ├── navbar/ # Componente de navegação
│ └── app.routes.ts # Rotas da aplicação

## 🌐 Deploy Online

Você pode acessar a aplicação online neste link:

[![Vercel](https://img.shields.io/badge/Deploy-Vercel-blue)](https://poke-list-git-master-marllon-wendel2s-projects.vercel.app/)

👉 [https://poke-list-git-master-marllon-wendel2s-projects.vercel.app/](https://poke-list-git-master-marllon-wendel2s-projects.vercel.app/)
