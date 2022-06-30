var rootRef = firebase.database().ref().child("data_pelanggan");
var nomorr;
rootRef.on('value', gotData);

function gotData(data) {
        //console.log(data.val());
      var datapelanggan = data.val();
      var blok = Object.keys(datapelanggan);
      console.log(blok);
      for (var i = 0; i < blok.length; i++) {
        var k = blok[i];
        var name = datapelanggan[k].name;
        var nomor = datapelanggan[k].blok;
        var detail = "<input type = 'button' id ='"+ nomor +"' value = 'Lihat Detail' onClick = 'tes(this.id)'></input>";
        var update = "<input type = 'button' id ='"+ nomor +"' value = 'Update' onClick = 'update(this.id)'></input>";      
        $("#table_body").append("<tr><td>" + nomor + "</td><td>" + name + "</td><td>" + detail + "</td><td>" + update + "</td></tr>");
      }
}

function update(click_id) {
    $("#table_body2").empty();
    var rootRef3 = firebase.database().ref().child("data_pelanggan");
    rootRef3.on('value', gotData2);

    function gotData2(data2) {
        var dt = data2.val();
        var blok1 = Object.keys(dt);
        console.log(blok1);
        for (var i = 0; i< blok1.length; i++) {
            
            var k = blok1[i];
            var nomor = dt[k].blok;
            var mawal = dt[k].makhir;
            var periodeterakhir = dt[k].periodeterakhir;
            var nama = dt[k].name;
            var upd = "<input type = 'button' style='background-color: blue;' value='UPDATE' id='" + nomor +"' class='login100-form-btn' onclick='upd(this.id)'/>";


            if (nomor == click_id) {
                $("#table_body2").empty();
                $("#upd").empty();
                $("#table_body2").append("<tr><td>" + nomor + "</td><td>" + nama + "</td><td>" + periodeterakhir + "</td><td>" + mawal + "</td></tr>");
                document.getElementById("totm").style.display="block";
                document.getElementById("periodeupd").style.display="block";
                document.getElementById("kembali1").style.display="block";
                tab3 = document.getElementById("tab3");
                $("#upd").append("<br>" + upd + "</br>");
                if (tab3.style.display=="none") {
                    tab3.style.display="block";
                    tab1.style.display="none";
                }
            }
        }
    }
}

function upd(click_id) {
    $("#table_body2").empty();
    $("#upd").empty();
    var updmeter = document.getElementById("totm").value;
    var updperiode = document.getElementById("periodeupd").value;
    if (updmeter != "" && updperiode != ""){
        var answer = window.confirm("Save data?");
        if (answer==true){
            var rootRef = firebase.database().ref().child("biaya_sekarang");
            rootRef.once('value').then(function(snapshot) {
                var pot = snapshot.child("pot").val();
                var badmin = snapshot.child("badmin").val();
                var tarifkub = snapshot.child("tarifkub").val();
                simpandata(click_id, pot, badmin, tarifkub, updmeter, updperiode);
            });       
        }
    }
    else {
        alert("Form tidak boleh kosong!");
    }
}

function simpandata(click_id, pot, badmin, tarifkub, updmeter, updperiode) {
    $("#table_body2").empty();
    $("#upd").empty();
    var rootRef = firebase.database().ref().child("data_pelanggan");
        rootRef.once('value').then(function(snapshot) {
                var status =  "Belum";
                var mawal = snapshot.child(click_id).child("makhir").val();
                var name = snapshot.child(click_id).child("name").val();

                var nupdmeter = parseInt(updmeter);
                var ntarifkub = parseInt(tarifkub);
                var nbadmin = parseInt(badmin);
                var npot = parseInt(pot);

                var nmawal = parseInt(mawal);
                var totm = nupdmeter - nmawal;
                var totalm = totm.toString();
                
                var npot = ((((totm * ntarifkub) + nbadmin) * npot) / 100);
                var pot1 = npot.toString();

                var ntagihan = ((totm * ntarifkub) + nbadmin);
                var tagihan = ntagihan.toString();

                var ntotalbiaya = (ntagihan - npot);
                var totalbiaya = ntotalbiaya.toString();

                rootRef.child(click_id).child("mawal").set(mawal);
                rootRef.child(click_id).child("status").set(status);
                rootRef.child(click_id).child("pot").set(pot1);
                rootRef.child(click_id).child("badmin").set(badmin);
                rootRef.child(click_id).child("tarifkub").set(tarifkub);
                rootRef.child(click_id).child("makhir").set(updmeter);
                rootRef.child(click_id).child("periodeterakhir").set(updperiode);
                rootRef.child(click_id).child("tagihan").set(tagihan);
                rootRef.child(click_id).child("totalbiaya").set(totalbiaya);
                rootRef.child(click_id).child("totalm").set(totalm);

                console.log(totalm, pot1, tagihan, totalbiaya, updperiode, status);

                simpantagihan(click_id, updmeter, mawal, name, updperiode, totalbiaya);
        });
}

function simpantagihan(click_id, updmeter, mawal, name, updperiode, totalbiaya) {
    var rootRef = firebase.database().ref().child("data_tagihan").child(updperiode);
            rootRef.child(click_id).child("blok").set(click_id);
            rootRef.child(click_id).child("makhir").set(updmeter);
            rootRef.child(click_id).child("mawal").set(mawal);
            rootRef.child(click_id).child("name").set(name);
            rootRef.child(click_id).child("periode").set(updperiode);
            rootRef.child(click_id).child("total_tagihan").set(totalbiaya);

            alert("Data berhasil diupdate!");
}

function tes(click_id) {
    $("#table_body1").empty();
    nomorr = click_id;  
    console.log(nomorr);
    var rootRef2 = firebase.database().ref().child("data_transaksi").child(nomorr);
        rootRef2.on('value', gotData1);

        function gotData1(dt) {
            var datatransaksi = dt.val();
            var periode = Object.keys(datatransaksi);
            console.log(periode);
            for (var j = 0; j < periode.length; j++) {
                var l = periode[j];
                var periode1 = datatransaksi[l].periode;
                var mawal = datatransaksi[l].mawal;                   
                var makhir = datatransaksi[l].makhir;
                var tagihan = datatransaksi[l].total_tagihan;
                $("#table_body1").append("<tr><td>" + periode1 + "</td><td>" + tagihan + "</td><td>" + mawal + "</td><td>" + makhir + "</td></tr>");
                document.getElementById("kembali").style.display="block";
                tab2 = document.getElementById("tab2");
                if (tab2.style.display=="none") {
                    tab2.style.display="block";
                    tab1.style.display="none";
                }
            }
    }
}

function kembali1() {
    document.getElementById("totm").value = null;
    document.getElementById("periodeupd").value = "Juni 2020";
    $("#upd").empty();
    tab1.style.display="block";
    tab3.style.display="none";
    document.getElementById("kembali1").style.display="none";
    document.getElementById("totm").style.display="none";
    document.getElementById("periodeupd").style.display="none";
}

function kembali() {
    tab1.style.display="block";
    tab2.style.display="none";
    document.getElementById("kembali").style.display="none";
}


    

    


 

       // var blok = snap.child("blok").val;
       // var name = snap.child("name").val;

/*        var rootRef2 = firebase.database().ref().child("data_transaksi").child(blok);
        rootRef2.on("child_added", snap => {
            var blok1 = snap.child("blok").val();
                
            if (blok1 == blok) {
    
                var periode = snap.child("periode").val();
                var mawal = snap.child("mawal").val();                   
                var makhir = snap.child("makhir").val();
                var tagihan = snap.child("total_tagihan").val();
   
                $("#table_body1").append("<tr><td>" + periode + "</td><td>" + tagihan + "</td><td>" + mawal + "</td><td>" + makhir + "</td></tr>");

            }
        })

        $("#table_body").append("<tr><td>" + blok + "</td><td>" + nama + "</td><td><button>" + detail + "</button></td></tr>");*/
       // document.getElementById("blok").value=blok;
       // document.getElementById("name").value=name;