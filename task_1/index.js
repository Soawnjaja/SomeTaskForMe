import {encoded, translations} from './data.js'

const excludedFields = ['groupId', 'service', 'formatSize', 'ca'];

function decodeFields(encoded, translations, excludedFields) {
 return encoded.map(item => {
    const decodedItem = {};
    for (const key in item) {
      if (item.hasOwnProperty(key) && !excludedFields.includes(key)) {
        const decodedValue = translations[item[key]];
        decodedItem[key] = decodedValue !== undefined ? decodedValue : item[key];
      } else {
        decodedItem[key] = item[key];
      }
    }
    return decodedItem;
 });
}


function extractUniqueIds(encoded, translations) {
 const uniqueIds = new Set();
 encoded.forEach(item => {
    for (const key in item) {
      if (item.hasOwnProperty(key) && key.endsWith('Id') && item[key] !== null) {
        uniqueIds.add(item[key]);
      }
    }
 });
 return Array.from(uniqueIds);
}
// Методы получения декодированных данных и уникальных айди я разделил, что бы в дальнейшем можно было использовать получение уникальных айди или декодированный список.
const decoded = decodeFields(encoded, translations, excludedFields);
// В задаче описано, что бы выделить все уникальные айди, предположил, что нужно показать все айди, которые встречаются хотя бы 1 раз.
const uniqueIds = extractUniqueIds(encoded, translations);


