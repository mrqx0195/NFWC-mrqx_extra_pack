// priority: 999
/**
 * @param {number} value 
 * @returns {Internal.MoneyValue}
 */
function ConvertMainMoneyValue(value) {
    return $CoinValue.fromNumber('main', value)
}