$(document).ready(() => {
	if ($('input[type="checkbox"]:checked').length > 0 == true) $('input[type="checkbox"]:checked').prop("checked", false);

	// aqui va el checkcito
	let check = {}
	$(document).on('change', 'input[type="checkbox"]', function () {
		if (!this.checked) delete check[$(this).data('id')]
		else check[$(this).data('id')] = $(this).data('name')

		let obj = Object.values(check)
		if (obj < 0) $('div.amenities > h4')
		$('div.amenities > h4').text(Object.values(check).join(', '))
	})


	// check api status
	let api = 'http://127.0.0.1:5001/api/v1/status/'
	$.get(api, (data, code) => {
		if (code == 'success') {
			if (data.status != 'OK') $('#api_status').removeClass('available')
			$('#api_status').addClass('available')
		}
	})

  // append places to the places
  const template = `<article>
	  <div class="title_box">
	    <h2>{{ place.name }}</h2>
	    <div class="price_by_night"></div>
	  </div>
	  <div class="information">
	    <div class="max_guest">{{ place.max_guest }} Guest{% if place.max_guest != 1 %}s{% endif %}</div>
            <div class="number_rooms">{{ place.number_rooms }} Bedroom{% if place.number_rooms != 1 %}s{% endif %}</div>
            <div class="number_bathrooms">{{ place.number_bathrooms }} Bathroom{% if place.number_bathrooms != 1 %}s{% endif %}</div>
	  </div>
	  <div class="user">
            <b>Owner:</b> {{ place.user.first_name }} {{ place.user.last_name }}
          </div>
          <div class="description">
	    {{ place.description | safe }}
  </div>
</article>`
	$.ajax({
		type: 'POST',
		url: 'http://127.0.0.1:5001/api/v1/places_search',
		data: '{}',
		dataType: 'json',
		contentType: 'application/json',
		success: function (data) {
			for (let i = 0; i < data.length; i++) {
				let place = data[i];
				let placeHolder = `
				<article>
				<h2>${place.name}</h2>
				<div class="price_by_night"><p>$ ${place.price_by_night}</p></div>
				<div class="information">
				<div class="max_guest">
				<div class="guest_image">
				</div>
				<p>${place.max_guest}</p>
				</div>
				<div class="number_rooms"><div class="bed_image"></div><p>${place.number_rooms}</p>
				</div>
				<div class="number_bathrooms"><div class="bath_image"></div>
				<p>${place.number_bathrooms}</p>
				</div>
				</div>
				<div class="description"><p>${place.description}</p></div>
				</article>
				`
				$('.places ').append(placeHolder);
			}
		}
	});
});