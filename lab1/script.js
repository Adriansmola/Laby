const btnPrzelicz = document.querySelector('#przelicz');
const wynikiPojemnik = document.querySelector('#wyniki');
const liczba1 = document.querySelector('#liczba1');
const liczba2 = document.querySelector('#liczba2');
const liczba3 = document.querySelector('#liczba3');
const liczba4 = document.querySelector('#liczba4');

function calculateAndDisplayResults() {
    const value1 = parseFloat(liczba1.value) || 0;
    const value2 = parseFloat(liczba2.value) || 0;
    const value3 = parseFloat(liczba3.value) || 0;
    const value4 = parseFloat(liczba4.value) || 0;

    const suma = value1 + value2 + value3 + value4;
    const srednia = suma / 4;
    const minimum = Math.min(value1, value2, value3, value4);
    const maksimum = Math.max(value1, value2, value3, value4);

    wynikiPojemnik.innerHTML = `
        Suma: ${suma}<br>
        Średnia: ${srednia}<br>
        Minimum: ${minimum}<br>
        Maksimum: ${maksimum}
    `;
}
btnPrzelicz.addEventListener('click', calculateAndDisplayResults);

liczba1.addEventListener('input', calculateAndDisplayResults);
liczba2.addEventListener('input', calculateAndDisplayResults);
liczba3.addEventListener('input', calculateAndDisplayResults);
liczba4.addEventListener('input', calculateAndDisplayResults);
