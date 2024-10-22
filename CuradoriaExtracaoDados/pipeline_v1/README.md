<h1>Pipeline de Limpeza de Dados</h1>

Este repositório contém um pipeline de limpeza de dados em Python, desenvolvido para pré-processar conjuntos de dados textuais. O pipeline foi desenvolvido para limpeza de dados advindos de redes sociais. Entretanto, ele pode ser utilizado para várias bases de dados textuais. O pipeline utiliza diversas bibliotecas, ferramentas e técnicas para garantir a qualidade e a consistência dos dados. Abaixo estão detalhadas as etapas e as funcionalidades principais do pipeline.


<img src="https://github.com/ciberdem/ProjetoHEIWA-FAPESP/blob/main/CuradoriaExtracaoDados/src/PipelineD.png" alt="Diagrama do pipeline de limpeza">


**Conteúdo**

- [Dependências](#dependências)
- [Detalhes do Pré-processamento de Texto](#detalhes-do-pré-processamento-de-texto)
- [Etapas Opcionais](#etapas-opcionais)


# Dependências

Antes de executar o pipeline, certifique-se de ter as seguintes bibliotecas instaladas:

* nltk: https://www.nltk.org/howto/portuguese_en.html
* demoji: https://pypi.org/project/demoji/
* Enelvo: https://github.com/thalesbertaglia/enelvo

```
!pip install demoji
import demoji
!pip install enelvo
from enelvo import normaliser
``` 
  
<hr>

# Detalhes do Pré-processamento de Texto
O pré-processamento de texto desempenha um papel crucial na qualidade e na consistência dos dados. No pipeline fornecido, várias etapas são realizadas para garantir que o texto de entrada seja limpo e adequado para análises subsequentes. Abaixo estão os detalhes das principais etapas de pré-processamento de texto:

## 1. Substituição de Vírgulas
Nesta etapa, todas as vírgulas no texto são temporariamente substituídas por "chavevirg". Isso é feito para contornar a ferramenta Enelvo, que separa números com vírgula durante a normalização. A substituição temporária facilita a manutenção da integridade dos dados numéricos e é revertida posteriormente.

```
texto = texto.str.replace(r',', 'chavevirg')
```

## 2. Normalização Enelvo
O próximo passo é a utilização da biblioteca Enelvo, que envolve a normalização de erros ortográficos, gírias da internet, siglas, nomes próprios e outros.

```
texto = texto.apply(lambda x: normalizador.normalise(x))
```

### Exemplo:
**Entrada**: ['testeee', 'ururguau', 'disculpa qq coisa!', "Vc eh muitooooo legal", "Oii, To trabahlando hj"]

**Saídas**: ['teste', 'uruguai', 'desculpa qualquer coisa', 'você é muito legal', 'oii to trabalhando hoje']

## 3. Substituição de Emojis
Neste passo, o código realiza a substituição de emojis por rótulos específicos. Uma lista de emojis e seus rótulos correspondentes é definida no emoji_list. Emojis encontrados no texto são substituídos por esses rótulos para uniformizar a representação de emojis. Também utilizamos a biblioteca demoji para substituir emojis por rótulos. 

```
texto = texto.apply(substitui_emoji)
```

### Exemplo:
**Entrada**: ['😀', '😋', ':)', ':(', '🤢', "😺", "🎂"]

**Saídas**: ['grinningface', 'facesavoringfood', 'emojipositivo', 'emojinegativo', 'nauseatedface', 'grinningcat', 'birthdaycake']


## 4. Substituição de Usuários
A função substitui_user é utilizada para substituir nomes de usuário (@usuário) por rótulos específicos. Ela mantém um dicionário de usuários já mapeados em um arquivo criptografado chamado 'user_dict.txt'. Se um usuário já foi mapeado, o código recupera o rótulo correspondente. Caso contrário, ele cria um novo rótulo e armazena a associação no dicionário. 

### Rótulo
O rótulo "user[número]" é uma convenção utilizada para representar nomes de usuários de forma anônima e única em um conjunto de dados de texto.

```
texto = texto.str.replace(r'@\w+', substitui_user)
```

## 5. Remoção de URLs
Qualquer URL presente no texto é removida usando uma expressão regular que identifica padrões de URLs, começando com "http://" ou "https://".

```
texto = texto.str.replace(r'https?://\S+', '')
```

## 6. Reversão da Substituição de Vírgulas
Após a remoção de URLs, o código reverterá a substituição anterior de vírgulas por 'chavevirg', restaurando-as ao seu estado original.

```
texto = texto.str.replace(r'chavevirg', ',')
```

## 7. Remoção de Pontuações e Caracteres Especiais
Este passo envolve a remoção de pontuações e caracteres especiais do texto, exceto quando esses caracteres são parte de hashtags, datas ou números com vírgulas. Isso é feito usando uma expressão regular que mantém esses padrões específicos.

```
texto = texto.apply(lambda x: re.sub(r'(?<!\d),(?=\D)|(?<=\D),(?!\d)|(?<!\d),(?=\d)|(?<!\d)\/|\/(?!\d)|_|[^\w#\/\s,]', '', x))
```

# Etapas Opcionais
Para ativar a remoção de stop words e tokenização, ajuste as configurações opcionais remove_stopwords e tokenization ao chamar a função preprocess para <code>True</code>. Por padrão, ambas estão desativadas.

Exemplo:

```
texto = preprocess(texto, remove_stopwords=True, tokenization=True)
```

## 1. Remoção de Stop Words (Opcional)
Stop words, palavras que não contribuem significativamente para o significado do texto, são removidas. Isso ajuda a reduzir a dimensionalidade do texto e melhorar o desempenho dos modelos de análise de texto.

```
texto = texto.apply(lambda x: ' '.join([word for word in x.split() if word not in stopwords]))
```

## 2. Tokenização (Opcional)
O texto é tokenizado em palavras, hashtags, datas e números com vírgula. O código utiliza uma expressão regular que considera palavras como sequências de caracteres alfanuméricos, hashtags começando com '#', datas no formato 'dd/mm' ou 'dd/mm/yyyy' e números com vírgula.

```
pattern = r"\b(?:\d{1,2}/\d{1,2}(?:/\d{4})?)\b|(?:\d+,\d+)|\b\w+\b|#\w+\b"
texto = texto.apply(lambda x: regexp_tokenize(x, pattern))
```

<hr>

# Testes

Nesta seção, apresentamos o processamento aplicado em um arquivo teste:

<img src="https://github.com/ciberdem/ProjetoHEIWA-FAPESP/blob/main/CuradoriaExtracaoDados/src/Teste_preprocess.png" alt="Exemplo de saída de execução do código">

<img src="https://github.com/ciberdem/ProjetoHEIWA-FAPESP/blob/main/CuradoriaExtracaoDados/src/exemplo_pipeline.png" alt="Exemplo de saída de execução do código">
