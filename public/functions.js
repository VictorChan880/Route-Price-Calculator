
async function getInfo()  {
  geocoder = new google.maps.Geocoder();
  request = {
    address: document.getElementById('from').value
  }
    data = await geocoder.geocode(request);
    return data; 
}
async function getCity (data) {
  for (let i = 0; i < data.results[0].address_components.length; i++) { 
    var type = data.results[0].address_components[i].types[0];
    if (type === 'locality') {
      longCity = data.results[0].address_components[i].long_name;
      return longCity;
    }
  }
} 
async function getProvince(data, isLongName/*True for longname, false for shortname*/) {
  for (let i = 0; i < data.results[0].address_components.length; i++) { 
    var type = data.results[0].address_components[i].types[0];
    if (type === 'administrative_area_level_1') {
      longProvince = data.results[0].address_components[i].long_name;
      shortProvince = data.results[0].address_components[i].short_name;
      return (isLongName ? longProvince : shortProvince); 
    }
  }
}
async function getCountry(data) {
  for (let i = 0; i < data.results[0].address_components.length; i++) { 
    var type = data.results[0].address_components[i].types[0];
    if (type === 'country') {
      country = data.results[0].address_components[i].short_name; 
      return country; 
    }
  }
  
}
async function getGas (city, longProvince, shortProvince, country, fuelType) {
 
  var myHeaders = new Headers();
  myHeaders.append("authority", "www.gasbuddy.com");
  myHeaders.append("method", "POST");
  myHeaders.append("path", "/graphql");
  myHeaders.append("schemec", "https");
  myHeaders.append("accept", "*/*");
  myHeaders.append("accept-endcoding", "gzip, deflate, br");
  myHeaders.append("accept-language", "en-GB,en-US;q=0.9,en;q=0.8,pt;q=0.7");
  myHeaders.append("content-length", "3299");
  myHeaders.append("content-type", "application/json");
  myHeaders.append("cookie", "_loc_ne=false; _loc_dat=false; _loc_iu=%222c87f226-d50a-4635-a810-237f62492cf5%22; _vwo_uuid_v2=D5F0A6BE72B785720CC43C79E9A149ED0|91dd35bf079ce4895b72aaf00f1220ee; _gcl_au=1.1.1831357352.1658981190; _ga=GA1.2.263330709.1658981190; _loc_ids={}; _loc_pa=1658981189; _loc_cd=[]; g_state={\"i_p\":1659655357745,\"i_l\":1}; ASP.NET_SessionId=bmo1jgkpv2cocs5i44dejszf; _loc_csu=%228341b5a7-e500-424d-8b08-a8564cc2d7e2%22; _loc_cst=1660067139; _loc_csi=5; _loc_fl=[%22Local_Listings%22]; _loc_ct=1660067195.663; _loc_csq=119; datadome=LjVRxWLIfH4JP3X27KfiCmVaVLeNrPeoH-m_lna_nHehOScIMcwep7i1Q3fD.Bdc1DK3J2UVcUGCC2LxiMLOhgkMhmj35dOqB5fUcOYqvVtFA.dV11zqTf1eByqd~pN; datadome=_eBJlxQgCEJCFg25ccXh_q941LZMOiLQ-tWa0~7CV~RhNPTnimpE5xAo9ynSx6DxgSOvqt0~oqP9mplqc813CJVkqfvjAX5LS_~PAdQoW4lVXFYomDBwL35z65yRCIH");
  myHeaders.append("sec-ch-device-memory", "8");
  myHeaders.append("sec-ch-ua", "\"Chromium\";v=\"104\", \" Not A;Brand\";v=\"99\", \"Google Chrome\";v=\"104\"");
  myHeaders.append("sec-ch-ua-arch", "\"x86\"");
  myHeaders.append("sec-ch-ua-full-version-list", "\"Chromium\";v=\"104.0.5112.79\", \" Not A;Brand\";v=\"99.0.0.0\", \"Google Chrome\";v=\"104.0.5112.79\"");
  myHeaders.append("sec-ch-ua-mobile", "?0");
  myHeaders.append("sec-ch-ua-platform", "\"Windows\"");
  myHeaders.append("sec-fetch-dest", "empty");
  myHeaders.append("sec-fetch-mode", "cors");
  myHeaders.append("sec-fetch-site", "same-origin");
  myHeaders.append("user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36");

  var raw = JSON.stringify({
    "operationName": "LocationByArea",
    "variables": {
      "area": city,
      "countryCode": country,
      "criteria": {
        "location_type": [
          "locality",
          "metro"
        ]
      },
      // Regular: 1, Midgrade: 2, Premium: 3, Diesel: 4
      "fuel": fuelType,
      "regionCode": shortProvince
    },
    "query": "query LocationByArea($area: String, $countryCode: String, $criteria: Criteria, $fuel: Int, $regionCode: String) {\n  locationByArea(\n    area: $area\n    countryCode: $countryCode\n    criteria: $criteria\n    regionCode: $regionCode\n  ) {\n    counties {\n      countryCode\n      displayName\n      legacyId\n      regionCode\n      __typename\n    }\n    displayName\n    locationType\n    localities {\n      countryCode\n      displayName\n      regionCode\n      __typename\n    }\n    metros {\n      countryCode\n      displayName\n      regionCode\n      __typename\n    }\n    stations(fuel: $fuel) {\n      results {\n        address {\n          country\n          line1\n          line2\n          locality\n          postalCode\n          region\n          __typename\n        }\n        amenities {\n          amenity_id\n          name\n          image_url\n          __typename\n        }\n        badges {\n          badgeId\n          callToAction\n          campaignId\n          clickTrackingUrl\n          description\n          detailsImageUrl\n          detailsImpressionTrackingUrls\n          imageUrl\n          impressionTrackingUrls\n          internalName\n          targetUrl\n          title\n          __typename\n        }\n        brands {\n          brand_id\n          branding_type\n          image_url\n          name\n          __typename\n        }\n        emergency_status {\n          has_diesel {\n            nick_name\n            report_status\n            update_date\n            __typename\n          }\n          has_gas {\n            nick_name\n            report_status\n            update_date\n            __typename\n          }\n          has_power {\n            nick_name\n            report_status\n            update_date\n            __typename\n          }\n          __typename\n        }\n        latitude\n        longitude\n        enterprise\n        fuels\n        id\n        name\n        pay_status {\n          is_pay_available\n          __typename\n        }\n        prices(fuel: $fuel) {\n          cash {\n            nickname\n            posted_time\n            price\n            __typename\n          }\n          credit {\n            nickname\n            posted_time\n            price\n            __typename\n          }\n          discount\n          fuel_product\n          __typename\n        }\n        ratings_count\n        reviews(limit: 1) {\n          results {\n            agreeTotal\n            canDelete\n            hasAgreed\n            isReportable\n            isVisible\n            memberId\n            overallRating\n            profileImageUrl\n            replyRequested\n            review\n            reviewId\n            reviewDate\n            sentimentScore\n            __typename\n          }\n          __typename\n        }\n        star_rating\n        offers {\n          discounts {\n            grades\n            pwgb_discount\n            __typename\n          }\n          types\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}\n"
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  return await fetch("https://www.gasbuddy.com/graphql", requestOptions)
    .then( function(response){
      return response.json();
    })
    .then( function(data) {
      return data; 
    })
    .catch(error => console.log('error', error));

}
function hasEmptyField() {
  var flag = false;
  if (document.getElementById('from').value.length == 0) {
      document.getElementById('from-alert').innerHTML = 'Please Fill In This Field.'
      flag = true;
  }

  if (document.getElementById('to').value.length == 0) {
      document.getElementById('to-alert').innerHTML = 'Please Fill In This Field.'
      flag = true;
  }

  if (document.getElementById('fuel-efficiency').value.length == 0) {
      document.getElementById('fuel-efficiency-alert').innerHTML = 'Please Fill In This Field.'
      flag = true;
  } 
   
  return flag; 
}

async function print () {
        const data = await getInfo(); 
        city = await getCity(data)
        longProvince = await getProvince(data,true)
        shortProvince = await getProvince(data,false)
        country = await getCountry(data)
        fuelType = parseInt(document.getElementById('fuelTypeSelect').value)
        console.log(fuelType);
        fuelEfficiency = parseInt(document.getElementById('fuel-efficiency').value)
        fuelData = await getGas(city,longProvince,shortProvince,country, fuelType); 

        start = document.getElementById('from').value
        end = document.getElementById('to').value
        distance = parseFloat((await getDistance()).replace(',', ''))
        fuelVolume = distance/fuelEfficiency; 
        fuelPrice= fuelData.data.locationByArea.stations.results[3].prices[0].credit.price/100; 

        cost = fuelVolume * fuelPrice;
        document.getElementById('output').innerHTML = '';
        document.getElementById('output').innerHTML = 
          '<div class="card border text-light bg-dark" style = "font-size: 25px; border-radius: 20px;">' + 
            '<div class="card-body " style ="border-radius: 20px">' + 
            '<div class = "row">' + 
              '<div class="col-1">'+ 
                  '<i class="fa-solid fa-road"></i>' +
              '</div>' + 
              '<div class="col ms-2">' + 
                  'Distance: <b>' + distance + ' km</b>' + 
                '</div>' +
              '</div>' + 
              '<div class="row">' + 
                '<div class="col-1">' +
                  '<i class="fa-solid fa-sm fa-gas-pump"></i>' + 
                '</div>' +
                '<div class="col ms-2">' +
                  'Fuel Price: <b>' + fuelPrice *100 + '</b>' + 
                '</div>' + 
              '</div>' +
              '<div class="row">' +
                '<div class="col-1">' + 
                  '<i class="fa-solid fa-dollar-sign"></i>' +
                '</div>' +
                '<div class="col ms-1">' +
                  'Route Cost:<b> $'+ cost.toFixed(2) + '</b>' +
                '</div>'+
              '</div>'+
            '</div>' + 
        '</div>' 

       
      }
function clearErrors() {
  document.getElementById('from-alert').innerHTML = ''
  document.getElementById('to-alert').innerHTML = ''
  document.getElementById('fuel-efficiency-alert').innerHTML = ''

}