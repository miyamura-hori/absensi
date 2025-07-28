const video = document.getElementById('videoPreview');
const canvas = document.getElementById('canvas');
const fotoData = document.getElementById('fotoData');
const previewContainer = document.getElementById('previewContainer');
const imagePreview = document.getElementById('imagePreview');
const cameraAlert = document.getElementById('cameraAlert');
const btnGroupFoto = document.getElementById('btnGroupFoto');
const btnRetake = document.getElementById('btnRetake');
const btnConfirm = document.getElementById('btnConfirm');
const loadingOverlay = document.getElementById('loadingOverlay');

let kameraAktif = false;

navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        video.srcObject = stream;
        kameraAktif = true;
        cameraAlert.style.display = 'none';
    })
    .catch(err => {
        kameraAktif = false;
        cameraAlert.style.display = 'block';
    });

function ambilFoto() {
    if (!kameraAktif) {
        alert("🚫 Tidak bisa ambil foto. Kamera belum diaktifkan.");
        cameraAlert.style.display = 'block';
        return;
    }
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0);
    const dataURL = canvas.toDataURL('image/jpeg');
    imagePreview.src = dataURL;
    previewContainer.style.display = 'block';
    video.style.display = 'none';
}

function retakeFoto() {
    previewContainer.style.display = 'none';
    video.style.display = 'block';
    fotoData.value = "";
    btnGroupFoto.classList.remove('single');
    btnRetake.style.width = 'auto';
}

function konfirmasiFoto() {
    fotoData.value = imagePreview.src;
    btnConfirm.style.display = 'none';
    btnGroupFoto.classList.add('single');
    btnRetake.style.width = '100%';
    alert("📸 Foto disimpan!");
}



fetch('https://script.google.com/macros/s/AKfycbxRb9YsZcN3_DKQB4kCe-YES3pJP-qxMWMdhrkGBWQjEb4Wzxu8YYCNuH6E74thTJbiaQ/exec')
    .then(res => res.json())
    .then(namaList => {
        const selectNama = document.getElementById('nama');
        namaList.forEach(n => {
            const opt = document.createElement('option');
            opt.value = n;
            opt.textContent = n;
            selectNama.appendChild(opt);
        });
    })
    .catch(err => {
        console.error('❌ Gagal mengambil daftar nama:', err);
        alert("⚠️ Tidak bisa mengambil nama dari Google Sheets. Coba cek koneksi atau URL Apps Script.");
    });
