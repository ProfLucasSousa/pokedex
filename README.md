# 🎮 Pokedex Interativa

Uma Pokedex moderna e interativa desenvolvida com HTML, CSS e JavaScript puro, consumindo dados da [PokeAPI](https://pokeapi.co/).

## ✨ Funcionalidades

### 🔍 Busca Inteligente
- Pesquise Pokémon por nome ou número
- Resultados em tempo real conforme você digita
- Funciona em conjunto com os filtros por tipo

### 🎯 Filtros por Tipo
- Filtre Pokémon por tipo (Fogo, Água, Planta, Elétrico, etc.)
- 10 tipos diferentes disponíveis
- Visual intuitivo com botões coloridos

### 📊 Modal de Detalhes
- Clique em qualquer Pokémon para ver informações completas
- Visualize stats com barras de progresso animadas
- Veja habilidades, altura, peso e experiência base
- Imagens em alta qualidade

### ⚡ Performance Otimizada
- Carregamento inicial de 20 Pokémon
- Botão "Carregar Mais" para adicionar 20 por vez
- Uso de Promise.all para requisições paralelas
- Indicador visual de loading

### 🎨 Design Responsivo
- Interface adaptável para desktop, tablet e mobile
- Animações suaves e efeitos hover
- Cards coloridos baseados no tipo do Pokémon
- Modal elegante com transições

## 🚀 Tecnologias Utilizadas

- **HTML5** - Estrutura semântica
- **CSS3** - Estilização e animações
  - Flexbox para layout responsivo
  - Gradientes e transições suaves
  - Media queries para responsividade
- **JavaScript (ES6+)** - Lógica e interatividade
  - Async/Await para requisições assíncronas
  - Fetch API para consumir a PokeAPI
  - Manipulação do DOM
  - Event Listeners
- **PokeAPI** - Dados dos Pokémon

## 📦 Como Usar

### Opção 1: Usar diretamente
1. Clone o repositório:
```bash
git clone https://github.com/ProfLucasSousa/pokedex.git
```

2. Entre na pasta do projeto:
```bash
cd pokedex
```

3. Abra o arquivo `index.html` no seu navegador preferido

### Opção 2: Live Server (Recomendado)
1. Instale a extensão [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) no VS Code

2. Clique com o botão direito no arquivo `index.html`

3. Selecione "Open with Live Server"

## 📁 Estrutura do Projeto

```
pokedex/
│
├── index.html          # Estrutura HTML da aplicação
├── style.css           # Estilos e animações
├── script.js           # Lógica e integração com API
└── README.md           # Documentação do projeto
```

## 🎯 Funcionalidades Implementadas

- [x] Carregamento dinâmico de Pokémon
- [x] Sistema de busca por nome/número
- [x] Filtros por tipo
- [x] Modal com detalhes completos
- [x] Paginação inteligente
- [x] Design responsivo
- [x] Animações e transições
- [x] Loading indicator
- [x] Tratamento de erros

## 🌐 API Utilizada

Este projeto utiliza a [PokeAPI](https://pokeapi.co/), uma API RESTful gratuita que fornece dados completos sobre Pokémon.

**Endpoints utilizados:**
- `GET https://pokeapi.co/api/v2/pokemon/{id}` - Dados individuais do Pokémon

## 💡 Aprendizados

Durante o desenvolvimento deste projeto, foram aplicados conceitos de:
- Consumo de APIs RESTful
- Programação assíncrona com Promises
- Manipulação avançada do DOM
- Design responsivo e mobile-first
- Otimização de performance
- UX/UI design

## 🤝 Contribuindo

Contribuições são sempre bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'feat: adicionar nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request

## 📝 Commits Semânticos

Este projeto utiliza [Conventional Commits](https://www.conventionalcommits.org/):

- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `docs`: Documentação
- `style`: Formatação
- `refactor`: Refatoração de código
- `test`: Testes
- `chore`: Tarefas gerais

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**Prof. Lucas Sousa**

- GitHub: [@ProfLucasSousa](https://github.com/ProfLucasSousa)
- Projeto: [Pokedex](https://github.com/ProfLucasSousa/pokedex)

---

⭐ Se este projeto foi útil para você, considere dar uma estrela!

**Desenvolvido com ❤️ e ☕**
