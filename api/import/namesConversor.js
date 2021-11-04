import fs from 'fs';

const convert = () => {
var s = [
    "Centro de Apoio aos Protetores e Animais",
"Instituto Chico Mendes de Conservação da Biodiversidade/ Centro Nacional de Pesquisa e Conservação de Mamíferos Carnívoros ",
"Secretaria de Infraestratura e Meio Ambiente do Estado de São Paulo/ Centro de Recuperação de Animais Silvestres do Parque Ecológico do Tietê",
"Secretaria do Verde e Meio Ambiente/Divisão da Fauna Silvestre",
"Secretaria do Verde e Meio Ambiente/Divisão de Gestão de Parques Urbanos",
"Secretaria do Verde e Meio Ambiente/Divisão de Gestão de Unidades de Conservação",
"SISFAUNA: Sistema de Informação da Fauna Silvestre da Prefeitura de São Paulo. Animais cadastrados que deram entrada na Divisão da Fauna Silvestre para atendimento",
"Alice Soares de Oliveira, MSc. ",
"Anelisa Ferreira de A. Magalhães, Drª",
"Brígida Gomes Fries, MSc. ",
"Edna Maria Gomes Cavalcante, Biólª",
"Eric Thal B. Cordeiro da Silva, Méd. Vet.",
"Gisele Regina Ruy, Biólª",
"Guilherme Mileo Garcia Festa, Biól.",
"Juliana Laurito Summa, Biólª",
"Juliana Medeiros Russo, Biólª",
"Leila Weiss de Almeida Pedrosa, Biólª",
"Leticia Bolian Zimback, MSc.",
"Marcello Schiavo Nard, MSc.",
"Marcos Kawall de Vasconcellos, Méd. Vet.",
"Marcos Rodrigo Abrahams Costa, Méd. Vet.",
"Ricardo Gandara Crede, MSc.",
"Sonia Maria Amorim Gimenez, Biólª",
"Sylvia Maria Matsuda, Drª",
"Thais Caroline Sanches, MSc.",
"Tiago Emanuel B. Fonseca Ostorero, Biól.",
"Ticiana Dias Zwarg, MSc.",
"Vanessa Caldeira Olivares, Méd. Vet.",
"Amanda Aparecida C. Coimbra, MSc. ",
"Ana Maria Brischi, MSc. ",
"Ângela Maria Branco Espuny, Drª",
"Antonieta Rosa Bauab, Méd. Vet. ",
"Clara Miti Izumizawa, MSc.",
"Dafne do Vale D. A. Neves, Méd. Vet.",
"Daniel Martins, Biól. ",
"Elisabeth Bertoletti Gonçalves, Biólª",
"Erica Cristina de Souza Blanco, Biólª",
"Frances White Rossi, Méd. Vet. ",
"Gérsio Garbin, Méd. Vet. ",
"Hilda Cintra Franco, Méd. Vet.",
"Hiroe Ogata, MSc.",
"Lilian Dias Orico",
"Linda Lacerda da Silva, Drª",
"Luciana M. Rodrigues Guerra, Méd. Vet.",
"Lucila Maria Castro de Toledo, Méd. Vet.",
"Marcos Antonio Melo, MSc.",
"Marcos Antonio Rizzo, Méd. Vet.",
"Maria Amélia Santos de Carvalho, MSc.",
"Maria Eugênia Laurito Summa, Méd. Vet.",
"Maria Marcina Picelli Vicentim, Drª",
"Patrícia Adalgisa Gobitti Alves, Biólª",
"Regina Cristina Stroebel, Méd. Vet.",
"Roberta Marcatti de Azevedo, Méd. Vet.",
"Rosane Guimarães Romano, Méd. Vet.",
"Rosanna G. Quagliuolo Benesi, MSc.",
"Silvana Schirmer, Biólª",
"Sumiko Namba, Biólª",
"Teresa de Lourdes Cavalheiro, Biólª",
"Vera Maria Rolim de Oliveira, Méd. Vet.",
"Vilma Clarice Geraldi, Méd. Vet.",
"Vincent Kurt Lo, Biól.",
"Adriana Akemi Kuniy, Biólª",
"Adriana Luchini, Biólª ",
"Adriana Ruckert da Gama, Drª",
"Alex Barbosa Magalhães",
"André Luiz Lamanna, Biól. ",
"André Vicente Montero",
"Andreia Rodrigues de C. Pitta Lima, Biólª ",
"Bruna Oliveira ",
"Camilla Amorim ",
"Carolina Farhat, Biólª",
"Cauê Mourão Alleman, Biól. ",
"Cristina Laskowski, Biólª ",
"Daniel Fernandes Perrela, MSc.",
"Daniel Rocha, Biól. ",
"Danilo Silva Cardoso ",
"Débora Cristina de Oliveira Silva, Biólª",
"Eunice Oliveira Stramaro",
"Fabiana Cardoso de Oliveira, Biólª",
"Fábio Luiz Vasconcelos, Biól. ",
"Fabio Ricardo de Souza Romano, Biól.",
"Fábio Schunck, Biól. ",
"Felipe do Amaral Arantes, Biól. ",
"Felipe Ignácio Jacinto, Biól.",
"Fernando Igor de Godoy P. da Silva, Biól.",
"Flávia Regina Arantes Ferreira, Biólª",
"Gabriela Rodrigues França, Biólª",
"Giovanna Viana Cruz",
"Giovanni Balaton Pupin, Biól.",
"Gustavo Henrique Kruschewsky Miller",
"Igor Carlos Dias",
"Julia Milan",
"Kathleen Lessandra da Silva, Biólª",
"Katterine Gouveia, Biólª",
"Kelly Caroline Soares Pereira, Biólª",
"Kleber Evangelista Rodrigues, Biól.",
"Laura Segovia Tercic",
"Léo Ramos Malagoli, MSc.",
"Leticia Cristine Pressi Nunes, Biólª",
"Liliam Misso, Méd. Vet.",
"Lílian Rose Marques de Sá, Méd. Vet.",
"Luciana Cozzani, Bióla",
"Luiza de Freitas Relvas",
"Marc A. D. S. Petroff",
"Marcelo Alves Coppi, Biól. ",
"Marco Aurélio Galvão Silva, Biól.",
"Marcos Vinícius Gonçalves da Silva",
"Marcus Azevedo, Biól.",
"Marina Somenzari, MSc.",
"Matheus Augusto Maciel Bernardo",
"Matheus Mayer Tsutsu",
"Melissa de Camargo Aguiar, Engª Amb. ",
"Pedro Alexandre de Brito Souza",
"Pedro Henrique de Freitas Costa",
"Priscila Ferreira Martins dos Santos, Biólª",
"Priscilla Romano, Biólª",
"Rafael Eufrásio Leite Júnior, Biól.",
"Ramiro de Souza Fidalgo, Biol.",
"Rauflin Lincoln D. P. C. Júnior, Biol. ",
"Renata Maria Amodeo Mourão, Biólª",
"Ricardo Rodrigues Neves Pennino, Biól.",
"Rodrigo Alves E. Giovanetti, Biól.",
"Rogério Rosa de Oliveira",
"Rudá Feliciano Araújo, Biólª",
"Samanta de la Bella, Biól.",
"Soraya Pieroni, Biólª",
"Sostenes Pelegrini, Biól.",
"Stephanie Santos Simioni",
"Tatiana Fantin Furlan, Biólª",
"Ualas Marques Melo",
"Vanessa Valentim da Costa Souza, Biólª",
"Vinícius Secco e Silva, Biól.",
"Adriana Rocha Moni",
"Aguinandes de Souza Pires",
"Aleckessandre Luciano",
"Alex Borges Gonzaga",
"Amanda Roschel Fernandes",
"Ana Carolina C. Minucci",
"André Pereira dos Santos ",
"Ângela Rodrigues Alves",
"Camila Tatiana Pin Garcia",
"Claudionor Rodrigues Santana",
"Cyra Malta O. da Costa",
"Debora Cardoso de Oliveira",
"Deborah Maria Monnerat Pinto",
"Delcio Francisco Góes",
"Edson Francisco Seabra",
"Eduardo Andrade Santos, Biól. ",
"Eduardo Dallastella Camargo",
"Elias da Silva Couto ",
"Emy Yoshimoto ",
"Erika Gartner Hopfgartner",
"Fabio Bertassi, Biól.",
"Fabio Mendonça Tondi ",
"Francisco Adrião Neves da Silva",
"Franer Ferreira Matos",
"Gabriel de Jesus Mercedes",
"Gabriella Uehlneyer",
"Graça Maria Pinto Ferreira, Biólª",
"Guilherme Brandão do Amaral, Eng. Agr.",
"Gustavo da Cruz Talon",
"Gustavo de Carvalho Figuerôa",
"Ieda Januário Varejão",
"João do Espírito Santo Neto",
"João Pedro Martins Rego",
"João Póvoa",
"Job José da Silva",
"Joel Pereira Menezes",
"José Carlos de Oliveira Júnior",
"José Ulisses Bezerra de França",
"Judite Amorim",
"Larissa Ferreira da Veiga",
"Lia Góes de Moura",
"Luccas Longo, Biól. ",
"Luciana Paiva, Biólª",
"Manuel Alcântara Machado Filho",
"Marcela Cozatti",
"Marcelo Freire Mendonça",
"Marcio Amaral Yamamoto",
"Marco Otávio de Matos Junior",
"Mariete Flávia Moreira da Silva, Biólª",
"Marília Fanucchi Ferraz, MSc.",
"Marlon Cordeiro Ribeiro",
"Miriam Martos Sodré, Biólª",
"Necira Maria dos S. Harmani, Méd. Vet.",
"Nina May Olsen",
"Pâmella Simões Tavares",
"Paulo Ricardo de Jesus",
"Raquel Ferreira de Almeida Vettore",
"Renan Alibertti",
"Rennan H. P. Dias da Silva",
"Ricardo José Francischetti Garcia, Dr.",
"Ricardo Paulon",
"Roseli Allemann",
"Roseneide Leal de Miranda",
"Santos Reis Ineno Filho, Téc.",
"Sara Hamed",
"Sergio Luis Marçon",
"Sidnei Ferreira",
"Vagner Silva Coelho ",
"Valkiria Rigonotti",
"Vera Lucia de Crudis Rodrigues",
"Vinícius de Souza Almeida, Gestor Ambiental.",
"William Martins",
"Carlos Felipe P. da Silveira, Biól.",
"Gustavo Feliciano Alexandre",
"Iris Amati Martins, MSc.",
"José Luis Birindelli, Dr.",
"Karlla Barbosa, MSc.",
"Kitaro Suenaga Jardineiro, Biól.",
"Luciano Moreira Lima, MSc.",
"Luis Fernando de A. Figueiredo, Méd.",
"Luiz Eloy Pereira, Dr.",
"Rute Maria Gonçalves de Andrade",
"Ana Claudia Roso",
"Angela Oliveira",
"Augusto Severino Nogueira",
"Bruno Francheschi Troiano",
"Camila Dionysio",
"Camila Souza Gil",
"Caroline Camargo",
"Claudia Oliveira",
"Cláudio André Nucitelli, Biól.",
"Dario Sanches",
"Deise Berkeras",
"Douglas Takao Miyata",
"Edna Helfstein",
"Edson Aparecido da Silva",
"Edson Endrigo, Fotóg.",
"Elaine Salles do Carmo",
"Elisa Focante",
"Erivelton Pereira Soares",
"Fábio Bentivoglio Pereira",
"Fabrizio Montini",
"Fernando Rodrigues Salvio",
"Francisco Queiroz Gordinho",
"Guilherme Almeida Sanchez",
"Guilherme da Silva Lopes",
"Gustavo de Mattos Accácio, Dr.",
"Josefa Soares da Silva",
"Lucas Ramos de Medeiros",
"Luciana Grayce do Nascimento",
"Luciani Duma de Jesus, Biólª",
"Luis Antonio Bochetti Bassetti, Méd.Vet.",
"Luiz Sanfilippo",
"Maria José Magalhães Castro Helfstein",
"Matheus de Moraes dos Santos",
"Miguel Magro",
"Paula Andréa Borges Salgado, Biólª",
"Paulo Fernandes Roberto",
"Paulo Serafim",
"Philip Guimarães Roda",
"Priscila Leal Costa, Biólª",
"Raul Aparecido Rosquinha Helfstein Luz",
"Renato Machado de Sobral",
"Rogério Pereira de Oliveira",
"Rosemar Oliveira de Almeida Ferreira",
"Samir Reis",
"Valder S. do Nascimento",
"Vinícius Santos Ferarezi, BIól.",
"Weslley Pereira Soares",
"Zildete Marques de Oliveira Souza",
]
var finalString = '';
console.log(finalString);
for(let i = 0; i < s.length; i++){
    if(!s[i].includes(',')){
        s[i] = s[i] + ','
    }
    finalString = finalString + s[i] + '\n';
    console.log(finalString);
}

    fs.writeFile("names_output.txt", finalString, function (err) {
        if (err) return console.log(err);
        console.log('Pront');
    });
}
convert();