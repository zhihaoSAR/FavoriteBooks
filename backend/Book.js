const { resolve } = require('path');

const fs = require('fs').promises;

books = {};
var changed = false;
function LoadBooks()
{
    return fs.readFile('Books.json').then(
        function(data)
        {
            return new Promise( (resolve) =>
            {
                books = JSON.parse(data)
                resolve(books);
            } )
        }
    );
}
function editBook(id,title,description){
    aux = books.dict[id]
    aux.title = title
    aux.description = description
    changed = true
}
function getBook(id){
    return books.dict[id];
}
function getBooks()
{
    return books.dict
}
function SaveBooks()
{
    if(changed)
    {
        return fs.writeFile('Books.json', JSON.stringify(books)).then(()=>
        {
            return new Promise((resolve) =>{
                changed = false;
                resolve();
            })
        
        });
    }
       
}


module.exports = {

    LoadBooks:LoadBooks, //cargar libros de local
    getBook: getBook, //buscar un libro param: id_del_libro, devolver un objeto libro con id,title,description
    editBook: editBook, // editar un libro  param: id_del_libro,titulo,descripción
    getBooks: getBooks, // obtener todos los libros guardado en un array
    SaveBooks:SaveBooks // guardar los datos en local
}



