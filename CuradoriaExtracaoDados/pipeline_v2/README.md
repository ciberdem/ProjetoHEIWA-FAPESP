# Pipeline de Limpeza de Dados v2

Este repositório contém um pipeline de limpeza de dados em Python, desenvolvido para pré-processar conjuntos de dados textuais. O pipeline foi desenvolvido para limpeza de dados advindos de redes sociais. Entretanto, ele pode ser utilizado para várias bases de dados textuais. O pipeline utiliza diversas bibliotecas, ferramentas e técnicas para garantir a qualidade e a consistência dos dados. Abaixo estão detalhadas as etapas e as funcionalidades principais do pipeline.

<img src="https://github.com/ciberdem/ProjetoHEIWA-FAPESP/blob/main/CuradoriaExtracaoDados/pipeline_v2/assets/Pipeline_diagrama.png" alt="Diagrama do pipeline de limpeza">


# Conteúdo

- [Como Utilizar](#como-utilizar)
  - [Dependências](dependencias)
    - [Instalação das Dependências](instalação-de-dependências)
  - [Executando o Pipeline](executando-o-pipeline)
    - [Exemplo de Uso](exemplo-de-uso)
- [Funcionalidades](#funcionalidades)
  - [Parâmetros para Ativar/Desativar Etapas](parâmetros-para-ativar/desativar-etapas)
- [Funções do Pipeline](funções-do-peipeline)
- [Estrutura de Saída](estrutura-de-saída)
- [Detalhes do Pré-processamento de Texto](#detalhes-do-pré-processamento-de-texto)

# Como Utilizar

## Dependências
Antes de executar o pipeline, certifique-se de ter as seguintes bibliotecas instaladas:

- pandas : https://pandas.pydata.org/
- demoji : https://pypi.org/project/demoji/
- enelvo : https://github.com/thalesbertaglia/enelvo
- unidecode : https://pypi.org/project/Unidecode/

### Instalação das Dependências

Para instalar todas as dependências, utilize o arquivo requirements.txt. Com o arquivo pronto, basta executar o comando:

```python
pip install -r /path/to/requirements.txt
```

## Executando o Pipeline

- **Arquivo de entrada**: O pipeline aceita arquivos nos formatos `.csv` ou `.json`. O caminho do arquivo de entrada e o nome da coluna que contém o texto a ser processado devem ser fornecidos.
- **Processamento**: O pipeline pode ser executado por meio da função pipeline. Ela carrega o arquivo, aplica o pré-processamento e exporta o resultado.

- **OBS**: Todas as etapas de pré-processamento são **opcionais** e podem ser ativadas ou desativadas conforme necessário ao chamar a função `pipeline`. Cada etapa é controlada por um parâmetro booleano (`True` para ativar e `False` para desativar). 


### Exemplo de Uso

```python
from pipeline import pipeline

# Aplicando o pipeline em um arquivo CSV, processando a 
# coluna 'texto' com saída no formato json
pipeline('dados.csv', 'texto', formato='json')
```



# Funcionalidades

O pré-processamento de texto desempenha um papel crucial na qualidade e na consistência dos dados. No pipeline fornecido, várias etapas são realizadas para garantir que o texto de entrada seja limpo e adequado para análises subsequentes, como:

- Substituição de emojis por rótulos sentimentais.
- Remoção de menções a usuários (@usuario).
- Remoção de URLs.
- Normalização Enelvo
- Conversão de caracteres especiais para ASCII.
- Remoção de pontuações e caracteres especiais

Para desativar etapas específicas, basta definir o parâmetro desejado como `False` ao chamar a função `pipeline`. Por exemplo, para desativar a normalização e a remoção de URLs:

```python
from pipeline import pipeline

# Executa o pipeline sem normalizar o texto e sem remover URLs
pipeline('dados.csv', 'texto', formato='json', normalizar=False, remover_urls=False)
```

### Parâmetros para Ativar/Desativar Etapas

- `normalizar` (padrão: `True`): Aplica a normalização ao texto para padronizar variações informais utilizando ferramenta enelvo.
- `substituir_emojis` (padrão: `True`): Substitui emojis por rótulos sentimentais.
- `substituir_users` (padrão: `True`): Remove menções a usuários (exemplo: @usuario).
- `remover_urls` (padrão: `True`): Remove URLs do texto.
- `converter_ascii` (padrão: `True`): Converte caracteres especiais para ASCII.
- `remover_pontuacao` (padrão: `True`): Remove pontuações não associadas a números.







# Funções do Pipeline
## 1. `substitui_emoji(text)`
Substitui os emojis por rótulos sentimentais (emojipositivo, emojinegativo, emojineutro) ou descrições Unicode.

**Parâmetros**:
`text (str)`: Texto no qual os emojis serão substituídos.

**Retorno**:
Texto com emojis substituídos.

```python
def substitui_emoji(text):
    """
    Substitui emojis em um texto por rótulos de sentimento ou descrições de emojis.

    Parâmetros:
    text (str): O texto no qual os emojis serão substituídos.

    Retorna:
    str: O texto com os emojis substituídos por rótulos de sentimentos ou descrições Unicode.
    """
     
    for emoji, label in emoji_list.items():
        text = text.replace(emoji, label)
    dem = demoji.findall(text)
    for item, value in dem.items():
        text = text.replace(item, f" {value.replace(' ', '')}")
    return text
```



## 2. `preprocess(texto, normalizar=True, substituir_emojis=True, ...)`
Aplica o pipeline de pré-processamento ao texto com diversas etapas opcionais, como normalização, remoção de URLs e emojis.

**Parâmetros**:

- `texto (pd.Series)`: Série Pandas contendo os textos a serem processados.
- `normalizar (bool)`: Substitui vírgulas temporariamente e normaliza o texto com a ferramenta enelvo.
- `substituir_emojis (bool)`: Substitui emojis por rótulos sentimentais.
- `substituir_users (bool)`: Remove menções a usuários.
- `remover_urls (bool)`: Remove URLs do texto.
- `converter_ascii (bool)`: Converte caracteres especiais para ASCII.
- `remover_pontuacao (bool)`: Remove pontuações não associadas a números.

**Retorno**:
Série Pandas com o texto pré-processado.

```python
def preprocess(texto, normalizar=True, substituir_emojis=True, substituir_users=True, remover_urls=True, converter_ascii=True, remover_pontuacao=True):
    """
    Aplica o pipeline de pré-processamento ao texto fornecido.

    Parâmetros:
    texto (pd.Series): Uma série pandas contendo os textos a serem processados.
    normalizar (bool): Substitui vírgulas temporariamente e normaliza o texto usando o enelvo. Padrão: True.
    substituir_emojis (bool): Substitui emojis por rótulos de sentimentos. Padrão: True.
    substituir_users (bool): Remove menções a usuários no formato @usuario. Padrão: True.
    remover_urls (bool): Remove URLs do texto. Padrão: True.
    converter_ascii (bool): Converte caracteres especiais para ASCII. Padrão: True.
    remover_pontuacao (bool): Remove pontuações desnecessárias. Padrão: True.

    Retorna:
    pd.Series: Uma série pandas com o texto pré-processado.
    """

    # Substituindo vírgulas por "chavevirg"
    if normalizar:
        texto = texto.str.replace(r',', 'chavevirg')

    # Normalizando texto (enelvo)
    if normalizar:
        texto = texto.apply(lambda x: normalizador.normalise(x))

    # Substituindo emojis
    if substituir_emojis:
        texto = texto.apply(substitui_emoji)

    # Substituindo users
    if substituir_users:
        texto = texto.str.replace(r'@\w+', '')

    # Removendo URLs
    if remover_urls:
        texto = texto.apply(lambda x: re.sub(r'http\S+', '', x))

    # Revertendo substituição de vírgulas
    if normalizar:
        texto = texto.str.replace(r'chavevirg', ',')

    # Convertendo para ASCII
    if converter_ascii:
        texto = texto.apply(lambda x: unidecode(x))

    # Removendo vírgulas não associadas a números e outras pontuações
    if remover_pontuacao:
        texto = texto.apply(lambda x: re.sub(r'(?<!\d),(?=\D)|(?<=\D),(?!\d)|(?<!\d),(?=\d)|(?<!\d)\/|\/(?!\d)|_|[^\w#\/\s,\@]','', x))

    return texto
```



## 3. `pipeline_export(df, coluna, formato='json', **kwargs)`
Aplica o pré-processamento em uma coluna de um DataFrame e exporta os dados processados.

**Parâmetros**:

- `df (pd.DataFrame)`: DataFrame original contendo os textos.
- `coluna (str)`: Nome da coluna que será processada.
- `formato (str)`: Formato de exportação (json ou csv).
- `**kwargs`: Parâmetros opcionais para as etapas de pré-processamento.

**Retorno**:

DataFrame original com uma nova coluna `texto_preprocessado`.


```python
def pipeline_export(df, coluna, formato='json', **kwargs):
    """
    Aplica o pré-processamento em uma coluna do DataFrame e exporta o DataFrame modificado.

    Parâmetros:
    df (pd.DataFrame): O DataFrame original contendo os dados.
    coluna (str): Nome da coluna que será processada.
    formato (str): Formato de exportação dos dados ('json' ou 'csv'). Padrão: 'json'.
    **kwargs: Parâmetros opcionais para as etapas do pré-processamento.

    Retorna:
    pd.DataFrame: O DataFrame original com uma nova coluna chamada 'texto_preprocessado'.
    """

    df['texto_preprocessado'] = preprocess(df[coluna], **kwargs)

    # Exportar para o formato escolhido
    if formato == 'json':
        df.to_json('saida_preprocessada.json', orient='records', lines=True, force_ascii=False)
    elif formato == 'csv':
        df.to_csv('saida_preprocessada.csv', index=False)
    else:
        print(f"Formato {formato} não é suportado.")
    
    return df  # Retorna o DataFrame original com a nova coluna
```

## 4. `pipeline(caminho_arquivo, coluna, formato='csv', **kwargs)` 
Função principal que aplica o pipeline ao arquivo fornecido e exporta o resultado.

**Parâmetros**:

- `caminho_arquivo (str)`: Caminho do arquivo a ser processado (.csv ou .json).
- `coluna (str)`: Nome da coluna a ser processada.
- `formato (str)`: Formato de exportação (csv ou json).
- `**kwargs`: Parâmetros opcionais para as etapas de pré-processamento.

**Retorno**:

Exibe o DataFrame modificado após o processamento e exportação.

```python
def pipeline(caminho_arquivo, coluna, formato='csv', **kwargs):
    """
    Função principal que aplica o pipeline de pré-processamento ao arquivo fornecido.

    Parâmetros:
    caminho_arquivo (str): Caminho para o arquivo a ser processado (.csv ou .json).
    coluna (str): Nome da coluna que será processada no DataFrame.
    formato (str): Formato de exportação dos dados ('json' ou 'csv'). Padrão: 'csv'.
    **kwargs: Parâmetros opcionais para as etapas do pré-processamento.

    Retorna:
    None: Exibe o DataFrame modificado após o processamento e exportação.
    """

    # Verificar a extensão do arquivo para carregar o DataFrame corretamente
    if caminho_arquivo.endswith('.csv'):
        df = pd.read_csv(caminho_arquivo)
    elif caminho_arquivo.endswith('.json'):
        df = pd.read_json(caminho_arquivo, lines=True)
    else:
        raise ValueError("Formato de arquivo não suportado. Use um arquivo .csv ou .json")
    
    # Aplicar o pipeline e exportar
    df_modificado = pipeline_export(df, coluna, formato, **kwargs)
    
    # Exibir o DataFrame modificado
    print(df_modificado)
```


# Estrutura de Saída
O pipeline cria uma nova coluna chamada texto_preprocessado no DataFrame original e exporta o resultado em um dos seguintes formatos:

- `JSON`
- `CSV`

Para escolher o formato de saída, utilize o parâmetro `formato` ao chamar a função `pipeline` ou `pipeline_export`. Defina `formato='json'` para exportar como JSON ou `formato='csv'` para CSV.

```python
from pipeline import pipeline

# Executa o pipeline e exporta o resultado em formato CSV
pipeline('dados.csv', 'texto', formato='csv')
```

# Detalhes do Pré-processamento de Texto
## 1. Substituição de Vírgulas
Nesta etapa, todas as vírgulas no texto são temporariamente substituídas por "chavevirg". Isso é feito para contornar a ferramenta Enelvo, que separa números com vírgula durante a normalização. A substituição temporária facilita a manutenção da integridade dos dados numéricos e é revertida posteriormente.

```python
texto = texto.str.replace(r',', 'chavevirg')
```

## 2. Normalização Enelvo
O próximo passo é a utilização da biblioteca Enelvo, que envolve a normalização de erros ortográficos, gírias da internet, siglas, nomes próprios e outros.

```python
texto = texto.apply(lambda x: normalizador.normalise(x))
```
### Exemplo:
**Entrada**: ['testeee', 'ururguau', 'disculpa qq coisa!', "Vc eh muitooooo legal", "Oii, To trabahlando hj"]

**Saídas**: ['teste', 'uruguai', 'desculpa qualquer coisa', 'você é muito legal', 'oii to trabalhando hoje']

## 3. Substituição de Emojis
Neste passo, o código realiza a substituição de emojis por rótulos específicos. Uma lista de emojis e seus rótulos correspondentes é definida no emoji_list. Emojis encontrados no texto são substituídos por esses rótulos para uniformizar a representação de emojis. Também utilizamos a biblioteca demoji para substituir emojis por rótulos. 

```python
texto = texto.apply(substitui_emoji)
```

### Exemplo:
**Entrada**: ['😀', '😋', ':)', ':(', '🤢', "😺", "🎂"]

**Saídas**: ['grinningface', 'facesavoringfood', 'emojipositivo', 'emojinegativo', 'nauseatedface', 'grinningcat', 'birthdaycake']

## 4. Remoção de Usuários
O código realiza a remoção de menções a usuários no formato @usuário.

```python
texto = texto.str.replace(r'@\w+', '')
```

## 5. Remoção de URLs
Qualquer URL presente no texto é removida usando uma expressão regular que identifica padrões de URLs, começando com "http://" ou "https://".

```python
texto = texto.apply(lambda x: re.sub(r'http\S+', '', x))
```

## 6. Reversão da Substituição de Vírgulas
Após a remoção de URLs, o código reverterá a substituição anterior de vírgulas por 'chavevirg', restaurando-as ao seu estado original.

```python
texto = texto.str.replace(r'chavevirg', ',')
```

## 7. Conversão para ASCII
Converte caracteres especiais para ASCII.

```python
texto = texto.apply(lambda x: unidecode(x))
```

## 8. Remoção de Pontuações e Caracteres Especiais
Este passo envolve a remoção de pontuações e caracteres especiais do texto, exceto quando esses caracteres são parte de hashtags, datas ou números com vírgulas. Isso é feito usando uma expressão regular que mantém esses padrões específicos.

```python
texto = texto.apply(lambda x: re.sub(r'(?<!\d),(?=\D)|(?<=\D),(?!\d)|(?<!\d),(?=\d)|(?<!\d)\/|\/(?!\d)|_|[^\w#\/\s,\@]','', x))
```

# Testes

<img src="https://github.com/ciberdem/ProjetoHEIWA-FAPESP/blob/main/CuradoriaExtracaoDados/pipeline_v2/assets/ex_teste_plv2.png" alt="Exemplo de saída de execução do código">
