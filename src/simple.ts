const num1Input = document.getElementById('num1')! as HTMLInputElement;
const num2Input = document.getElementById('num2')! as HTMLInputElement;
const resultDiv = document.getElementById('result') !;

// Obtén el botón por su ID
const addButton = document.getElementById('addButton') !;

// Función para sumar dos números y mostrar el resultado
function addNumbers(num1: number, num2: number) {
    
    if (!isNaN(num1) && !isNaN(num2)) {
        const sum = num1 + num2;
        resultDiv.textContent = `La suma es: ${sum}`;
    } else {
        resultDiv.textContent = 'Ingresa números válidos.';
    }
}

// Agrega un controlador de evento al botón para llamar a la función de suma al hacer clic
addButton.addEventListener('click', (event) => {
    addNumbers(+num1Input.value, +num2Input.value)
    console.log(event.pageX, '|', event.pageY)
});


function combine(p1: number | string, p2: number | string) {
    let result;

    if (typeof p1 === 'number' && typeof p2 === 'number') {
        result = p1 + p2
    } else {
        result = p1.toString() + p2.toString()
    }

    return result
}

console.log("initialized!!")

console.log('combine -> ', combine(30, '56') )
console.log('combine -> ', combine(30, 56) )
console.log('combine -> ', combine('30', '56') )


const p = new Promise((resolve) => {
   resolve("ok") ;
});


p.then((str) => console.log(str));

