Welcone to toys store.

lust of functiuns that ypu can apliied in this Db

*Show all prods:
"http://localhost:3000/toys"

*show data filter by category:
"http://localhost:3000/toys/cat/{please write full namr of category}"

*Add prod:
"http://localhost:3000/toys/add"
using postman or anyother app that can do this-you can add prod -notice that all fields arr required.

*Edit prod:
"http://localhost:3000/toys/edit"
here u need to add Id in order to edit the prods u want to edit,notice that all fields arr required.

*delete prod:
"http://localhost:3000/toys/del"
delete by id-u can enter more fields but id is enough.

*search prods with string:
"http://localhost:3000/toys/search/?q={enter here your string}"
search in name and category or your info

*show prods within range of price(min&max)
"http://localhost:3000/toys/prices/?min={number}&&max={number}"
check several things:
1.if one of the inputs isn't a number the system will desplay a massage of it.
2.if min is under 0 the same massage will be shown.


