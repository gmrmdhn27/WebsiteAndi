// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
	anchor.addEventListener("click", function (e) {
		e.preventDefault();
		const target = document.querySelector(this.getAttribute("href"));
		if (target) {
			target.scrollIntoView({ behavior: "smooth" });
		}
	});
});

// Button interaction
document.querySelectorAll(".btn-outline").forEach((btn) => {
	btn.addEventListener("click", function () {
		this.textContent = "LIHAT KERANJANG";
		this.style.background = "#28a745";
		this.style.borderColor = "#28a745";
		this.style.color = "white";

		setTimeout(() => {
			this.textContent = "Pilih";
			this.style.background = "transparent";
			this.style.borderColor = "#222";
			this.style.color = "#222";
		}, 1500);
	});
});

const navbarNav = document.querySelector(".nav-links");
document.querySelector("#sidebar").onclick = () => {
	navbarNav.classList.toggle("active");
};

// text typing
const texts = [
	"TEMUKAN KACAMATAMU",
	"BEBAS PILIH DESAIN",
	"DENGAN HASIL YANG PRESISI",
	"VISI YANG SEMPURNA",
];

let count = 0;
let index = 0;
let currentText = "";
let letter = "";
const typingElement = document.getElementById("typing-text");

function type() {
	if (count === texts.length) {
		count = 0; // kembali ke teks pertama
	}
	currentText = texts[count];
	letter = currentText.slice(0, ++index);

	typingElement.textContent = letter;

	if (letter.length === currentText.length) {
		// setelah selesai mengetik, tunggu 2 detik lalu hapus
		setTimeout(() => erase(), 2000);
	} else {
		setTimeout(type, 120); // kecepatan mengetik
	}
}

function erase() {
	letter = currentText.slice(0, --index);
	typingElement.textContent = letter;

	if (letter.length === 0) {
		count++;
		index = 0;
		setTimeout(type, 500); // jeda sebelum mulai teks berikutnya
	} else {
		setTimeout(erase, 80); // kecepatan menghapus
	}
}

// mulai animasi
type();
