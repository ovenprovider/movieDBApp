/* 
Function to convert a number into an array for each whole digit and the last element to be a decimal or whole digit
Example: numberToConvert = 2.4 numberOfElementsReturned = 5
Returns: [1, 1, 0.4, 0, 0]
Purpose: Used to determine the number of stars to fill in and what ratio they need to be filled in
*/
export const convertNumberToArray = (
  numberToConvert: number,
  numberOFElementsReturned: number,
  numberOfDecimalPlaces = 2
) => {
  const arrayOfNumbers = []
  let newNumberToConvert = numberToConvert

  for (let i = 1; i <= numberOFElementsReturned; i++) {
    if (newNumberToConvert < 0) {
      arrayOfNumbers.push(0)
      newNumberToConvert--
      continue
    }

    if (newNumberToConvert < 1 && newNumberToConvert > 0) {
      arrayOfNumbers.push(Number.parseFloat(newNumberToConvert.toFixed(numberOfDecimalPlaces)))
      newNumberToConvert--
      continue
    }
    arrayOfNumbers.push(1)
    newNumberToConvert--
  }

  return arrayOfNumbers
}
