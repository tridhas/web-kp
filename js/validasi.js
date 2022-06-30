var rootRef = firebase.database().ref().child("bukti_pembayaran");
rootRef.on('value', gotData);

function gotData(data) {
        //console.log(data.val());
      var bp = data.val();
      var blok = Object.keys(bp);
      console.log(blok);
      for (var i = 0; i < blok.length; i++) {
        var k = blok[i];
        var imageUrl = bp[k].imageUrl;
        var nomor = bp[k].blok;
        var periode = bp[k].periode;
        var btlihat = "<input type = 'button' id ='"+ imageUrl +"' value = 'Lihat Bukti' onClick = 'tes(this.id)'></input>";      
        var name = bp[k].name;
        var tagihan = bp[k].tagihan;
        dtbp(nomor, btlihat, periode, name, tagihan);
     }          
}

function dtbp(nomor, btlihat, periode, name, tagihan) {
    var rootRef1 = firebase.database().ref().child("data_pelanggan");
    rootRef1.on('value', gotData1);

    function gotData1(data1) {
        var dt = data1.val();
        var blok1 = Object.keys(dt);
        console.log(blok1);
        for (var i = 0; i< blok1.length; i++) {
            var k1 = blok1[i];
            var status = dt[k1].status;
            var nomor1 = dt[k1].blok;
            
            if (nomor1 == nomor) {
                if (status == "Belum") {
                    var btaksi = "<input type = 'button' id ='"+ nomor +"' value = 'Validasi' onClick = 'tes2(this.id)'></input>";
                }
                else {
                    var btaksi = "";
                }
                $("#table_body").append("<tr><td>" + nomor + "</td><td>" + name + "</td><td>" + tagihan + "</td><td>" + btlihat + "</td><td>" + periode + "</td><td>" + btaksi + "</td></tr>");
            }
        }
    }
}

function tes(click_id) {
    window.open(click_id, "Bukti Pembayaran", "width=640, height=480");
}

function tes2(click_id) {
    var answer = window.confirm("Save data?")
    if (answer==true){
            $("#table_body").empty();
            var blok = click_id;
            console.log(blok);
            var rootRef = firebase.database().ref().child("data_pelanggan");
            rootRef.once('value').then(function(snapshot) {
                var status =  "Sudah";
                var totalbiaya = "0";
                rootRef.child(blok).child("status").set(status);
                rootRef.child(blok).child("totalbiaya").set(totalbiaya);
                var periode = snapshot.child(blok).child("periodeterakhir").val();
                getper(periode, blok);
            });        
    }
    else {

    }
}

function getper(periode, blok) {
    console.log(periode, blok);
    var rootRef2 = firebase.database().ref().child("data_tagihan");
            rootRef2.once('value').then(function(snapshot) {
                var mawal = snapshot.child(periode).child(blok).child("mawal").val();
                var makhir = snapshot.child(periode).child(blok).child("makhir").val();
                var totaltagihan = snapshot.child(periode).child(blok).child("total_tagihan").val();
                console.log(mawal,makhir,totaltagihan);
                
                var rootRef3 = firebase.database().ref().child("data_transaksi");
                rootRef3.child(blok).child(periode).child("mawal").set(mawal);
                rootRef3.child(blok).child(periode).child("makhir").set(makhir);
                rootRef3.child(blok).child(periode).child("total_tagihan").set(totaltagihan);
                rootRef3.child(blok).child(periode).child("blok").set(blok);
                rootRef3.child(blok).child(periode).child("periode").set(periode);

                var rootRef4 = firebase.database().ref().child("data_pembayaran");
                rootRef4.child(periode).child(blok).child("mawal").set(mawal);
                rootRef4.child(periode).child(blok).child("makhir").set(makhir);
                rootRef4.child(periode).child(blok).child("total_tagihan").set(totaltagihan);
                rootRef4.child(periode).child(blok).child("blok").set(blok);
                rootRef4.child(periode).child(blok).child("periode").set(periode);

                alert("Data berhasil divalidasi!");
            });
}