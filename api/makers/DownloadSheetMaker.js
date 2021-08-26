const ExcelJS = require('exceljs');
const { flattenObject, flattenSpecies} = require('./utils');

exports.makeSheet =  async (response, selectedArray, speciesList) =>{
    let workbook = new ExcelJS.Workbook();
    let worksheet = workbook.addWorksheet("inventário");
    var fileName = 'relatorio.xls';

    columns = [];
    for(var i = 0; i < selectedArray.length; i++){
      columns.push(
        { header: selectedArray[i], key: selectedArray[i], width: (selectedArray[i].length + 5 )})
    }
    worksheet.columns = columns;
    var headerRow = worksheet.getRow(1);
    headerRow.fill = {
      type: 'pattern',
      pattern:'darkTrellis',
      fgColor:{argb:'FFFFFF00'},
      bgColor:{argb:'FF0000FF'}
    };
    for(var i = 0; i < speciesList.length; i++){
      var flatO = flattenSpecies(speciesList[i].toJSON());
    //   throw 'erm...'
      worksheet.addRow(flatO);
    }
    response.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    response.setHeader("Content-Disposition", "attachment; filename=" + fileName);
    await workbook.xlsx.write(response);
    response.end();
}