const { rejects } = require('assert');
const { get } = require('http');
const { resolve } = require('path');

const fs = require('fs').promises;

books = {};
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
function getBook(id){
    return books.dict[id];
}
function getBooks()
{
    return books.dict;
}
function SaveBooks()
{
    return fs.writeFile('Books.json', JSON.stringify(books));
}


module.exports = {

    LoadBooks:LoadBooks,
    getBook: getBook,
    getBooks: getBooks,
    SaveBooks:SaveBooks
}



