var startVotingButton = document.getElementById('startVotingButton');
startVotingButton.addEventListener('click', startVotingFn);

function startVotingFn() {
    window.scrollTo(0, 0)
    var firstImage = document.getElementById('firstImage');
    var secondImage = document.getElementById('secondImage');
    var thirdImage = document.getElementById('thirdImage');
    var chartTiltesArray = ['Bag', 'Banana', 'Bathroom', 'Boots', 'Breakfast', 'Bubblegum', 'Chair', 'Cthulhu', 'Dog-duck', 'Dragon',
        'Pen', 'Pet-sweep', 'Scissors', 'Shark', 'Sweep', 'Tauntaun', 'Unicorn', 'Usb', 'Water-can', 'Wine-glass'];
    console.log('localStorage in the start:', localStorage)
    //allProductsArray
    var allProductsArray;

    //get data from local storage
    allProductsArray = JSON.parse(localStorage.getItem('allProductsArray'));
    if (allProductsArray == null) {
        allProductsArray = [];
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
    }

    var selectedProductsArray = [];
    var lastSeclectedIndexes = [];
    var numberOfClicksArray = [];
    var numberOfShownArray = [];

    for (var i = 0; i < 20; i++) {
        numberOfClicksArray.push(0);
        numberOfShownArray.push(0);
    }

    var totalClicks = 0;
    var currentFirstImage;
    var currentSecondImage;
    var currentThirdImage;
    var roundsOfVoting = 25;

    function Product(name, path) {
        this.name = name;
        this.path = path;
        this.timesShown = 0;
        this.numberOfClicks = 0;
        allProductsArray.push(this);
    }

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
            if (clickedElementId === 'firstImage' || clickedElementId === 'secondImage' ||
                clickedElementId === 'thirdImage') {
                totalClicks++;
                if (clickedElementId === 'firstImage') {
                    selectedProductsArray.push(currentFirstImage);
                    currentFirstImage.numberOfClicks += 1;
                }
                if (clickedElementId === 'secondImage') {
                    selectedProductsArray.push(currentSecondImage);
                    currentSecondImage.numberOfClicks += 1;

                }
                if (clickedElementId === 'thirdImage') {
                    selectedProductsArray.push(currentThirdImage);
                    currentThirdImage.numberOfClicks += 1;
                    console.log('currentThirdImage: ', currentThirdImage);
                }
                localStorage.clear();
                localStorage.setItem('allProductsArray', JSON.stringify(allProductsArray));
            }
            displayRandomImage();
        }
        else {
            localStorage.clear();
            localStorage.setItem('allProductsArray', JSON.stringify(allProductsArray));
            console.log('localStorage:', localStorage);
            displayChart(allProductsArray);

            imagesSection.removeEventListener('click', clickButtonFn);
        }
    };
    //remove results function
    function removeResults() {
        //results.textContent="";
        var xx = document.getElementById('results');
        if (xx.hasChildNodes()) {
            while (xx.firstChild) {
                xx.removeChild(xx.firstChild);
            }
        }
    }
    //dispaly random image function
    function displayRandomImage() {
        var prevFirstImageIndex;
        var prevSecondImageIndex;
        var prevThirdImageIndex;
        var firstImageIndex = getRandomNumber();
        var secondImageIndex = getRandomNumber();
        var thirdImageIndex = getRandomNumber();

        while (firstImageIndex === secondImageIndex ||
            thirdImageIndex === secondImageIndex ||
            firstImageIndex === thirdImageIndex ||
            lastSeclectedIndexes.includes(firstImageIndex) ||
            lastSeclectedIndexes.includes(secondImageIndex) ||
            lastSeclectedIndexes.includes(thirdImageIndex)) {
            firstImageIndex = getRandomNumber();
            secondImageIndex = getRandomNumber();
            thirdImageIndex = getRandomNumber();
        }
        prevFirstImageIndex = firstImageIndex;
        prevSecondImageIndex = secondImageIndex;
        prevThirdImageIndex = thirdImageIndex;

        lastSeclectedIndexes.pop();
        lastSeclectedIndexes.pop();
        lastSeclectedIndexes.pop();

        lastSeclectedIndexes.push(firstImageIndex);
        lastSeclectedIndexes.push(secondImageIndex);
        lastSeclectedIndexes.push(thirdImageIndex);

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

    //function to display chart
    function displayChart(allProductsArray) {
        for (var i = 0; i < allProductsArray.length; i++) {
            numberOfClicksArray[i] = allProductsArray[i].numberOfClicks;
            numberOfShownArray[i] = allProductsArray[i].timesShown;
        }
        var ctx = document.getElementById('chartCanvas').getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: chartTiltesArray,
                datasets: [{
                    label: '# of Clicks',
                    data: numberOfClicksArray,
                    backgroundColor: 'red',
                    borderColor: [],
                    borderWidth: 1
                },
                {
                    label: '# of Shown times',
                    data: numberOfShownArray,
                    backgroundColor: 'blue',
                    borderColor: [],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        stacked: false,
                        ticks: {
                            min: 0,
                            stepSize: 1,
                        }
                    }]
                }
            }
        });
    }
}