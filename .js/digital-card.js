document.getElementById("imageUpload")
.addEventListener("change",function(){

    let file=this.files[0];

    if(file){
        let reader=new FileReader();

        reader.onload=function(e){
            document.getElementById("petImage").src=e.target.result;
        }

        reader.readAsDataURL(file);
    }

});


const imageUpload = document.getElementById("imageUpload");
const petImage = document.getElementById("petImage");

// পেজ লোড হলে সেভ করা ইমেজটি দেখাবে
window.onload = () => {
    const savedImage = localStorage.getItem("petProfileImage");
    if (savedImage) {
        petImage.src = savedImage;
    }
};

// ইমেজ সিলেক্ট করলে সেটি লোকাল স্টোরেজে সেভ হবে
imageUpload.addEventListener("change", function() {
    let file = this.files[0];
    if (file) {
        let reader = new FileReader();
        reader.onload = function(e) {
            const imageData = e.target.result;
            petImage.src = imageData;
            // ব্রাউজারে ডাটাটি সেভ করে রাখছে
            localStorage.setItem("petProfileImage", imageData);
        }
        reader.readAsDataURL(file);
    }
});