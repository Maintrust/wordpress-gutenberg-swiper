window.addEventListener( 'load', initSliders );

function initSliders() {
	let swiperBundle = document.getElementById( 'rk-swiper-bundle' );

	if ( ! swiperBundle ) {
		swiperBundle = document.createElement( 'script' );
		swiperBundle.src = 'https://cdnjs.cloudflare.com/ajax/libs/Swiper/9.4.1/swiper-bundle.min.js';
		swiperBundle.id = 'rk-swiper-bundle';
		swiperBundle.defer = true;
		document.body.append( swiperBundle );
		swiperBundle.onload = generateSliders;
	}
}

function generateSliders() {
	Array.from( document.querySelectorAll( '.rk-slider' ) || [] )
		.forEach( ( slider ) => {
			const [ prev ] = slider.querySelectorAll( '.swiper-prev' );
			const [ next ] = slider.querySelectorAll( '.swiper-next' );
			const [ pagination ] = slider.querySelectorAll( '.swiper-pagination' );

			const config = JSON.parse( slider.dataset.config );

			const swiperConfig = {
				...pagination && {
					pagination: {
						el: pagination,
						clickable: true,
					},
				},
				...( next && prev ) && {
					navigation: {
						nextEl: next,
						prevEl: prev,
					},
				},
				...config,
			};

			new window.Swiper( slider, swiperConfig );
		} );
}
