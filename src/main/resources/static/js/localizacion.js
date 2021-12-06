function iniciarMap(){

    var coord = {lat:4.6482837 ,lng: -74.2478938};
    var coord1 = {lat:4.6301115 ,lng: -74.1867521};
    var coord2 = {lat:4.6401115 ,lng: -74.1867521};


    var map = new google.maps.Map(document.getElementById('map'),{
      zoom: 10,
      center: coord2
    });


    var marker = new google.maps.Marker({
      position: coord2,
      map: map
    });

    var marker = new google.maps.Marker({
      position: coord1,
      map: map
    });
    var marker = new google.maps.Marker({
        position: coord,
        map: map
      });
  }
