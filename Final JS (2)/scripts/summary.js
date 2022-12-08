$(document).ready(function () {

    // copy internet
    // source: https://stackoverflow.com/questions/8648892/how-to-convert-url-parameters-to-a-javascript-object
    // get data  from info
    const info = JSON.parse(localStorage.getItem('info')) || {}
    // get data  from shoppingCard
    const card = JSON.parse(localStorage.getItem('shoppingCard')) || []
    const render = $("#summary");

    // create form preview info
    let html = `
        <p>Name: ${info['name'] || ''}</p>
        <p>Address : ${info['address']}</p>
        <p>Age : ${info['age'] || ''}</p>
        <p>Date : ${info['date'] || ''}</p>
        <p>Total : ${info['total'] || ''}</p>
        <p>You picked the following items</p>`


    // add `<p>${item.amountItem} ${item.nameItem}</p>` 
    for (let i = 0; i < card.length; i++) {
        const item = card[i]

        html += `<p>${item.amountItem} ${item.nameItem}</p>`
    }
    // preview
    render.append(html)

})