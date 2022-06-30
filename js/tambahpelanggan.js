var database = firebase.database();

  function add_pelanggan() {
	  firebase.database().ref("pelanggan_baru").push({
		  nama_pelanggan: document.getElementById("nama_pelanggan").value,
		  blok: document.getElementById("blok").value,
          
      });

      if (nama_pelanggan!="" && blok!=""){
        alert("Data Berhasil Ditambahkan");
        window.location = "daftarpelanggan.html";
      }
      else
      {
        alert("Lengkapi Form");
      }
      
    }