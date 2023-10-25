const BOOTCAMS_URL = 'http://localhost:5000/api/v1/bootcamps';
const bootcampList = document.getElementById('bootcampList')!;
const lblTotal = document.getElementById('lblTotal')!;
const responseDiv = document.getElementById('response')!;

let currentPage: number = 1;
let rowsPerPage: number = 2;
let nextPage: number = currentPage;
let previusPage: number = currentPage;


function clearList(){
    
    const nodes = Array.from(bootcampList.childNodes);

        nodes.forEach((n) => { 
            bootcampList.removeChild(n);
        });

}


// Define una interfaz que describe la estructura de los datos de bootcamp
interface BootcampData {
    name: string;
    // Otros campos y tipos necesarios
  }

// Función para cargar la lista de bootcamps desde el servicio
async function fetchBootcamps(page: number) {
    try {
        const url = `${BOOTCAMS_URL}?limit=${rowsPerPage}&page=${page}`;
        console.log("URL:", url);

        const response = await fetch(url);
        clearList();

        if (response.ok) {
            const data = await response.json();
            console.log("Data received:", data);

            const pagination = data.pagination;
            nextPage = pagination.next?.page || currentPage;
            previusPage = pagination.prev?.page || currentPage;

            lblTotal.textContent = data.total;

            console.log(data.pagination)

            if (Array.isArray(data.data) && data.data.length > 0) {
                data.data.forEach((bootcamp: BootcampData) => {
                    const listItem = document.createElement('li');
                    listItem.textContent = bootcamp.name;
                    bootcampList.appendChild(listItem);
                });
            } else {
                bootcampList.textContent = 'No se encontraron bootcamps.';
            }
        } else {
            console.error('Error al cargar la lista de bootcamps:', response.status);
            bootcampList.textContent = 'Error al cargar la lista de bootcamps.';
        }
    } catch (error) {
        console.error('Error al cargar la lista de bootcamps:', error);
        bootcampList.textContent = 'Error al cargar la lista de bootcamps.';
    }
}



// Llamar a la función para cargar la lista de bootcamps
fetchBootcamps(currentPage);
const btnNext = document.getElementById('next')!;
btnNext.addEventListener('click', () => changeNextPage());

const btnPrev = document.getElementById('prev')!;
btnPrev.addEventListener('click', () => changePrevPage());
    

function changeNextPage() {
    if (currentPage < nextPage){
        clearList();    
        currentPage = nextPage;        
        fetchBootcamps(currentPage);       
    }
}

function changePrevPage() {    
    if (currentPage > previusPage){
        clearList();    
        currentPage = previusPage;        
        fetchBootcamps(currentPage);       
    }
    
}