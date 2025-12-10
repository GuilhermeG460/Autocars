// Aguarda o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', () => {
    // 1. Obtém os elementos DOM necessários
    const aiToggle = document.getElementById('ai-toggle');
    const aiWindow = document.getElementById('ai-window');
    const closeBtn = aiWindow.querySelector('.close-btn');
    const chatBody = aiWindow.querySelector('.chat-body'); // Onde as mensagens aparecem
    const inputField = aiWindow.querySelector('input[type="text"]'); // Campo de texto
    const sendButton = aiWindow.querySelector('button'); // Botão Enviar

    // 2. Base de Conhecimento Simples (Palavras-chave e Respostas)
    const knowledgeBase = [
        { keywords: ['catalogo', 'modelos', 'veiculos'], response: 'Você pode navegar por todos os nossos modelos disponíveis na página CATÁLOGO DE VEÍCULOS. Temos esportivos, SUVs e utilitários!' },
        { keywords: ['revisao', 'manutencao', 'agenda'], response: 'Para marcar uma revisão, acesse a seção MARQUE SUA REVISÃO no menu principal. Temos horários disponíveis esta semana!' },
        { keywords: ['cadastro', 'promocao', 'gratis'], response: 'Sim! Cadastre-se agora mesmo e ganhe frete grátis na sua primeira compra de acessórios ou peças. O link está na nossa página inicial.' },
        { keywords: ['pagamento', 'parcela', 'boleto'], response: 'Aceitamos diversas formas de pagamento, incluindo cartão de crédito em até 12x e boleto bancário à vista. Consulte nosso setor de vendas para simulações.' },
        { keywords: ['quem', 'turbo'], response: 'Somos a Turbo Auto Car, sua concessionária parceira em alta performance e qualidade! Nossa missão é oferecer os melhores veículos e serviços.' },
        { keywords: ['localizacao', 'endereco'], response: 'Nossa sede principal fica na Avenida dos Motores, 1234, Bairro Aceleração, Cidade Velocidade.' },
        { keywords: ['ola', 'oi', 'ajuda'], response: 'Olá! Como posso te auxiliar hoje? Pergunte sobre catálogos, revisões ou promoções!' }
    ];

    // 3. Funções de Chat
    
    // Rola o chat para a mensagem mais recente
    const scrollToBottom = () => {
        chatBody.scrollTop = chatBody.scrollHeight;
    };

    // Adiciona uma mensagem ao corpo do chat (usuário ou bot)
    const appendMessage = (text, sender) => {
        const messageElement = document.createElement('p');
        messageElement.classList.add('message', `${sender}-message`);
        messageElement.textContent = text;
        chatBody.appendChild(messageElement);
        scrollToBottom();
    };

    // Lógica para obter a resposta do bot com base no texto do usuário
    const getBotResponse = (userInput) => {
        const normalizedInput = userInput.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // Remove acentos
        
        // Tenta encontrar uma resposta baseada em palavra-chave
        for (const item of knowledgeBase) {
            const found = item.keywords.some(keyword => normalizedInput.includes(keyword));
            if (found) {
                return item.response;
            }
        }
        
        // Resposta padrão se nenhuma palavra-chave for encontrada
        return 'Desculpe, não entendi sua pergunta. Tente perguntar sobre "catálogo", "revisão" ou "pagamento".';
    };

    // Lógica principal de envio de mensagem
    const sendMessage = () => {
        const userInput = inputField.value.trim();
        if (userInput === '') return;

        // 1. Exibe a mensagem do usuário
        appendMessage(userInput, 'user');
        inputField.value = ''; // Limpa o input

        // 2. Simula o tempo de processamento do bot
        setTimeout(() => {
            const botResponse = getBotResponse(userInput);
            appendMessage(botResponse, 'bot');
        }, 800); // 800ms de delay para simular que a IA está "pensando"
    };

    // 4. Funções de Visibilidade do Chat
    
    const toggleChat = () => {
        const isOpen = aiWindow.classList.contains('open');

        if (isOpen) {
            aiWindow.classList.remove('open');
            setTimeout(() => { aiWindow.style.display = 'none'; }, 300);
        } else {
            aiWindow.style.display = 'flex';
            requestAnimationFrame(() => {
                aiWindow.classList.add('open');
                scrollToBottom(); // Rola para o final ao abrir
            });
        }
    };

    // 5. Adiciona Listeners
    if (aiToggle) {
        aiToggle.addEventListener('click', toggleChat);
    }
    if (closeBtn) {
        closeBtn.addEventListener('click', toggleChat);
    }
    // Enviar mensagem ao clicar no botão
    if (sendButton) {
        sendButton.addEventListener('click', sendMessage);
    }
    // Enviar mensagem ao apertar Enter
    if (inputField) {
        inputField.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault(); // Impede quebra de linha
                sendMessage();
            }
        });
    }
});