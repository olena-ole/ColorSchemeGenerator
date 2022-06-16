'use strict';

const form = document.getElementById('form');

function formatHex(str) {
    return str.slice(1);
}

function renderScheme(arr) {
    let schemeHtml = '';
    for (let color of arr) {
        schemeHtml += `
            <div>
                <div style="background: ${color.hex.value}" class="col"></div>
                <p>${color.hex.value}</p>
            </div>
        `;
    }
    document.getElementById('color-palette').innerHTML = schemeHtml;
}


form.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(form);
    const color = formatHex(formData.get('color-option'));
    const scheme = formData.get('scheme-mode');

    fetch(`https://www.thecolorapi.com/scheme?hex=${color}&mode=${scheme}`)
        .then(res => res.json())
        .then(data => {
            const colorsArr = data.colors;
            renderScheme(colorsArr);
        })
})