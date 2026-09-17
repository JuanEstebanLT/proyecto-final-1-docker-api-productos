/*
 * ======================================================
 * ALMACENAMIENTO TEMPORAL DE PRODUCTOS
 * ======================================================
 * Este arreglo contiene los productos disponibles en la
 * API. Los datos se guardan únicamente en memoria, por lo
 * tanto, vuelven a su estado inicial al reiniciar la app.
 */
const productos = [
  {
    id: 1,
    nombre: 'Computador portátil',
    precio: 2500000,
    descripcion: 'Equipo para estudio y trabajo'
  },
  {
    id: 2,
    nombre: 'Mouse inalámbrico',
    precio: 80000,
    descripcion: 'Mouse ergonómico con conexión USB'
  },
  {
    id: 3,
    nombre: 'Teclado',
    precio: 120000,
    descripcion: 'Teclado en español con conexión USB'
  }
];

/*
 * Se exporta el arreglo para utilizarlo desde app.js.
 * CommonJS usa module.exports para compartir información
 * entre los archivos del proyecto.
 */
module.exports = productos;
