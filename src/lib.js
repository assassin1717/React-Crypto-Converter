export function prepareCoinsList(data) {
    let newData = []
    for (let i = 0; i < data.length; i++) {
        let obj = {
            key: i,
            text: data[i].toUpperCase(),
            value: i
        }
        newData.push(obj)
    }
    return newData
}

export function prepareExchangesList(data) {
    let newData = []
    for (let i = 0; i < data.length; i++) {
        let obj = {
            key: i,
            text: data[i]['name'],
            value: i
        }
        newData.push(obj)
    }
    return newData
}

function getCryptoIdFromList(cryptos, curr) {
    return cryptos.find(x => x.symbol === curr) !== undefined ?
        curr.toUpperCase() :
        0
}

export function formatCryptosList(cryptos, availCurrs) {
    let newCryptoArray = []
    availCurrs.forEach(item => {
        let coin = getCryptoIdFromList(cryptos, item)
        if (coin !== 0) {
            newCryptoArray.push(coin)
        }
    })
    return newCryptoArray
}