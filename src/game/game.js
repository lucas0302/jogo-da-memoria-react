// Objeto principal do jogo
let game = {

    // Propriedades para controlar o estado do jogo
    lockMode: false, // Indica se o jogo está temporariamente travado (não permite virar mais cartas)
    firstCard: null, // Armazena a primeira carta selecionada
    secondCard: null, // Armazena a segunda carta selecionada

    // Array de tecnologias que serão usadas nas cartas
    techs: ['bootstrap', 'css', 'electron', 'firebase', 'html', 'javascript', 'jquery', 'mongo', 'node', 'react'],

    
    cards: null,

    // Função para definir a carta selecionada
    setCard: function (id) {
        let card = this.cards.filter(card => card.id === id)[0];
        if (card.flipped || this.lockMode) {
            return false;
        }

        // Define a primeira ou a segunda carta e vira ela
        if (!this.firstCard) {
            this.firstCard = card;
            this.firstCard.flipped = true;
            return true;
        } else {
            this.secondCard = card;
            this.secondCard.flipped = true;
            this.lockMode = true; // Trava o jogo para não virar mais cartas
            return true;
        }
    },

    // Verifica se as duas cartas selecionadas são iguais
    checkMatch: function () {
        if (!this.firstCard || !this.secondCard) {
            return false;
        }
        return this.firstCard.icon === this.secondCard.icon;
    },

    // Reseta as cartas selecionadas e o estado de travamento
    clearCards: function () {
        this.firstCard = null;
        this.secondCard = null;
        this.lockMode = false;
    },

    // Desvira as cartas selecionadas e limpa a seleção
    unflipCards: function () {
        this.firstCard.flipped = false;
        this.secondCard.flipped = false;
        this.clearCards();
    },

    // Verifica se todas as cartas foram viradas, indicando o fim do jogo
    checkGameOver: function () {
        return this.cards.filter(card => !card.flipped).length === 0;
    },

    // Cria as cartas do jogo a partir das tecnologias
    createCardsFromTechs: function () {
        this.cards = [];
        this.techs.forEach((tech) => {
            this.cards.push(this.createPairFromTech(tech));
        })
        this.cards = this.cards.flatMap(pair => pair);
        this.shuffleCards(); // Embaralha as cartas
        return this.cards;
    },

    // Cria um par de cartas para cada tecnologia
    createPairFromTech: function (tech) {
        return [{
            id: this.createIdWithTech(tech),
            icon: tech,
            flipped: false,
        }, {
            id: this.createIdWithTech(tech),
            icon: tech,
            flipped: false,
        }]
    },

    // Gera um ID único para cada carta
    createIdWithTech: function (tech) {
        return tech + parseInt(Math.random() * 1000);
    },

    // Embaralha as cartas do jogo
    shuffleCards: function () {
        let currentIndex = this.cards.length;
        let randomIndex = 0;
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]]
        }
    },

    // Lógica para virar a carta e verificar se há uma combinação ou fim do jogo
    flipCard: function(cardId, gameOverCallBack, noMatchCallback){
        if (this.setCard(cardId)) {
            if (this.secondCard) {
                if (this.checkMatch()) {
                    this.clearCards();
                    if (game.checkGameOver()) {
                        gameOverCallBack(); // Chamada de retorno quando o jogo termina
                    }
                } else {
                    setTimeout(() => {
                        this.unflipCards();
                        noMatchCallback(); // Chamada de retorno quando não há combinação
                    }, 800);
                };
            }
        }
    }
}

export default game;
