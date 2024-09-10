//As seguintes funções são usadas para gerar dados fictícios.


// Esta função é usada para gerar nomes
// preciso que essa função retorne uma promessa


async function gerarNome() {
    return new Promise((resolve, reject) => {
        let nomes = ['Fulano', 'Ciclano', 'Beltrano'];
        let sobrenome = '';
        for (let i = 0; i < 5; i++) {
            sobrenome += Math.floor(Math.random() * 6);
        }
        let nomeCompleto = nomes[Math.floor(Math.random() * nomes.length)] + ' ' + sobrenome;
        resolve(nomeCompleto);
    });
}
// Esta função é usada para gerar um texto Lorem ipsum.

function gerarLoremIpsum(min, max) {
    return new Promise((resolve, reject) => {
        let loremIpsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac efficitur sapien. In ac dolor metus. Quisque luctus est at efficitur vehicula. Donec nec nunc purus. Suspendisse ut arcu cursus.';
        let slice = '';
        while (slice.length < min) {
            let start = Math.floor(Math.random() * (loremIpsum.length - min));
            let end = start + min + Math.floor(Math.random() * (max - min));
            slice = loremIpsum.slice(start, end);
        }
        resolve(slice);
    });
}

let topicoGlobal = gerarLoremIpsum(10, 30);

// Esta função é usada para gerar o tópico.

function gerarTopico() {
    return new Promise((resolve, reject) => {
        resolve(topicoGlobal);
    });
}

// Esta função é usada para gerar a data.


async function gerarData() {
    return new Promise((resolve, reject) => {
        let data = new Date(+new Date() - Math.floor(Math.random()*10000000000));
        resolve(data.toISOString().slice(0,10).split('-').reverse().join('-'));
    });
}

// Esta função é usada para gerar a hora.


async function gerarHora() {
    return new Promise((resolve, reject) => {
        let hora = new Date(+new Date() - Math.floor(Math.random()*10000000000));
        resolve(hora.toTimeString().slice(0,8));
    });
}

// Esta função é usada para gerar o conteúdo.


async function gerarConteudo() {
    return new Promise(async (resolve, reject) => {
        if (Math.random() < 0.5) {
            resolve("Curtiu");
        } else {
            try {
                let conteudo = await gerarLoremIpsum(10, 250);
                resolve(conteudo);
            } catch (error) {
                reject(error);
            }
        }
    });
}


let atoresGlobal = [];

// Esta função é usada para gerar entidades para a visualização de dados.

async function gerarAtores() {
    return new Promise(async (resolve, reject) => {
        let numAtores = document.getElementById('numAtores').value;
        for (let i = 0; i < numAtores; i++) {
            let nome = await gerarNome();
            let ator = {
                "id_ator": i + 1,
                "nome": nome
            };
            atoresGlobal.push(ator);
        }
        // console.log(JSON.stringify(atoresGlobal));
        resolve(atoresGlobal);
    });
}

let falas = [];
async function gerarFalas() {
    return new Promise(async (resolve, reject) => {
        let numFalas = document.getElementById('numFalas').value;
        let atorIdFala1;
        let conteudoFala1;
        for (let i = 0; i < numFalas; i++) {
            let atorIndex = Math.floor(Math.random() * atoresGlobal.length);
            let conteudo;

            if (i === 0) {
                conteudo = await gerarLoremIpsum(10, 250);
                atorIdFala1 = atoresGlobal[atorIndex].id_ator;
                conteudoFala1 = conteudo;
            } else if (i === 1 && atorIdFala1 === atoresGlobal[atorIndex].id_ator && conteudoFala1 === "Curtiu") {
                conteudo = await gerarLoremIpsum(10, 250);
            } else {
                conteudo = await gerarConteudo();
            }

            let fala = {
                "id_fala": i + 1,
                "data": await gerarData(),
                "hora": await gerarHora(),
                "conteudo": conteudo,
                "topico": await gerarTopico(),
                "ator": atoresGlobal[atorIndex].id_ator,
                "nome": atoresGlobal[atorIndex].nome
            };
            falas.push(fala);
        }
        // console.log(JSON.stringify(falas));
        resolve(falas);
    });
}

let links = [];

async function gerarLinks() {
    return new Promise(async (resolve, reject) => {
        let numLinks = document.getElementById('numLinks').value;
        let atoresComFalas = atoresGlobal.filter(ator => falas.some(fala => fala.ator === ator.id_ator));
        for (let i = 0; i < numLinks; i++) {
            let id_fala_destinatario = atoresComFalas[Math.floor(Math.random() * atoresComFalas.length)].id_ator;
            let id_fala_remetente;
            do {
                id_fala_remetente = atoresComFalas[Math.floor(Math.random() * atoresComFalas.length)].id_ator;
            } while (id_fala_remetente === id_fala_destinatario);

            let posicao = ["NEUTRA", "NEGATIVA", "POSITIVA"][Math.floor(Math.random() * 3)];
            let cor;
            if (posicao === "POSITIVA") {
                cor = "green";
            } else if (posicao === "NEGATIVA") {
                cor = "red";
            } else {
                cor = "grey";
            }

            let link = {
                "id_fala_destinatario": id_fala_destinatario,
                "id_fala_remetente": id_fala_remetente,
                "posicao": posicao,
                "espessura": Math.abs(Math.random() - Math.random()),
                "cor": cor
            };
            links.push(link);
        }
        // console.log(JSON.stringify(links));
        resolve(links);
    });
}


let vertices = [];

async function gerarVertices() {
    return new Promise(async (resolve, reject) => {
        let totalFalas = await falas.length
        // console.log(totalFalas);

        for (let ator of atoresGlobal) {
            let falasDoAtor = falas.filter(fala => fala.ator === ator.id_ator);
            let qtdeFalas = falasDoAtor.length;
            let idsFalas = falasDoAtor.map(fala => fala.id_fala);
            let raio = qtdeFalas;
            let porcentagemFalas = (qtdeFalas / totalFalas) * 100;

            let posicoes = falasDoAtor.map(fala => fala.posicao);
            let qtdeNeutro = posicoes.filter(posicao => posicao === "NEUTRA").length;
            let qtdeNegativo = posicoes.filter(posicao => posicao === "NEGATIVA").length;
            let qtdePositivo = posicoes.filter(posicao => posicao === "POSITIVA").length;

            let cor;
            if (qtdeNeutro >= qtdeNegativo && qtdeNeutro >= qtdePositivo) {
                cor = "grey";
            } else if (qtdeNegativo > qtdePositivo) {
                cor = "red";
            } else {
                cor = "green";
            }

            let vertice = {
                ator: ator.id_ator,
                qtdeFalas: qtdeFalas,
                idsFalas: idsFalas,
                raio: raio,
                porcentagemFalas: porcentagemFalas,
                indiceDeInfluencia: porcentagemFalas / 100
                // cor: cor
            };

            vertices.push(vertice);
        }

        // console.log(JSON.stringify(vertices));
        resolve(vertices);
    });
}


let arestas = [];
async function gerarArestas() {
    return new Promise(async (resolve, reject) => {
        let arestasTemp = [];
        for (let i = 0; i < atoresGlobal.length; i++) {
            for (let j = i + 1; j < atoresGlobal.length; j++) {
                let linksAtor1ParaAtor2 = links.filter(link => 
                    (link.id_fala_destinatario === atoresGlobal[i].id_ator && link.id_fala_remetente === atoresGlobal[j].id_ator) || 
                    (link.id_fala_destinatario === atoresGlobal[j].id_ator && link.id_fala_remetente === atoresGlobal[i].id_ator)
                );

                let qtdePositivos = linksAtor1ParaAtor2.filter(link => link.posicao === "POSITIVA").length;
                let qtdeNegativos = linksAtor1ParaAtor2.filter(link => link.posicao === "NEGATIVA").length;
                let qtdeNeutros = linksAtor1ParaAtor2.filter(link => link.posicao === "NEUTRA").length;

                let espessura = qtdePositivos + qtdeNegativos + qtdeNeutros;

                let cor;
                const totalFalas = await falas.length;
                // console.log(totalFalas);
                if (qtdeNeutros >= qtdeNegativos && qtdeNeutros >= qtdePositivos) {
                    cor = "grey";
                } else if (qtdeNegativos > qtdePositivos) {
                    cor = "red";
                } else {
                    cor = "green";
                }

                if (!(qtdePositivos === 0 && qtdeNegativos === 0 && qtdeNeutros === 0)) {
                    let aresta = {
                        ator_1: atoresGlobal[i].id_ator,
                        ator_2: atoresGlobal[j].id_ator,
                        qtdePositivos: qtdePositivos,
                        qtdeNegativos: qtdeNegativos,
                        qtdeNeutros: qtdeNeutros,
                        espessura: espessura,
                        indicePositivos: qtdePositivos / (qtdePositivos + qtdeNegativos + qtdeNeutros),
                        indiceNegativos: qtdeNegativos / (qtdePositivos + qtdeNegativos + qtdeNeutros),
                        cor: cor,
                    };

                    arestasTemp.push(aresta);
                    
                }
            }
        }

        // Início do código de calcularForca
        const totalFalas = await falas.length;
        
        const mapaVertices = vertices.reduce((mapa, vertice) => {
            mapa[vertice.ator] = vertice;
            return mapa;
        }, {});

        // Calcula a força da discussão para cada aresta
        const forcasDiscussao = arestasTemp.map((aresta, indice) => {
            let resultadoFinal;

            switch (aresta.cor) {
                case 'green':
                    resultadoFinal = 1 - (0.9 * aresta.indicePositivos);
                    break;
                case 'red':
                    resultadoFinal = 1 + (0.9 * aresta.indiceNegativos);
                    break;
                case 'grey':
                    resultadoFinal = 1;
                    break;
                default:
                    resultadoFinal = 1;
                    break;
            }

            arestasTemp[indice].forca = resultadoFinal;
            // console.log(resultadoFinal);
            return resultadoFinal;
        });

        arestas = arestasTemp

        // Resolve a promessa com o array arestas modificado
        resolve(arestas);
    });
}



// Esta função é usada para gerar arquivos JSON a partir dos dados gerados pelas funções de geração de entidades.

async function gerarArquivos() {
    atoresGlobal = [];
    falas = [];
    links = [];
    vertices = [];
    arestas = [];
    await gerarAtores();
    await gerarFalas();
    await gerarLinks();
    await gerarVertices();
    await gerarArestas();

    let blob1 = new Blob([JSON.stringify(atoresGlobal, null, 2)], {type: "application/json;charset=utf-8"});
    let blob2 = new Blob([JSON.stringify(falas, null, 2)], {type: "application/json;charset=utf-8"});
    let blob3 = new Blob([JSON.stringify(links, null, 2)], {type: "application/json;charset=utf-8"});
    let blob4 = new Blob([JSON.stringify(vertices, null, 2)], {type: "application/json;charset=utf-8"});
    let blob5 = new Blob([JSON.stringify(arestas, null, 2)], {type: "application/json;charset=utf-8"});
// Esta linha salva os dados gerados como um arquivo JSON.
    saveAs(blob1, "atores.json");
// Esta linha salva os dados gerados como um arquivo JSON.
    saveAs(blob2, "falas.json");
// Esta linha salva os dados gerados como um arquivo JSON.
    saveAs(blob3, "links.json");
// Esta linha salva os dados gerados como um arquivo JSON.
    saveAs(blob4, "vertices.json");
// Esta linha salva os dados gerados como um arquivo JSON.
    saveAs(blob5, "arestas.json");
}
// Geração do gráfico -------------------------------------------------------
// Esta função é usada para criar uma visualização de dados usando a biblioteca D3.js.

function gerarGrafico() {

  let atores = [];
  let falas = [];
  let linksData = [];
  let vertices = [];
  let arestas = [];
  let nodes = [];
  let links = [];
  let totalFalasGlobal = [];
  let quantidadePositivas = [];
  let quantidadeNegativas = [];
  let quantidadeNeutras = [];

  // Esta linha carrega os dados do arquivo JSON gerado anteriormente.

  Promise.all([
    d3.json('atores.json'),
    d3.json('arestas.json')
]).then(function(values) {
    let atores = values[0];
    let arestas = values[1];


    // console.log('atores:', atores);
    atores.forEach((ator) => {
        let aresta = arestas.find(aresta => aresta.ator_1 === ator.id_ator || aresta.ator_2 === ator.id_ator);
        let charge = 0;
        if (aresta) {
            charge = aresta.cor === 'green' ? 100 :
                     aresta.cor === 'red' ? -100 :
                     aresta.cor === 'grey' ? 0 : 0;
        }
        nodes.push({
            id: `${ator.id_ator}`,
            label: `${ator.nome}`,
            charge: charge,
            radius: 5
        });
    // Precisei inserir um charge para definir a força de atração ou repulsão entre os nós, onde valores positivos atraem e valores negativos repelem. Também precisei inserir um radius: 5 para definir o raio dos nós, pois algumas  vezes os nós estavam se sobrepondo.
    });
  
// Esta linha carrega os dados do arquivo JSON gerado anteriormente.

    d3.json('falas.json').then(function(data) {
      falas = data;
    //   console.log('falas:', falas);
      falas.forEach((fala, i, array) => {
        // console.log(`ID Fala: ${fala.id_fala}, Data: ${fala.data}, Hora: ${fala.hora}, Conteúdo: ${fala.conteudo}, Tópico: ${fala.topico}, Ator: ${fala.ator}, Nome: ${fala.nome}`);
        // console.log(`Tamanho da Array: ${array.length}`);

        totalFalasGlobal = falas.length
        
    });      
    // console.log('totalFalasGlobal', totalFalasGlobal);
// Esta linha carrega os dados do arquivo JSON gerado anteriormente.

      d3.json('links.json').then(function(data) {
        linksData = data;
        // console.log('linksData:', linksData);
        linksData.forEach((linkData) => {
            // console.log(`ID FALA DESTINATARIO: ${linkData.id_fala_destinatario}, ID FALA REMETENTE ${linkData.id_fala_remetente}, Posição: ${linkData.posicao}, Espessura: ${linkData.espessura}, Cor: ${linkData.cor}`);
        })
// Esta linha carrega os dados do arquivo JSON gerado anteriormente.

        d3.json('vertices.json').then(function(data) {
          vertices = data;
        //   console.log('vertices:', vertices);
          vertices.forEach((vertice) => {
            // console.log(`Ator: ${vertice.ator}, Qtde Falas: ${vertice.qtdeFalas}, IDs Falas: ${vertice.idsFalas}, Raio: ${vertice.raio}`);
          })


        d3.json('arestas.json').then(function(data) {
            arestas = data;
            // console.log('arestas:', arestas);
            arestas.forEach((aresta) => {
              //  console.log(`Ator 1: ${aresta.ator_1}, Ator 2: ${aresta.ator_2}, Positivos: ${aresta.qtdePositivos}, Negativos: ${aresta.qtdeNegativos}`);
                quantidadePositivas = arestas.map(aresta => aresta.qtdePositivos);
                quantidadeNegativas = arestas.map(aresta => aresta.qtdeNegativos);
                quantidadeNeutras = arestas.map(aresta => aresta.qtdeNeutros);
        
             //   console.log(quantidadePositivas);
              //  console.log(quantidadeNegativas);
              //  console.log(quantidadeNeutras);
        
                links.push({
                    source: `${aresta.ator_2}`,
                    target: `${aresta.ator_1}`,
                    strength: `${aresta.forca}`,
                    thickness: `${aresta.espessura}`,
                    color: `${aresta.cor}`
                });        
            });
        
           // console.log('---------------nodes:', nodes);
          //  console.log('links:', links);
                   
      
            var width = window.innerWidth
            var height = window.innerHeight
        
            // var svg = d3.select('svg')
            // svg.attr('width', width).attr('height', height)
                    
            var svg = d3.select('svg')
                .attr('width', width)
                .attr('height', height)
                .call(d3.zoom().on("zoom", function () {
                    svg.attr("transform", d3.event.transform);
                }))
                .append("g");

            var linkForce = d3
                .forceLink()
                .id(function (link) { return link.id })
                .strength(function (link) { return link.strength })

            var chargeForce = d3
                .forceManyBody()
                .strength(function (node) { return node.charge })

            // simulation é uma variável que armazena a simulação de força para a visualização de dados e é configurada com os seguintes parâmetros: linkForce, chargeForce, center e collision. Linkforce: é a força que liga os nós. ChargeForce: é a força de atração ou repulsão entre os nós( Números positivos se atraem e números negativos se repelem). Center: é o centro da simulação. Collision: é a força que evita a sobreposição dos nós.
            //       
            var simulation = d3
                .forceSimulation()
                // Esta linha cria a simulação de força para a visualização de dados.
                .force('link', linkForce)
                .force('charge', chargeForce)
                // .force('charge', d3.forceManyBody().strength(120))
                .force('center', d3.forceCenter(width / 2, height / 2))
                .force('collision', d3.forceCollide().radius(function(d) {
                    return d.radius + 5;
                }));
        
            var dragDrop = d3.drag().on('start', function (node) {
                node.fx = node.x
                node.fy = node.y
            }).on('drag', function (node) {
                simulation.alphaTarget(0.7).restart()
                node.fx = d3.event.x
                node.fy = d3.event.y
            }).on('end', function (node) {
                if (!d3.event.active) {
                    simulation.alphaTarget(0)
                }
                node.fx = null
                node.fy = null
            })
            
            var linkElements = svg.append("g")
            .attr("class", "links")
            .selectAll("line")
            .data(links)
            .enter().append("line")
            .attr("stroke-width", function(d) {
                return d.thickness;
            })
            // .attr("stroke", "black")
            .attr("stroke", function(d) {
                return d.color;
            })
                
            var nodeElements = svg.append("g")
                .attr("class", "nodes")
                .selectAll("circle")
                .data(nodes)
                .enter().append("circle")
                .attr("r", 3)
                .attr("fill", "black")
                .call(dragDrop)
        
            var textElements = svg.append("g")
                .attr("class", "texts")
                .selectAll("text")
                .data(nodes)
                .enter().append("text")
                .text(function (node) { return  node.label })
                .attr("font-size", 15)
                .attr("dx", 15)
                .attr("dy", 4)
                .attr("display", "none")

                textElements.style('display', 'none');

// Adiciona o evento de clique aos nós
nodeElements.on('click', function(d) {
    // Seleciona o rótulo do nó clicado
    var clickedNodeLabel = d3.selectAll('.texts text').filter(function(node) {
        return node.id === d.id;
    });
    
    // Verifica se o rótulo já está visível
    if(clickedNodeLabel.style('display') === 'none') {
        // Esconde todos os rótulos e mostra o do nó clicado
        textElements.style('display', 'none');
        clickedNodeLabel.style('display', 'block');
    } else {
        // Se já estiver visível, ele é escondido
        clickedNodeLabel.style('display', 'none');
    }
});
                   
                            
            // Esta linha configura os nós para a simulação de força. 
            simulation.nodes(nodes).on('tick', () => {
                nodeElements
                    .attr('cx', function (node) { return node.x })
                    .attr('cy', function (node) { return node.y })
                textElements
                    .attr('x', function (node) { return node.x })
                    .attr('y', function (node) { return node.y })
                linkElements
                    .attr('x1', function (link) { return link.source.x })
                    .attr('y1', function (link) { return link.source.y })
                    .attr('x2', function (link) { return link.target.x })
                    .attr('y2', function (link) { return link.target.y })
            })
        
            // Esta linha configura os links para a simulação de força.   
            simulation.force("link").links(links)       
          }).catch(function(error) {
            console.log('Erro ao carregar o arquivo linksData.json: ' + error);
          });

        }).catch(function(error) {
          console.log('Erro ao carregar o arquivo vertices.json: ' + error);
        });

      }).catch(function(error) {
        console.log('Erro ao carregar o arquivo links.json: ' + error);
      });

    }).catch(function(error) {
      console.log('Erro ao carregar o arquivo falas.json: ' + error);
    });

  }).catch(function(error) {
    console.log('Erro ao carregar o arquivo atores.json: ' + error);
  });
   
}

window.gerarAtores = gerarAtores;
window.gerarFalas = gerarFalas;
window.gerarLinks = gerarLinks;
window.gerarVertices = gerarVertices;
window.gerarArestas = gerarArestas;



