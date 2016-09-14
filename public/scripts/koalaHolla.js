console.log( 'js' );
var koalas=[];
$( document ).ready( function(){
  console.log( 'JQ' );
  // load existing koalas on page load
  getKoalas();

  // add koala button click
  $( '#addButton' ).on( 'click', function(){
    console.log( 'in addButton on click' );
    // get user input and put in an object
    var koalaName=$('#nameIn').val();
    var koalaAge=$('#ageIn').val();
    var koalaSex=$('#sexIn').val();
    var koalaTransfer=$('#readyForTransferIn').val();
    var koalaNotes=$('#notesIn').val();
    // using a test object
    var objectToSend = {
      name: koalaName,
      age: koalaAge,
      sex: koalaSex,
      readyForTransfer: koalaTransfer,
      notes: koalaNotes,
    };
    // call saveKoala with the new obejct
    saveKoala( objectToSend );
  }); //end addButton on click
}); // end doc ready

var getKoalas = function(){
  console.log( 'in getKoalas' );
  // ajax call to server to get koalas
  $.ajax({
    url: '/getKoalas',
    type: 'GET',
    success: function( data ){
      console.log( 'got some koalas: ', data );
      // display on DOM with buttons that allow edit of each
      //append array to list
      displayKoalas(data);
    } // end success
  }); //end ajax
  console.log('koalas array outside ajax: ',koalas);
} // end getKoalas

var saveKoala = function( newKoala ){
  console.log( 'in saveKoala', newKoala );
  // ajax call to server to get koalas
  $.ajax({
    url: '/addKoala',
    type: 'post',
    data: newKoala,
    success: function( data ){
      console.log( 'got some koalas: ', data );
      displayKoalas(data);
    } // end success
  }); //end ajax
}//end saveKoala

var displayKoalas = function(koalas){
  var viewKoalas = $('#viewKoalas');
  //empty viewKoalas
  viewKoalas.empty();
  //append array to list
  viewKoalas.append('<h2>All Koalas</h2>');
  //loop through data array
  for (var i = 0; i < koalas.length; i++) {
    viewKoalas.append('<p>' + koalas[i].name + ' ' + koalas[i].age + ' '
    + koalas[i].sex + ' ' + koalas[i].ready_for_transfer + ' ' +
    koalas[i].notes +  ' ' + '<button class="koalaEdit">Edit</button></p>');
  }//end for
};//end displayKoalas
