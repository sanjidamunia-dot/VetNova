document.querySelector(".add-btn").addEventListener("click",()=>{
    alert("Add New Pet Clicked!");
});


const upload = document.getElementById("imgUpload");
const userImg = document.getElementById("userImg");

if(localStorage.getItem("userProfilePic")){
    userImg.src = localStorage.getItem("userProfilePic");
}

upload.addEventListener("change", function(){

    const file = this.files[0];

    if(file){

        const reader = new FileReader();



 reader.onload = function(e){

    const imageData = e.target.result;

    userImg.src = imageData;

    localStorage.setItem("userProfilePic", imageData);

    let userData =
        JSON.parse(localStorage.getItem("vetnovaUser")) || {};

    userData.profileImage = imageData;

    localStorage.setItem(
        "vetnovaUser",
        JSON.stringify(userData)
    );
if (typeof updateNavbarProfile === "function") {
    updateNavbarProfile();
}
    // Navbar profile image update
    const navImg = document.getElementById("navProfilePic");

    if(navImg){
        navImg.src = imageData;
    }
};
reader.readAsDataURL(file);

} 
});


const user = JSON.parse(
    localStorage.getItem("vetnovaUser")
);

if(user){

    document.getElementById("profileName").textContent =
    user.name;

    document.getElementById("profileEmail").textContent =
    user.email;

    document.getElementById("profilePhone").textContent =
    user.phone;

    document.getElementById("profileMemberSince").textContent =
    localStorage.getItem("joinDate") || "New User";

}

const petUpload =
document.getElementById("petUpload");

const petImg =
document.getElementById("petImg");

if(localStorage.getItem("petProfilePic")){
    petImg.src =
    localStorage.getItem("petProfilePic");
}

petUpload.addEventListener("change", function () {

    const file = this.files[0];

    if (file) {

        const reader = new FileReader();

        reader.onload = function (e) {

            const imageData = e.target.result;

            petImg.src = imageData;

          
            localStorage.setItem("petProfilePic", imageData);

        };

        reader.readAsDataURL(file);
    }
});
