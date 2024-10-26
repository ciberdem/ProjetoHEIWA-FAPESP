import re
import demoji
import pandas as pd
from enelvo import normaliser
from unidecode import unidecode

# Configuração do normalizador e emojis
emoji_list = {':))': 'emojipositivo', ':)': 'emojipositivo', ':d': 'emojipositivo', ':p': 'emojipositivo',
              ':(': 'emojinegativo', ':((': 'emojinegativo', '8)': 'emojineutro'}
normalizador = normaliser.Normaliser(tokenizer='readable')

# Função para substituir emojis
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

# Função de pré-processamento principal com etapas opcionais (ativadas por padrão)
def preprocess(texto, normalizar=True, substituir_emojis=True, substituir_users=True, remover_urls=True, converter_ascii=True, remover_pontuacao=True):
    """
    Aplica o pipeline de pré-processamento ao texto fornecido.

    Parâmetros:
    texto (pd.Series): Uma série pandas contendo os textos a serem processados.
    normalizar (bool): Normaliza o texto usando o enelvo. Padrão: True.
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

# Função para exportar o DataFrame original com uma coluna do texto pré-processado
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

# Função principal que recebe o caminho do arquivo e aplica o pipeline
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
