const urlParams = new URLSearchParams(window.location.search);
const items = urlParams.get('items');
const clientName = urlParams.get('clientName');
const today = new Date();
function formatDate(date) {
    let day = date.getDate().toString().padStart(2, '0');;
    let month = (date.getMonth() + 1).toString().padStart(2, '0');;
    let year = date.getFullYear();
    return `${month}/${day}/${year}`;
}

window.onload = async function() {
    let qoutationTable = document.getElementById('quotationTable');
    let totalTable = document.getElementById('totalTable');
    document.getElementById('clientName').innerText = clientName;
    document.getElementById('quotationDate').innerText = formatDate(today);
    document.getElementById('expirationDate').innerText = formatDate(new Date(today.setDate(today.getDate() + 30)));

    await fetch(
        'https://n8n.inteligencia.me/webhook/quotation', 
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(items)
        }
    ).then(
        response => response.json()
    ).then(
        data => {
            qoutationTable.outerHTML = data['qoutation table'];
            totalTable.outerHTML = data['total table'];
        }
    );

    document.getElementById("loading-screen").style.display = "none";
    document.getElementById("main-content").style.display = "block";
}
