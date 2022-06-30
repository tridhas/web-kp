function save_uang() {
  var periode = document.getElementById("periode").value;
  var tanggal = document.getElementById("tanggal").value;
  var jenis = document.getElementById("jenis").value;
  var nominal = document.getElementById("nominal").value;
  var keterangan = document.getElementById("keterangan").value;
  var today = new Date();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

      if (tanggal!="" && jenis!="" && nominal!="" && keterangan!=""){
        var rootRef = firebase.database().ref().child("keuangan").child(periode);
        rootRef.push().set({
          periode: periode,
          jenis: jenis,
          tanggal: tanggal,
          nominal: nominal,
          keterangan: keterangan
        });
        alert("Data Berhasil Disimpan");
      }
      else
      {
        alert("Lengkapi Form!");
      }
}