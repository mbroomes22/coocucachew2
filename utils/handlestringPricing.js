const totalFromStringAndNum = (num, str) => {
  return num + parseInt(str.substring(1), 10)
}

module.export = {
  totalFromStringAndNum
}
