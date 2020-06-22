var startVotingButton = document.getElementById('startVotingButton');
startVotingButton.addEventListener('click', startVotingFn);

function startVotingFn() {
    window.scrollTo(0, 0)

    //removeResults();



    // document.getElementById("firstImage").src="img/bag.jpg";

    var firstImage = document.getElementById('firstImage');
    var secondImage = document.getElementById('secondImage');
    var thirdImage = document.getElementById('thirdImage');
    // var results = document.getElementById('results');
    // var listItem = document.createElement('li');


    var chartTiltesArray = ['Bag', 'Banana', 'Bathroom', 'Boots', 'Breakfast', 'Bubblegum', 'Chair', 'Cthulhu', 'Dog-duck', 'Dragon',
        'Pen', 'Pet-sweep', 'Scissors', 'Shark', 'Sweep', 'Tauntaun', 'Unicorn', 'Usb', 'Water-can', 'Wine-glass'];
    var allProductsArray = [];
    var selectedProductsArray = [];
    var lastSeclectedIndexes = [];
    var numberOfClicksArray = [];
    var numberOfShownArray = [];
    var numberOfShownColorsArray = [];
    var numberOfClicksColorArray = [];

    for (var i = 0; i < allProductsArray.length; i++) {
        numberOfClicksArray.push(0);
        numberOfShownArray.push(0);
        // numberOfClicksArray[i]=0;
        // numberOfShownArray[i]=0;
        //numberOfShownColorsArray.push('#f50a0a');
        //numberOfClicksColorArray.push('');

    }
    console.log('numberOfShownColorsArray: ', numberOfShownColorsArray);
    console.log('numberOfClicksColorArray: ', numberOfClicksColorArray);





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
                    selectedProductsArray.push(currentFirstImage);

                    currentFirstImage.numberOfClicks += 1;
                    console.log('currentFirstImage: ', currentFirstImage);
                }
                if (clickedElementId === 'secondImage') {
                    selectedProductsArray.push(currentSecondImage);

                    currentSecondImage.numberOfClicks += 1;
                    console.log('currentSecondImage: ', currentSecondImage);

                }
                if (clickedElementId === 'thirdImage') {
                    selectedProductsArray.push(currentThirdImage);

                    currentThirdImage.numberOfClicks += 1;
                    console.log('currentThirdImage: ', currentThirdImage);

                }
            }
            displayRandomImage();
        }
        else {
            // results = document.getElementById('results');
            for (var i = 0; i < allProductsArray.length; i++) {
                numberOfClicksArray[i] = allProductsArray[i].numberOfClicks;
                numberOfShownArray[i] = allProductsArray[i].timesShown;
            }
            console.log('numberOfClicksArray: ', numberOfClicksArray);
            console.log('numberOfShownArray: ', numberOfShownArray);


            var ctx = document.getElementById('chartCanvas').getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: chartTiltesArray,


                    datasets: [{
                        label: '# of Clicks',
                        data: numberOfClicksArray,
                        backgroundColor: 'red',

                        borderColor: [

                        ],
                        borderWidth: 1
                    },
                    {
                        label: '# of Shown times',
                        data: numberOfShownArray,
                        backgroundColor: 'blue',
                        borderColor: [
                        ],
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
            }});





            // listItem = document.createElement('li');
            // listItem.textContent = allProductsArray[i].name + ' has ' + allProductsArray[i].numberOfClicks
            //     + ' clicks, and ' + allProductsArray[i].timesShown + ' times shown';
            // results.appendChild(listItem);


            //   }
            imagesSection.removeEventListener('click', clickButtonFn);

        }

    };

    function removeResults() {
        //results.textContent="";
        var xx = document.getElementById('results');

        if (xx.hasChildNodes()) {


            while (xx.firstChild) {
                xx.removeChild(xx.firstChild);
            }

            console.log('results has child');



        }
    }

    function displayRandomImage() {
        console.log('numberOfShownArray: ', numberOfShownArray);

        var prevFirstImageIndex;
        var prevSecondImageIndex;
        var prevThirdImageIndex;
        //lastSeclectedIndexes.push('-1');

        var firstImageIndex = getRandomNumber();
        var secondImageIndex = getRandomNumber();
        var thirdImageIndex = getRandomNumber();
        console.log('lastSeclectedIndexes before push', lastSeclectedIndexes);
        console.log('firstImageIndexBeforeWhile:', firstImageIndex);
        console.log('secondImageIndexBeforeWhile:', secondImageIndex);
        console.log('thirdImageIndexBeforeWhile:', thirdImageIndex);

        console.log(lastSeclectedIndexes.includes(firstImageIndex));
        console.log(lastSeclectedIndexes.includes(secondImageIndex));
        console.log(lastSeclectedIndexes.includes(thirdImageIndex));

        while (firstImageIndex === secondImageIndex ||
            thirdImageIndex === secondImageIndex ||
            firstImageIndex === thirdImageIndex ||
            lastSeclectedIndexes.includes(firstImageIndex) ||
            lastSeclectedIndexes.includes(secondImageIndex) ||
            lastSeclectedIndexes.includes(thirdImageIndex)) {
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

        prevFirstImageIndex = firstImageIndex;
        prevSecondImageIndex = secondImageIndex;
        prevThirdImageIndex = thirdImageIndex;
        lastSeclectedIndexes.pop();
        lastSeclectedIndexes.pop();
        lastSeclectedIndexes.pop();


        lastSeclectedIndexes.push(firstImageIndex);
        lastSeclectedIndexes.push(secondImageIndex);
        lastSeclectedIndexes.push(thirdImageIndex);
        console.log('lastSeclectedIndexes After push', lastSeclectedIndexes);



        currentFirstImage = allProductsArray[firstImageIndex];
        currentSecondImage = allProductsArray[secondImageIndex];
        currentThirdImage = allProductsArray[thirdImageIndex];

        firstImage.src = currentFirstImage.path;
        secondImage.src = currentSecondImage.path;
        thirdImage.src = currentThirdImage.path;

        allProductsArray[firstImageIndex].timesShown += 1;
        allProductsArray[secondImageIndex].timesShown += 1;
        allProductsArray[thirdImageIndex].timesShown += 1;
        console.log('numberOfShownArray[firstImageIndex]', numberOfShownArray[firstImageIndex]);
        //=numberOfShownArray[firstImageIndex]+1;
        console.log('numberOfShownArray: ', numberOfShownArray);
        //numberOfShownArray[secondImageIndex]+=1;
        console.log('numberOfShownArray: ', numberOfShownArray);

        //numberOfShownArray[thirdImageIndex]+=1;
        console.log('numberOfShownArray: ', numberOfShownArray);


    };
}