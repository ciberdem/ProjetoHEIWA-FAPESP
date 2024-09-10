document.addEventListener('DOMContentLoaded', (event) => {
    const numAtores = document.getElementById('numAtores');
    const numFalas = document.getElementById('numFalas');
    const numFalasLabel = document.getElementById('numFalas-label');
    const numLinks = document.getElementById('numLinks');
    const numLinksLabel = document.getElementById('numLinks-label');
    const botaoSequencial = document.getElementById('botaoSequencial');
    const botaoGerarArquivo = document.getElementById('botaoGerarArquivos');
    const botaoReiniciar = document.getElementById('botaoReiniciar');

    if(numFalas && numFalasLabel && numLinks && numLinksLabel && botaoSequencial && botaoGerarArquivo && botaoReiniciar) {
        numFalas.style.display = 'none';
        numFalasLabel.style.display = 'none';
        numLinks.style.display = 'none';
        numLinksLabel.style.display = 'none';
        botaoSequencial.style.display = 'none';
        botaoGerarArquivo.style.display = 'none';
        botaoReiniciar.style.display = 'none';
    } else {
        console.error('Um ou mais elementos não foram encontrados');
    }

    numAtores.addEventListener('keyup', function(event) {
        if (event.key === 'Enter' && this.value !== '') {
            numFalas.style.display = 'block';
            numFalasLabel.style.display = 'block';
            numFalas.focus();
        }
    });

    numFalas.addEventListener('keyup', function(event) {
        if (event.key === 'Enter' && this.value !== '') {
            numLinks.style.display = 'block';
            numLinksLabel.style.display = 'block';
            numLinks.focus();
        }
    });

    numLinks.addEventListener('keyup', function(event) {
        if (event.key === 'Enter' && this.value !== '') {
            botaoSequencial.style.display = 'block';
            botaoSequencial.focus();
        }
    });

    botaoSequencial.addEventListener('click', function() {
        botaoSequencial.disabled = true;

        window.gerarAtores()
        .then(window.gerarFalas)
        .then(window.gerarLinks)
        .then(window.gerarVertices)
        .then(window.gerarArestas)
        .then(() => {
            console.log("Todas as funções foram executadas com sucesso!");
            botaoGerarArquivo.style.display = 'block';
            botaoGerarArquivo.focus();
        });
    });

    document.getElementById('botaoGerarArquivos').addEventListener('click', async function() {
        // Desabilitar o botão
        this.disabled = true;
    
        // Chamar a função assíncrona
        try {
            await window.gerarArquivos();
            console.log("Arquivos gerados com sucesso!");
        } catch (erro) {
            console.error("Erro ao gerar arquivos: ", erro);
        }
        botaoGerarGrafico.style.display = 'block';
        botaoGerarGrafico.focus();
    });
    

    document.getElementById('botaoGerarGrafico').addEventListener('click', function() {
        // Desabilitar o botão
        this.disabled = true;
    
        // Chamar a função
        try {
            window.gerarGrafico();
            console.log("Gráfico gerado com sucesso!");
        } catch (erro) {
            console.error("Erro ao gerar gráfico: ", erro);
        }
        botaoReiniciar.style.display = 'block';
        botaoReiniciar.focus();


    });
    

    botaoReiniciar.addEventListener('click', function() {
        if (confirm('Você tem certeza de que deseja deletar os arquivos dos dados e recarregar a página?')) {
            fetch('/delete-files', { method: 'POST' })
            .then(response => {
                if (response.ok) {
                    location.reload();
                } else {
                    console.error('Erro ao deletar arquivos');
                }
            });
        }
    });
});
