/****************************************************************************************************
 * Objetivo: Desenvolver um buscador de CEP, utilizando (HTML,CSS e JS)
 * Data:07/02/2025
 * Autor: Daniel
 * Versão: 1.0
 ****************************************************************************************************/

// throw: Lança erros personalizados.

// await: Espera a resolução de Promises.

// Regex: Valida padrões em strings.

// try...catch: Captura e trata erros.

// fetch: Faz requisições HTTP.

const cep = document.querySelector('#cep');
const address = document.querySelector('#address');
const bairro = document.querySelector('#bairro');
const cidade = document.querySelector('#cidade');
const message = document.querySelector('#message');

cep.addEventListener('focusout', async () => {
    try {
        // Expressão regular para validar o CEP (8 dígitos)
        const cepRegex = /^[0-9]{8}$/;

        // Remove caracteres não numéricos (como hífen)
        const cepNumerico = cep.value.replace(/\D/g, '');

        // Valida o CEP
        if (!cepRegex.test(cepNumerico)) {
            throw { cep_error: 'CEP inválido. Digite exatamente 8 números.' };
        }

        // Faz a requisição à API ViaCEP
        const response = await fetch(`https://viacep.com.br/ws/${cepNumerico}/json/`);

        // Verifica se a resposta da API está OK
        if (!response.ok) {
            throw await response.json();
        }

        // Converte a resposta para JSON
        const responseCep = await response.json();

        // Verifica se o CEP foi encontrado
        if (responseCep.erro) {
            throw { cep_error: 'CEP não encontrado.' };
        }

        // Preenche os campos com os dados do CEP
        address.value = responseCep.logradouro || '';
        bairro.value = responseCep.bairro || '';
        cidade.value = responseCep.localidade || '';

        // Limpa a mensagem de erro, se houver
        message.textContent = '';

    } catch (error) {
        // Exibe a mensagem de erro
        if (error?.cep_error) {
            message.textContent = error.cep_error;
            setTimeout(() => {
                message.textContent = '';
            }, 5000);
        } else {
            console.error('Erro ao buscar CEP:', error);
        }
    }
});