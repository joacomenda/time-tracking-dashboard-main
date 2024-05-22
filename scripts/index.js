const reportCardsInformation = document.getElementsByClassName('report-hours-and-resume');
const reportCards = document.getElementsByClassName('report-card');

const dailyButton = document.getElementById('daily');
const weeklyButton = document.getElementById('weekly');
const monthlyButton = document.getElementById('monthly');

fetchDataFuction('weekly')

function fetchDataFuction(optionType)
{
    fetch('/data.json').then((request) => {  
        if(!request.ok) {
          console.log('Oops! Something went wrong.');
          return null;
        }
        
        return request.json();
      }).then((data) => {
        
        for(let i = 0; i < data.length; i++)
        {
            const category = data[i];
            const timeFrames = category['timeframes'];

            if(optionType === 'daily')
            {
                changeCard('Day' ,timeFrames , i , optionType);
            }
            else if(optionType === 'weekly')
            {
                changeCard('Week' ,timeFrames , i , optionType);
            }
            else if(optionType === 'monthly')
            {
                changeCard('Month' ,timeFrames , i , optionType);
            }
            else
            {
                console.log('Oops! Something went wrong.');
            }
        }
    });
}

function changeCard(dayOption ,timeFrames ,index , optionType)
{
    const currentHours = reportCardsInformation[index].children[0];
    const previousHours = reportCardsInformation[index].children[1];

    currentHours.innerHTML = `${timeFrames[optionType]['current']}hrs`;
    previousHours.innerHTML = `Last ${dayOption} - ${timeFrames[optionType]['previous']}hrs`;
}

function toggle(selector)
{
    const button = document.querySelector(selector);

    if(button.classList.contains('option-selected') === false)
    {
        turnOffPreviousButton();
        button.classList.add('option-selected');
        button.classList.remove('option-available');
    }
}

function turnOffPreviousButton()
{
    const previusButton = document.querySelector('.option-selected');
    previusButton.classList.remove('option-selected');
    previusButton.classList.add('option-available');
}

function reportCardInvisibility(option)
{
    for(let i = 0; i < reportCards.length; i++)
    {
        const reportCard = reportCards[i];
        reportCard.style.opacity = 0;
    }

    setTimeout(() => {
        for(let i = 0; i < reportCards.length; i++)
        {
            const reportCard = reportCards[i];
            reportCard.style.opacity = 1;
        }

        fetchDataFuction(option);
    }, 700);
}


dailyButton.addEventListener('click' , () => {
    toggle('#daily')
    reportCardInvisibility('daily');
});

weeklyButton.addEventListener('click' , () => {
    toggle('#weekly')
    reportCardInvisibility('weekly');
});

monthlyButton.addEventListener('click' , () => {
    toggle('#monthly')
    reportCardInvisibility('monthly');
});