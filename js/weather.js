const url = 'https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-B8843CB4-1526-4173-95DE-897BC2EC1169'
const counties = ['臺北市', '新北市', '基隆市', '桃園市', '新竹縣', '新竹市', '苗栗縣', '臺中市', '彰化縣', '南投縣', '雲林縣', '嘉義縣', '嘉義市', '臺南市', '高雄市', '屏東縣', '宜蘭縣', '花蓮縣', '臺東縣', '澎湖縣', '金門縣', '連江縣'];
window.onload = function () {
    document.getElementById('start').click();
}
fetch(url)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        let weatherData = {};
        let locations = data['records']['location']
        locations.forEach(function (location) {
            let locationName = location['locationName']
            weatherData[locationName] = {}
            let weatherElements = location['weatherElement']
            let timeInterval = ['now', 'after12h', 'after24h']
            for (let i = 0; i < 3; i++) {
                let elementData = {};
                weatherElements.forEach(function (weatherElement) {
                    let elementName = weatherElement['elementName']
                    let parameterName = weatherElement['time'][i]['parameter']['parameterName']
                    elementData[elementName] = [parameterName]
                });
                let parameterValue = weatherElements[0]['time'][i]['parameter']['parameterValue']
                elementData['Wx'].push(parameterValue)
                weatherData[locationName][timeInterval[i]] = elementData
            }
        });
        const containerElement = document.querySelector('.page-content')
        const buttonElements = document.querySelectorAll('.time-change')
        buttonElements.forEach(function (buttonElement) {
            buttonElement.addEventListener('click', function () {
                buttonElements.forEach(function (buttonElement) {
                    buttonElement.classList.remove('active')
                });
                buttonElement.classList.add('active');
                let time = buttonElement.getAttribute('data-time')
                let cards = ''
                counties.forEach(function (county) {
                    let wxCode = weatherData[county][time]['Wx'][1]
                    if (wxCode == 1) {
                        up = `
                                    <svg class="sunny" viewbox="15 15 70 70">
                                        <circle id="sun" cx="50" cy="50" r="20">
                                            <animateTransform dur="5s" attributeName="transform" repeatCount="indefinite" type="rotate" from="0,50,50"
                                                to="360,50,50" />
                                        </circle>
                                    </svg>`
                    } else if (wxCode <= 3) {
                        up = `
                                    <svg class="cloudy_sunny" viewbox="0 -5 100 100">
                                        <circle id="sun" cx="60" cy="40" r="15">
                                            <animateTransform dur="5s" attributeName="transform" repeatCount="indefinite" type="rotate" from="0,60,40"
                                                to="360,60,40" />
                                        </circle>
                                        <g id="cloud">
                                            <circle cx="32" cy="35" r="15"></circle>
                                            <circle cx="50" cy="40" r="14"></circle>
                                            <rect width="70" height="30" x="5" y="35" rx="15"></rect>
                                            <animateTransform attributeName="transform" type="translate" values="-5,10;10,10;-5,10" dur="2s"
                                                repeatCount="indefinite" />
                                        </g>
                                    </svg>`
                    } else if (wxCode <= 6) {
                        up = `
                                    <svg class="cloudy" viewbox="0 0 100 100">
                                        <g id="cloud">
                                            <circle cx="37" cy="40" r="15"></circle>
                                            <circle cx="55" cy="45" r="14"></circle>
                                            <rect width="70" height="30" x="10" y="40" rx="15"></rect>
                                            <animateTransform attributeName="transform" type="translate" values="10,0;-5,0;10,0" dur="2s"
                                                repeatCount="indefinite" />
                                        </g>
                                        <g id="cloud2">
                                            <circle cx="32" cy="35" r="13"></circle>
                                            <circle cx="50" cy="40" r="12"></circle>
                                            <rect width="70" height="30" x="5" y="40" rx="15"></rect>
                                            <animateTransform attributeName="transform" type="translate" values="-5,20;10,20;-5,20" dur="2s"
                                                repeatCount="indefinite" />
                                        </g>
                                        <animateTransform attributeName="transform" dur="0.1s" type="scale" values="1.5"/>
                                    </svg>`
                    } else if (wxCode == 7) {
                        up = `
                                    <svg class="overcast" viewbox="0 0 100 100">
                                        <g id="overcast_cloud">
                                            <circle cx="37" cy="40" r="15"></circle>
                                            <circle cx="55" cy="45" r="14"></circle>
                                            <rect width="70" height="30" x="10" y="40" rx="15"></rect>
                                            <animateTransform attributeName="transform" type="translate" values="10,0;-5,0;10,0" dur="2s"
                                                repeatCount="indefinite" />
                                        </g>
                                        <g id="overcast_cloud2">
                                            <circle cx="32" cy="35" r="13"></circle>
                                            <circle cx="50" cy="40" r="12"></circle>
                                            <rect width="70" height="30" x="5" y="40" rx="15"></rect>
                                            <animateTransform attributeName="transform" type="translate" values="-5,20;10,20;-5,20" dur="2s"
                                                repeatCount="indefinite" />
                                        </g>
                                    </svg>`
                    } else if (wxCode <= 20) {
                        up = `
                                    <svg class="rainy" viewbox="0 10 100 100">
                                        <g id="rain">
                                            <rect width="2" height="7" x="45" y="60" rx="1">
                                                <animateTransform dur="1.5s" attributeName="transform" repeatCount="indefinite" type="rotate"
                                                    values="30,10,50;30,-150,-20" />
                                            </rect>
                                            <rect width="2" height="7" x="60" y="60" rx="1">
                                                <animateTransform dur="1.8s" attributeName="transform" repeatCount="indefinite" type="rotate"
                                                    values="30,50,50;30,-150,-20" />
                                            </rect>
                                            <rect width="2" height="7" x="75" y="55" rx="1">
                                                <animateTransform dur="1.3s" attributeName="transform" repeatCount="indefinite" type="rotate"
                                                    values="30,50,60;30,-150,-20" />
                                            </rect>
                                            <rect width="2" height="7" x="65" y="45" rx="1">
                                                <animateTransform dur="1.2s" attributeName="transform" repeatCount="indefinite" type="rotate"
                                                    values="30,50,60;30,-150,-20" />
                                            </rect>
                                            <animateTransform link attributeName="transform" type="translate" values="-5,-5;10,0;-5,-5" dur="2s"
                                                repeatCount="indefinite" />
                                        </g>
                                        <g id="overcast_cloud">
                                            <circle cx="37" cy="40" r="15"></circle>
                                            <circle cx="55" cy="45" r="14"></circle>
                                            <rect width="70" height="30" x="10" y="40" rx="15"></rect>
                                            <animateTransform attributeName="transform" type="translate" values="10,0;-5,0;10,0" dur="2s"
                                                repeatCount="indefinite" />
                                        </g>
                                        <g id="overcast_cloud2">
                                            <circle cx="32" cy="35" r="13"></circle>
                                            <circle cx="50" cy="40" r="12"></circle>
                                            <rect width="70" height="30" x="5" y="40" rx="15"></rect>
                                            <animateTransform attributeName="transform" type="translate" values="-5,15;10,15;-5,15" dur="2s"
                                                repeatCount="indefinite" />
                                        </g>
                                    </svg>`
                    } else {
                        up = `
                                    <svg class="rainy_thunder" viewbox="0 10 100 100">
                                        <g id="rain">
                                            <rect width="2" height="7" x="45" y="60" rx="1">
                                                <animateTransform dur="0.6s" attributeName="transform" repeatCount="indefinite" type="rotate"
                                                    values="30,10,50;30,-150,-20" />
                                            </rect>
                                            <rect width="2" height="7" x="60" y="60" rx="1">
                                                <animateTransform dur="0.8s" attributeName="transform" repeatCount="indefinite" type="rotate"
                                                    values="30,50,50;30,-150,-20" />
                                            </rect>
                                            <rect width="2" height="7" x="75" y="55" rx="1">
                                                <animateTransform dur="0.7s" attributeName="transform" repeatCount="indefinite" type="rotate"
                                                    values="30,50,60;30,-150,-20" />
                                            </rect>
                                            <rect width="2" height="7" x="65" y="45" rx="1">
                                                <animateTransform dur="0.5s" attributeName="transform" repeatCount="indefinite" type="rotate"
                                                    values="30,50,60;30,-150,-20" />
                                            </rect>
                                            <animateTransform link attributeName="transform" type="translate" values="-5,-5;10,0;-5,-5" dur="2s"
                                                repeatCount="indefinite" />
                                        </g>
                                        <g>
                                            <polyline id="thunder" points="50,38 46,50 52,50 50,60 56,47 50,47 50,38">
                                                <animateTransform dur="2.5s" attributeName="transform" repeatCount="indefinite" type="rotate"
                                                    values="30,50,60;30,-150,-20" />
                                            </polyline>
                                            <polyline id="thunder" points="50,38 46,50 52,50 50,60 56,47 50,47 50,38">
                                                <animateTransform dur="3s" attributeName="transform" repeatCount="indefinite" type="rotate"
                                                    values="10,60,100;-100,200,10" />
                                            </polyline>
                                        </g>
                                        <g id="overcast_cloud">
                                            <circle cx="37" cy="40" r="15"></circle>
                                            <circle cx="55" cy="45" r="14"></circle>
                                            <rect width="70" height="30" x="10" y="40" rx="15"></rect>
                                            <animateTransform attributeName="transform" type="translate" values="10,0;-5,0;10,0" dur="2s"
                                                repeatCount="indefinite" />
                                        </g>
                                        <g id="overcast_cloud2">
                                            <circle cx="32" cy="35" r="13"></circle>
                                            <circle cx="50" cy="40" r="12"></circle>
                                            <rect width="70" height="30" x="5" y="40" rx="15"></rect>
                                            <animateTransform attributeName="transform" type="translate" values="-5,15;10,15;-5,15" dur="2s"
                                                repeatCount="indefinite" />
                                        </g>
                                    </svg>`
                    }
                    down = `   
                                <div class="content">
                                    <h2 class="title">${county}</h2>
                                    <div class="copy">
                                        <div class="wx">${weatherData[county][time]['Wx'][0]}</div>
                                        <div class="temperature">
                                            <div class="t">${weatherData[county][time]['MinT']}°C - ${weatherData[county]['now']['MaxT']}°C</div>
                                        </div>
                                        <div class="ci">${weatherData[county][time]['CI']}</div>
                                        <div class="pop">降雨機率:${weatherData[county][time]['PoP']}%</div>
                                    </div>
                                </div>`
                    cards += `<div class="card">${up + down}</div>`
                })
                containerElement.innerHTML = cards
            })
        })
        document.querySelector('#start').click();
    });
