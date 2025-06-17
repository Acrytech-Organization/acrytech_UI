import *  as xlsx from "xlsx";
import { NO_DATA } from "../../../Helpers/ExtraProperties";
import { EMPTY, NA, STRING } from "../../../Helpers/ConstantProperties";

const SHHET_TO_JSON_OPT = {
    header: 1,
    blankrows: false,
    defval: NO_DATA
}

const getParsedData = (excelData, ignoreColumn, startHeaderIndex, changeTo) => {

    var excelDataObject = {
        Data: [],
        ExtraData: []
    }

    const getHeaders = (row) => {
        let headerObject = {}
        for (let i = 0; i < row.length; i++) {
            let value = row[i] ? row[i].trim() : false
            if (value !== NO_DATA && !ignoreColumn.includes(value)) {
                headerObject[i] = changeTo && changeTo[value] ? changeTo[value] : value;
            }
            //value !== NO_DATA that condition for removing the column with two col-span or more
        }
        return headerObject;
    }


    const getValue = (value, type) => {
        let correct = true;
        switch (type) {
            case STRING:
                if (value === undefined || value === NA || value === EMPTY) {
                    correct = false;
                    //here we are not checking the  NO_DATA because we want the property value to
                    //be NO_DATA if it is not present
                }
                break;
            default:
                break;
        }
        return correct ? true : false
    }

    excelData.map((row, index) => {
        if (!excelDataObject.Headers && startHeaderIndex === index) {
            excelDataObject.Headers = getHeaders(row)
        } else if (excelDataObject.Headers) {
            let ok = true
            let object = {}
            for (let i = 0; i < row.length; i++) {
                let value = row[i].toString().trim()
                let header = excelDataObject.Headers[i];
                if (header) {
                    ok = getValue(value, STRING)
                    if (ok) {
                        object[header] = value
                    } else {
                        object[header] = NO_DATA
                    }
                }
            }
            if (Object.keys(object).length !== 0) {
                excelDataObject.Data.push(object)
            }
        }
        return row;
    })

    return excelDataObject;
}

export async function parseXlsxFile(file, ignoreColumn, startHeaderIndex, changeTo) {
    const data = await file.arrayBuffer();
    const workbook = xlsx.read(data);
    var result = [];

    workbook.SheetNames.forEach((element) => {
        let sheet = workbook.Sheets[element];
        let excelData = xlsx.utils.sheet_to_json(sheet, SHHET_TO_JSON_OPT);
        result.push(getParsedData(excelData, ignoreColumn, startHeaderIndex, changeTo))
    });
    return result;
}