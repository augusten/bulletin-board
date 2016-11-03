var connectionString

let initialize = ( connectStr ) => {
	// A function named takes in a connection string 
	// as a parameter and saves it to a global variable connectionString
	connectionString = connectStr
	return connectionString
}

let getAll = (  ) => {
	
}

// A function named getAll that takes the name of a table as a parameter,
 // as well as a 'callback' parameter. The function should connect to the 
 // postgres database and get the contents of that table in an array. Invoke
 // the callback with the table contents.