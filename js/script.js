


var startVotingButton = document.getElementById('startVotingButton');
startVotingButton.addEventListener('click', startVotingFn);

function startVotingFn() {
    window.scrollTo(0, 0)

    removeResults();
    


// document.getElementById("firstImage").src="img/bag.jpg";

var firstImage = document.getElementById('firstImage');
var secondImage = document.getElementById('secondImage');
var thirdImage = document.getElementById('thirdImage');
var results = document.getElementById('results');
var listItem = document.createElement('li');



var allProductsArray = [];
var totalClicks = 0;
var currentFirstImage;
var currentSecondImage;
var currentThirdImage;
var roundsOfVoting = 25;
//roundsOfVoting=prompt('Enter the number of rounds for voting','25');

function Product(name, path) {
    this.name = name;
    this.path = path;
    this.timesShown = 0;
    this.numberOfClicks = 0;
    allProductsArray.push(this);

}

new Product('Bag', 'img/bag.jpg');
new Product('Banana', 'img/banana.jpg');
new Product('Bathroom', 'img/bathroom.jpg');
new Product('Boots', 'img/boots.jpg');
new Product('Breakfast', 'img/breakfast.jpg');
new Product('Bubblegum', 'img/bubblegum.jpg');
new Product('Chair', 'img/chair.jpg');
new Product('Cthulhu', 'img/cthulhu.jpg');
new Product('Dog-duck', 'img/dog-duck.jpg');
new Product('Dragon', 'img/dragon.jpg');
new Product('Pen', 'img/pen.jpg');
new Product('Pet-sweep', 'img/pet-sweep.jpg');
new Product('Scissors', 'img/scissors.jpg');
new Product('Shark', 'img/shark.jpg');
new Product('Sweep', 'img/sweep.png');
new Product('Tauntaun', 'img/tauntaun.jpg');
new Product('Unicorn', 'img/unicorn.jpg');
new Product('Usb', 'img/usb.gif');
new Product('Water-can', 'img/water-can.jpg');
new Product('Wine-glass', 'img/wine-glass.jpg');
    roundsOfVoting = prompt('Enter the number of rounds for voting', '25');
    var imagesSection = document.getElementById('imagesSection');
    imagesSection.addEventListener('click', clickButtonFn);
    displayRandomImage();



function getRandomNumber() {
    return Math.floor(Math.random() * allProductsArray.length);
};


function clickButtonFn(event) {
    if (totalClicks < roundsOfVoting) {

        var clickedElementId = event.target.id;
        console.log('clickedElementId: ', clickedElementId);

        if (clickedElementId === 'firstImage' || clickedElementId === 'secondImage' ||
            clickedElementId === 'thirdImage') {
            totalClicks++;

            if (clickedElementId === 'firstImage') {
                currentFirstImage.numberOfClicks += 1;
                console.log('currentFirstImage: ', currentFirstImage);
            }
            if (clickedElementId === 'secondImage') {
                currentSecondImage.numberOfClicks += 1;
                console.log('currentSecondImage: ', currentSecondImage);

            }
            if (clickedElementId === 'thirdImage') {
                currentThirdImage.numberOfClicks += 1;
                console.log('currentThirdImage: ', currentThirdImage);

            }
        }
        displayRandomImage();
    }
    else {
        results = document.getElementById('results');
        for (var i = 0; i < allProductsArray.length; i++) {
            listItem = document.createElement('li');
            listItem.textContent = allProductsArray[i].name + ' has ' + allProductsArray[i].numberOfClicks
                + ' clicks, and ' + allProductsArray[i].timesShown + ' times shown';
            results.appendChild(listItem);


        }
        imagesSection.removeEventListener('click', clickButtonFn);

    }

};

function removeResults(){
    //results.textContent="";
    var xx = document.getElementById('results');

    if(xx.hasChildNodes()){


        while (xx.firstChild) {
            xx.removeChild(xx.firstChild);
        }

        console.log('results has child');
       
       

    }
}

function displayRandomImage() {

    var firstImageIndex = getRandomNumber();
    var secondImageIndex = getRandomNumber();
    var thirdImageIndex = getRandomNumber();
    // console.log('firstImageIndexBeforeWhile:',firstImageIndex);
    // console.log('secondImageIndexBeforeWhile:',secondImageIndex);
    // console.log('thirdImageIndexBeforeWhile:',thirdImageIndex);

    while (firstImageIndex === secondImageIndex ||
        thirdImageIndex === secondImageIndex ||
        firstImageIndex === thirdImageIndex) {
        //alert('two image or more are identical')
        firstImageIndex = getRandomNumber();
        secondImageIndex = getRandomNumber();
        thirdImageIndex = getRandomNumber();
        // console.log('firstImageIndexInsideWhile: ',firstImageIndex);
        // console.log('secondImageIndexInsideWhile:',secondImageIndex);
        // console.log('thirdImageIndexInsideWhile:',thirdImageIndex);

    }
    // console.log('firstImageIndexAftereWhile:',firstImageIndex);
    // console.log('secondImageIndexAfterWhile:',secondImageIndex);
    // console.log('thirdImageIndexAfterWhile:',thirdImageIndex);

    currentFirstImage = allProductsArray[firstImageIndex];
    currentSecondImage = allProductsArray[secondImageIndex];
    currentThirdImage = allProductsArray[thirdImageIndex];

    firstImage.src = currentFirstImage.path;
    secondImage.src = currentSecondImage.path;
    thirdImage.src = currentThirdImage.path;

    allProductsArray[firstImageIndex].timesShown += 1;
    allProductsArray[secondImageIndex].timesShown += 1;
    allProductsArray[thirdImageIndex].timesShown += 1;

};
}