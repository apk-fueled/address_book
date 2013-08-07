function submit(tabname) {
	var name = document.getElementById("name").value;
	var address = document.getElementById("address").value;

	if(name === "" || address === "") {
		alert('Name and/or Address field(s) can not be empty');
		return;
	}

	var db = openDatabase('mydb', '1.0', 'my first database', 2 * 1024 * 1024);
	db.transaction(function (tx) {
	  tx.executeSql('CREATE TABLE IF NOT EXISTS addrBook (name text, address text)');
	  tx.executeSql('INSERT INTO addrBook (name, address) VALUES (?, ?)',[name,address]);
	});

	updateBook();
	//sessionStorage.setItem(name,address);
	//addRow(tabname,name,address);
}

function deleteEntry() {
	var name = document.getElementById("deleteName").value;
	
	if(name === "") {
		alert('Enter name to be deleted');
		return;
	}

	var db = openDatabase('mydb', '1.0', 'my first database', 2 * 1024 * 1024);
	db.transaction(function (tx) {
	  tx.executeSql('CREATE TABLE IF NOT EXISTS addrBook (name text, address text)');
	  tx.executeSql('DELETE FROM addrBook WHERE name = ?',[name]);
	});

	updateBook();

}

function updateBook() {
	var res = "<table><tr><th>Name</th><th>Address</th></tr>";
	var db = openDatabase('mydb', '1.0', 'my first database', 2 * 1024 * 1024);
	db.transaction(function (tx) {
		console.log("transaction");

	  tx.executeSql('SELECT * FROM addrBook',[], function (tx,results) {
		var len = results.rows.length;
				console.log("length"+len);

		for(var i=0; i< len; i++) {
			var name = results.rows.item(i).name;
			var address = results.rows.item(i).address;
			//alert(name+"  "+address);
			res += "<tr> <td>"+name+"</td><td>"+address+"</td></tr>";
			

		}  
	res += "</table>";	 
	log(res);
	var render = document.getElementById("list");
	render.innerHTML = res;
	log("hi"+render.innerHTML);
	  });
	});
}

function error(msg) {
	alert(msg+' entry not found');
}

function addRow(tabname,name,address) {
	
	var table = document.getElementById(tabname);

	var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);
	
	var cell1 = row.insertCell(0);
	cell1.innerHTML = name;

	var cell2 = row.insertCell(1);
	cell2.innerHTML = address;

	/*
	for(var i=0; i< sessionStorage.length; i++) {
		var key = sessionStorage.key(i);
		var val = sessionStorage.getItem(key);

		var row = table.insertRow(i);

		var cell1 = row.insertCell(0);
		cell1.innerHTML = key;

		var cell1 = row.insertCell(1);
		cell1.innerHTML = val;
	}
	*/

	
}
function searchEntry(tabname) {
	
	var name = document.getElementById("searchName").value;
	
	if(name === "") {
		alert('Enter name to be searched');
		return;
	}
	var res = "<table><tr><th>Name</th><th>Address</th></tr>";
	var db = openDatabase('mydb', '1.0', 'my first database', 2 * 1024 * 1024);
	db.transaction(function (tx) {
		console.log('search here');
	  tx.executeSql('SELECT * FROM addrBook where name = ?',[name], function (tx,results) {
		var len = results.rows.length;
				console.log("length"+len);

		for(var i=0; i< len; i++) {
			var name = results.rows.item(i).name;
			var address = results.rows.item(i).address;
			//alert(name+"  "+address);
			res += "<tr> <td>"+name+"</td><td>"+address+"</td></tr>";
		}  
		res += "</table>";	 
		log(res);
		var render = document.getElementById("searchList");
		render.innerHTML = res;
		log("hi"+render.innerHTML);
	  });
	});
	
}

function sortBook() {
	var string="";
	if(document.getElementById("sortByName").checked) {
		string = "name";
	}
	else if(document.getElementById("sortByAddr").checked) {
		string = "address"
	}
	log('sort by '+string);

	if(string != "") {
		var res = "<table><tr><th>Name</th><th>Address</th></tr>";
		var db = openDatabase('mydb', '1.0', 'my first database', 2 * 1024 * 1024);
		//alert(db);
		db.transaction(function (tx) {
			//alert('gg');
			tx.executeSql('SELECT * FROM addrBook ORDER BY '+ string,[],function (tx,results) {
				var len = results.rows.length;
				//alert('here '+len);

				for(var i=0; i< len; i++) {
					var name = results.rows.item(i).name;
					var address = results.rows.item(i).address;
					//alert(name+"  "+address);
					res += "<tr> <td>"+name+"</td><td>"+address+"</td></tr>";
				}
				res += "</table>";	 
				var render = document.getElementById("list");
				render.innerHTML = res;
				log("table after sorting"+res);	
			});
		});
		

	}
	else {
		alert('select sorting paramenter');
	}

	
}

//utility function
	function log(str){
		console.log(str);
}

/*
function delete(tabname) {
	alert('here');
	var name = document.getElementById("deleteName").value;
	
	if(name === "") {
		alert('Enter name to be deleted');
		return;
	}
	try {
	var table = document.getElementById(tabname);
	            var rowCount = table.rows.length;
	 
	            for(var i=0; i<rowCount; i++) {
	                var row = table.rows[i];
	                var chkbox = row.cells[0].childNodes[0];
	                if(null != chkbox && true == chkbox.checked) {
	                    table.deleteRow(i);
	                    rowCount--;
	                    i--;
	                }
				}
	}
	catch(e) {

	}
}
*/