/* Milestone 1
Definire un array di oggetti; ogni oggetto rappresenta un gatto, che è caratterizzato da: nome, età, colore e sesso.
Tramite la funzione .forEach(), stampare in pagina tutti i gattini, ciascuno con il proprio colore e il proprio nome.

Milestone 2
Dividere i gatti in due contenitori distinti in base al sesso e aggiungere a fianco di ogni gattino un fiocco colorato di rosa, se femmina, o di blu, se maschio. Il colore del fiocco deve essere più tenue se il gatto è più giovane, più scuro se il gatto è più vecchio.

Milestone 3
Creare un nuovo array con prima tutti i gattini femmina e poi tutti i gattini maschio, inserendo solamente nome e colore e colore e opacità del fiocco per ogni gatto. */

$(function(){

  // creo array di oggetti; ogni oggetto è un gatto
  // ogni gatto ha proprietà name, age, color, gender
  const arrCats = [
    {
      name: 'Mario',
      age: 2,
      color: '#FF1D1E',
      gender: 'male'
    },
    {
      name: 'Minù',
      age: 6,
      color: '#391D1E',
      gender: 'female'
    },
    {
      name: 'Venanzio',
      age: 4,
      color: '#FFFFFF',
      gender: 'male'
    },
    {
      name: 'Miglior Gatto',
      age: 3,
      color: '#2DA9BA',
      gender: 'female'
    },
    {
      name: 'Rufus',
      age: 9,
      color: '#69003A',
      gender: 'male'
    }
  ];

  // con la funzione .forEach() ciclo sull'array arrCats
  // e per ogni elemento oggetto cat lo stampo a schermo
  // tramite la funzione printList()
  arrCats.forEach((cat) => {
    $('#mile-1').append(printList(cat.name, cat.color));
  }); //end arrCats.forEach()

  // mappando l'arrCats creo un nuovo array con gli oggetti
  // gatto ai quali però viene aggiunta la proprietà ribbon.
  // i gatti maschi avranno il ribbon azzurro, le femmine rosa
  const arrNewCats = arrCats.map((cat) => {
    const opacity = cat.age / 10;
    const pink = '#FFC0CB';
    const cyan = '#00FFFF';
    let color = (cat.gender === 'female') ? pink : cyan;
    return {
      ...cat,
      ribbon: {
        color,
        opacity
      }
    }
  }); //end arrCats.map()
  
  // filtro l'array arrNewCats dividendo i gatti in base 
  // al sesso e creando due array di conseguenza
  const arrCatsFemale = arrNewCats.filter((cat) => cat.gender === 'female');
  const arrCatsMale = arrNewCats.filter((cat) => cat.gender === 'male');

  // con un ciclo sui nuovi array stampo a video i gatti
  // maschi e femmine nelle sezioni html a loro dedicate
  arrCatsFemale.forEach((cat) => {
    $('#mile-2-female').append(printList(cat.name, cat.color, cat.ribbon.color, cat.ribbon.opacity));
  }) //end arrCatsFemale.forEach()

  arrCatsMale.forEach((cat) => {
    $('#mile-2-male').append(printList(cat.name, cat.color, cat.ribbon.color, cat.ribbon.opacity));
  }) //end arrCatsMale.forEach()

  // creo un nuovo array concatenando i due array arrCatsFemale e arrCatsMale
  const arrCatsOrdered = [...arrCatsFemale, ...arrCatsMale];

  // creo un array arrCatsTotal mappando arrCatsOrdered e nel
  // mentre, dopo aver destrutturato l'oggetto stampo a video 
  // gli oggetti gatto in ordine: prima femmine poi maschi
  const arrCatsTotal = arrCatsOrdered.map((cat) => {
    const {name, color, ribbon} = cat;

    $('#mile-3').append(printList(name, color, ribbon.color, ribbon.opacity));

    return {
      name,
      color,
      ribbon
    };
  }); //end arrCatsOrdered.map()

}); //end document ready

/* FUNCTIONS */

// creo una funzione utility per stampare a schermo un
// elemento di lista con valori passati dall'utente.
// in seguito aggiorno la funzione perché possa rivecere
// altri parametri con l'operatore rest; in questo caso
// inerenti al ribbon. Nel caso l'array degli argomenti eventuali
// contenga elementi, viene aggiunto una porzione all'html
// per rappresentare a schermo il ribbon con le sue proprietà
function printList(name, color, ...ribbon) {
  let ribbonMsg = '';
  if (ribbon.length > 0) {
    ribbonMsg = 
    `
      <i class="fas fa-ribbon" style="color: ${ribbon[0]}; opacity: ${ribbon[1]};"></i>
    `;
  }
  let html = 
  `
    <li>
      <i class="fas fa-cat" style="color: ${color}"></i>
      ${ribbonMsg}
      <span>${name}</span>
    </li>
  `;

  return html;
}