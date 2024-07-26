// Importa o módulo axios para realizar requisições HTTP
const axios = require('axios');

// Importa o módulo csv-writer para escrever dados em um arquivo CSV
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

/**
 * Função assíncrona que consulta dados de um CEP usando a API Brasil Aberto.
 * 
 * @param {string} cep - O CEP a ser consultado.
 * @returns {Object|null} - Retorna um objeto com os dados do CEP se encontrado, ou null caso contrário.
 */
const consultaCep = async (cep) => {
  // Define a URL da API com o CEP fornecido
  const url = `https://api.brasilaberto.com/v1/zipcode/${cep}`;
  try {
    // Faz a requisição GET para a API
    const response = await axios.get(url);
    // Extrai os dados da resposta
    const dados = response.data;

    // Verifica se os dados contém o resultado esperado
    if (dados.result) {
      const result = dados.result;
      return {
        cep: result.zipcode || '',
        logradouro: result.street || '',
        complemento: result.complement || '',
        bairro: result.district || '',
        localidade: result.city || '',
        uf: result.stateShortname || '',
        ibge: result.ibgeId || '',
        gia: result.districtId || '',
        ddd: '', // Informações de DDD não fornecidas pela API
        siafi: '' // Informações de SIAFI não fornecidas pela API
      };
    } else {
      // Loga uma mensagem no console se o CEP não for encontrado
      console.log(`CEP ${cep} não encontrado na API.`);
      return null;
    }
  } catch (error) {
    // Verifica se o erro foi um 404, indicando que o CEP não foi encontrado
    if (error.response && error.response.status === 404) {
      console.log(`CEP ${cep} não encontrado na API.`);
    } else {
      // Loga outros erros no console
      console.log(`Erro ao consultar o CEP ${cep}: ${error.message}`);
    }
    return null;
  }
};

/**
 * Gera uma lista de CEPs em um intervalo específico.
 * 
 * @returns {string[]} - Retorna uma lista de CEPs formatados como strings.
 */
const gerarListaCeps = () => {
  const ceps = [];
  // Define o intervalo de CEPs a serem gerados
  for (let i = 88115117; i <= 89000000; i++) {
    // Formata o CEP como uma string de 8 dígitos, preenchendo com zeros à esquerda se necessário
    ceps.push(i.toString().padStart(8, '0'));
  }
  return ceps;
};

/**
 * Função assíncrona que consulta uma lista de CEPs e salva os dados em um arquivo CSV.
 * 
 * @param {string} nomeArquivo - O nome do arquivo CSV a ser criado.
 */
const salvarCepsEmCsv = async (nomeArquivo) => {
  // Gera a lista de CEPs para consulta
  const ceps = gerarListaCeps();

  // Cria um escritor de CSV com o cabeçalho definido
  const csvWriter = createCsvWriter({
    path: nomeArquivo,
    header: [
      {id: 'cep', title: 'CEP'},
      {id: 'logradouro', title: 'Logradouro'},
      {id: 'complemento', title: 'Complemento'},
      {id: 'bairro', title: 'Bairro'},
      {id: 'localidade', title: 'Localidade'},
      {id: 'uf', title: 'UF'},
      {id: 'ibge', title: 'IBGE'},
      {id: 'gia', title: 'GIA'},
      {id: 'ddd', title: 'DDD'},
      {id: 'siafi', title: 'SIAFI'}
    ]
  });

  // Array para armazenar os registros a serem salvos no CSV
  const records = [];

  // Loop através de cada CEP gerado
  for (const cep of ceps) {
    // Consulta os dados do CEP usando a função `consultaCep`
    const dadosCep = await consultaCep(cep);

    if (dadosCep) {
      // Adiciona os dados do CEP à lista de registros se encontrado
      records.push(dadosCep);
      console.log(`Dados do CEP ${cep} salvos.`);
    } else {
      console.log(`Dados do CEP ${cep} não encontrados.`);
    }
  }

  // Escreve os registros no arquivo CSV
  csvWriter.writeRecords(records)
    .then(() => console.log('Arquivo CSV criado com sucesso.'));
};

// Chama a função para iniciar o processo de salvar os dados em um CSV
salvarCepsEmCsv('ceps.csv');
