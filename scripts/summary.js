$(document).ready(function () {

    // copy internet
    // source: https://stackoverflow.com/questions/8648892/how-to-convert-url-parameters-to-a-javascript-object
    const info = JSON.parse(localStorage.getItem('info')) || {}
    const render = $("#summary");
    const card = JSON.parse(localStorage.getItem('shoppingCard')) || []
    let html = `
        <p>Name: ${info['name'] || ''}</p>
        <p>Address : ${info['address']}</p>
        <p>Age : ${info['age'] || ''}</p>
        <p>Date : ${info['date'] || ''}</p>
        <p>Total : ${info['total'] || ''}</p>
        <p>You picked the following items</p>`
    if (card.length) {
        for (let i = 0; i < card.length; i++) {
            const item = card[i]

            html += `<p>${item.amountItem} ${item.nameItem}</p>`
        }
    }
    render.append(html)

})