const cep     = document.querySelector('#cep');
const address = document.querySelector('#address');
const bairro  = document.querySelector('#bairro');
const cidade  = document.querySelector('#cidade');
const message = document.querySelector('#message');

cep.addEventListener('focusout', async() => {

    try{
        const numeros = ˆ[0-9]+$;
        // const cepValido = /ˆ0-9]{8};

        if(!numeros.test(cep.value) || !cepValido.test(cep.value)){
            throw {cep_error: 'VOCÊ É BURRO?'}
        }

        const response = await fetch(`https://viacep.com.br/ws/${cep.value}/json/`)

        if(!response.ok){
            throw await response.json();
        }

        const responseCep = await response.json();

        address.value = responseCep.logradouro;
        bairro.value = responseCep.bairro;
        cidade.value = responseCep.localidade;


    }   catch(error){
        if(error?.cep_error){
            message.textContent = error.cep_error;
            setTimeout(() => {
                message.textContent = "";
            }, 5000);
        }
        console.log(error)
    }
    
    

})