<p> Consulta informações de CEP (Código de Endereçamento Postal) de uma API e salva os dados em um arquivo CSV. O código usa as bibliotecas axios para realizar requisições HTTP e csv-writer para criar o arquivo CSV.</p>
<h3><strong>Visão Geral do Código</strong></h3>
<p>O código é dividido em várias partes principais:</p>
<ol>
  <li>
    <p><strong>Dependências e Importações:</strong></p>
    <ul>
      <li>Importa axios para fazer requisições HTTP.</li>
      <li>Importa createObjectCsvWriter da biblioteca csv-writer para manipular arquivos CSV.</li>
    </ul>
  </li>
  <li>
    <p><strong>Função consultaCep:</strong></p>
    <ul>
      <li>Faz uma requisição para uma API externa usando um CEP.</li>
      <li>Retorna os dados do CEP se encontrados ou null caso contrário.</li>
    </ul>
  </li>
  <li>
    <p><strong>Função gerarListaCeps:</strong></p>
    <ul>
      <li>Gera uma lista de CEPs dentro de um intervalo especificado.</li>
    </ul>
  </li>
  <li>
    <p><strong>Função salvarCepsEmCsv:</strong></p>
    <ul>
      <li>Consulta os CEPs gerados.</li>
      <li>Salva os dados retornados pela API em um arquivo CSV.</li>
    </ul>
  </li>
</ol>
<h3><strong>Descrição das Funções</strong></h3>
<ol>
  <li>
    <p><strong>consultaCep:</strong></p>
    <ul>
      <li><strong>Parâmetro:</strong>
        <ul>
          <li>cep (string): CEP a ser consultado na API.</li>
        </ul>
      </li>
      <li><strong>Descrição:</strong>
        <ul>
          <li>Constrói a URL de requisição usando o CEP fornecido.</li>
          <li>Realiza uma requisição HTTP GET para a API usando axios.</li>
          <li>Se a API retornar dados válidos, eles são processados e retornados como um objeto contendo as informações do endereço.</li>
          <li>Se o CEP não for encontrado ou se houver um erro na requisição, a função loga uma mensagem de erro e retorna null.</li>
        </ul>
      </li>
    </ul>
  </li>
  <li>
    <p><strong>gerarListaCeps:</strong></p>
    <ul>
      <li><strong>Descrição:</strong>
        <ul>
          <li>Gera uma lista de CEPs dentro do intervalo de 88115117 a 89000000.</li>
          <li>Cada CEP é formatado como uma string de 8 dígitos com zeros à esquerda, se necessário.</li>
        </ul>
      </li>
    </ul>
  </li>
  <li>
    <p><strong>salvarCepsEmCsv:</strong></p>
    <ul>
      <li><strong>Parâmetro:</strong>
        <ul>
          <li>nomeArquivo (string): Nome do arquivo CSV onde os dados serão salvos.</li>
        </ul>
      </li>
      <li><strong>Descrição:</strong>
        <ul>
          <li>Gera a lista de CEPs usando gerarListaCeps.</li>
          <li>Para cada CEP, consulta os dados usando consultaCep.</li>
          <li>Armazena os dados em uma lista de registros se o CEP for encontrado.</li>
          <li>Usa csv-writer para escrever os registros no arquivo CSV especificado.</li>
        </ul>
      </li>
    </ul>
  </li>
</ol>
<h3><strong>Como Usar o Código</strong></h3>
<ol>
  <li>
    <p><strong>Pré-requisitos:</strong></p>
    <ul>
      <li>Certifique-se de ter o Node.js instalado em seu sistema.</li>
      <li>Instale as dependências necessárias executando:
        <pre>
npm install axios csv-writer          </pre>
      </li>
    </ul>
  </li>
  <li><strong>Execução:</strong>
    <ul>
      <li>Salve o código em um arquivo, por exemplo, app.js.</li>
      <li>Execute o arquivo usando o Node.js:<br>
        <br>
      node app.js<br>
      <br>
      </li>
      <li>
        <ul>
          <li>O programa irá gerar um arquivo ceps.csv com as informações de CEP consultadas.</li>
        </ul>
      </li>
    </ul>
    <h3><strong>Observações</strong></h3>
    <ul>
      <li>
        <p><strong>Limitações de API:</strong></p>
        <ul>
          <li>Certifique-se de verificar as limitações de uso da API https://api.brasilaberto.com/v1/zipcode/ para evitar bloqueios ou custos inesperados devido a requisições excessivas.</li>
        </ul>
      </li>
      <li>
        <p><strong>Performance:</strong></p>
        <ul>
          <li>O intervalo de CEPs é bastante grande, o que pode resultar em um tempo de execução prolongado. Considere otimizar o intervalo ou a forma de consulta se necessário.</li>
        </ul>
      </li>
      <li>
        <p><strong>Manutenção:</strong></p>
        <ul>
          <li>Atualize o código caso a estrutura de dados da API mude ou se novas informações forem necessárias.</li>
        </ul>
      </li>
    </ul>
    <p>Com essa documentação, o código fica mais claro e compreensível, facilitando a manutenção e a utilização por outros desenvolvedores.</p>
    <ul>
      <li>        <br>
        <br>
        <br>
      </li>
    </ul>
  </li>
</ol>
