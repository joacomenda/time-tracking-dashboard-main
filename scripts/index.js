const reportCardsInformation = document.getElementsByClassName('report-hours-and-resume');

const dailyButton = document.getElementById('daily');
const weeklyButton = document.getElementById('weekly');
const monthlyButton = document.getElementById('monthly');

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


dailyButton.addEventListener('click' , () => {
    console.log('daily options');
    fetchDataFuction('daily');
});

weeklyButton.addEventListener('click' , () => {
    console.log('weekly options');
    fetchDataFuction('weekly');
});

monthlyButton.addEventListener('click' , () => {
    console.log('monthly options');
    fetchDataFuction('monthly');
});