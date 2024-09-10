// const express = require('express');
// const app = express();
// const path = require('path');

// // Servir arquivos estáticos da pasta atual
// app.use(express.static(path.join(__dirname, '..')));

// // Rota para servir o arquivo gerador.html na rota raiz ("/")
// app.get('/', function(req, res) {
//     res.sendFile(path.join(__dirname,'..', 'gerador.html'));
// });

// app.listen(3000, () => {
//   console.log('Aplicação está rodando na porta 3000!');
// });
const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

// Servir arquivos estáticos da pasta atual
app.use(express.static(path.join(__dirname, '..')));

// Rota para servir o arquivo gerador.html na rota raiz ("/")
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '..', 'gerador.html'));
});

// Rota para deletar vários arquivos específicos
app.post('/delete-files', function(req, res) {
    const filesToDelete = ['arestas.json', 'autores.json', 'falas.json', 'links.json', 'vertices.json'];
    filesToDelete.forEach(filename => {
        fs.unlink(path.join(__dirname, '..', filename), function(err) {
            if (err) {
                console.error(`Erro ao deletar o arquivo ${filename}: ${err}`);
            } else {
                console.log(`Arquivo ${filename} deletado com sucesso`);
            }
        });
    });
    res.status(200).send('Arquivos deletados com sucesso');
});

app.listen(3000, () => {
  console.log('Aplicação está rodando na porta 3000!');
});

