
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
    return books.dict;
}
function SaveBooks()
{
    if(changed)
        return fs.writeFile('Books.json', JSON.stringify(books));
}


module.exports = {

    LoadBooks:LoadBooks,
    getBook: getBook,
    editBook: editBook,
    getBooks: getBooks,
    SaveBooks:SaveBooks
}



