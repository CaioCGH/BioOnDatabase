import mongoose from "mongoose";

const title = new mongoose.Schema({
  name: String,
  abbreviation: String,
});

const Title = mongoose.model("Title", title);

const affiliation = new mongoose.Schema({
  name: String,
  abbreviation: String,
});

const Affiliation = mongoose.model("Affiliation", affiliation);

const observer = new mongoose.Schema({
  'nome': String,
  'sigla': String,
  'título': String,
  'vínculo': String,
});
const Observer = mongoose.model("Observer", observer);

const observation = new mongoose.Schema({
  'Nome Científico': String,
  'Nome Comum': String,
  'Localidade': String,
  'Data': String,
  'Registro Original': String,
  'Observadores': [String]
});
const Observation = mongoose.model("Observation", observation);


const district = new mongoose.Schema({
  name: String,
  acronym: String
});

const District = mongoose.model("District", district);


const Locality = mongoose.model(
  "Locality",
  new mongoose.Schema({
    'Nome Banco de Dados': String,
    'Nome Completo': String,
    'Tipologia': String,
    'Situação': String,
    'Endereço': String,
    'Distrito': String,
    'Região': String,
    'UTM E': String,
    'UTM Y': String,
    'Área (m2)': String,
    'Esforço Amostral Avifauna (dias de campo)': String,
    'Esforço Amostral Avifauna (Horas acumuladas - HH:MM:SS)': String,
    'Observação': String,
    'Corpo Hídrico': String,
    'Tipo de Corpo Hídrico (L: Lago, T: Tanque/Espelho d´água, C: Córrego, N: Nascente, R: Represa)': String,
    'Categoria de Vegetação (PMMA, 2016)': String,
    'Nº Espécies Vasculares': String,
    'Nº Espécies Nativas (PMSP)': String,
    'Nº Espécies Exóticas Invasoras (total 28)': String,
    'Tipos Representativos de Vegetação': String,
    'Presença de Espécies Campestres de Cerrado': String,
    'Componente Arbóreo-Arbustivo': String,
    'Componente Herbáceo': String,
    'Componente Epifítico': String,
    'Amostragem de todos os Componentes (Sim/Não)': String,
    'Origem dos Dados (Fonte: DPHM, 2019)': String,
    'Observações Registradas': [observation],
  })
);

export { Locality, Observation, Observer, Title, District, Affiliation, observation };
