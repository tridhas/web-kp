function bulanan() {
    $("#table_body").empty();

var rootRef = firebase.database().ref().child("keuangan");
rootRef.on('value', gotData);

function gotData(data) {
        //console.log(data.val());
      var keuangan = data.val();
      console.log(blok);
      for (var i = 0; i < blok.length; i++) {
        var k = blok[i];
        var tanggal = keuangan[k].tanggal;
        var jenis = keuangan[k].jenis;
        var nominal = keuangan[k].nominal;
        var keterangan = keuangan[k].keterangan
        $("#table_body").append("<tr><td>" + tanggal + "</td><td>" + jenis + "</td><td>" + nominal + "</td><td>" + keterangan + "</td><td>" + saldo + "</td></tr>");
      }
    }
}