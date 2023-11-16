function sortObject(obj) {
   const sorted = {};
   const str = [];
   let key;
   // eslint-disable-next-line no-restricted-syntax
   for (key in obj) {
      // eslint-disable-next-line no-prototype-builtins
      if (obj.hasOwnProperty(key)) {
         str.push(encodeURIComponent(key));
      }
   }
   str.sort();
   // eslint-disable-next-line no-plusplus
   for (key = 0; key < str.length; key++) {
      sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, '+');
   }
   return sorted;
}
export default sortObject