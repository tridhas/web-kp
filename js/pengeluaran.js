function pengeluaran() {
    $("#table_body").empty();
  
      var rekap = document.getElementById('rekap').value;
      var rootRef = firebase.database().ref().child("keuangan").child(rekap);
      rootRef.on('value', gotData)
      function gotData(data) {
        var datpem = data.val();
        var blok = Object.keys(datpem);
        var saldo = 0;
        console.log(blok);
        for (var i = 0; i < blok.length; i++) {
          var k = blok[i];
          var tanggal = datpem[k].tanggal;
          var jenis = datpem[k].jenis;
          if (jenis=="pemasukan") {
            var pemasukan = datpem[k].nominal;
            var pengeluaran = "0";
          }
          else{
            var pemasukan = "0";
            var pengeluaran = datpem[k].nominal;
          }
          var keterangan = datpem[k].keterangan;
          var npemasukan = parseInt(pemasukan);
          var npengeluaran = parseInt(pengeluaran);
          saldo = (saldo + npemasukan - pengeluaran);
  
          $("#table_body").append("<tr><td>" + tanggal + "</td><td>" + pengeluaran + "</td><td>" + keterangan + "</td><td>" + saldo + "</td></tr>");
      }
    }
  }