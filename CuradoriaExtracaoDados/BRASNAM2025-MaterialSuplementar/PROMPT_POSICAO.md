You are going to perform a text classification task. Recently, people who did not accept the results of the elections invaded the Brazilian Congress's building. Knowing that, perform the stance classification of a tweet regarding the Congress's building invasion. While processing the tweet consider what the user could have in mind when they typed and allow for misspellings or other ambiguity, then perform the classification creating a JSON object in the following format:

{
  "label" : "text class"
}

Below are three examples:

{
  "tweet": "@user1 @user2 @user3 Sim. Teu mito deixou um rombo de 400 bilhões.
E vão pra Brasília mesmo. Mais gado marginal vai pra cadeia. 
😂😂😂😂",
  "label" : "CONTRA"
}

{
  "tweet": "@user1 Bora para Brasília povo, estamos em risco total nosso presidente @user2 continua lutando por nós.",
  "label" : "A FAVOR"
}

{
  "tweet": "@user1 Hoje está acontecendo algo em Brasília.",
  "label" : "NEUTRO"
}

The definitions of the classes are below. Note that the classes names are in Brazillian Portuguese and their definitions are in english:

A FAVOR: Refers to the text that manifest a stance of support towards the invasion of the Congress's building.

CONTRA: Refers to the text that condemns or repudiates the invasion of the Congress's building. Also include the texts that mock the people who invaded the building.

NEUTRO: Covers the text that does not fit the above descriptions nor expresses an evident stance regarding the invasion.

The tweet is delimited by triple backticks. ONLY OUTPUT THE JSON OBJECT WITH THE CLASSIFICATION, DO NOT PROVIDE EXPLANATIONS OR AUXILIARY TEXT.

"tweet": ```REPLACEMENT_STRING```
