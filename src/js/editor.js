const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { InspectorControls, InnerBlocks } = wp.blockEditor;
const { PanelBody, ToggleControl, __experimentalNumberControl, RangeControl, TextControl, TextareaControl, ColorPalette } = wp.components;
const { useEffect } = wp.element;
import SlidesAndResponsive from './slider-responsive-ui.js';

registerBlockType( 'rk/slide', {
	title: 'Slide',
	icon: 'columns',
	category: 'rk-custom-blocks',
	attributes: {},
	edit() {
		return (
			<div className="rk-slide-editor">
				<p className="rk-slide-editor__title">Slide</p>
				<InnerBlocks />
			</div>
		);
	},
	save() {
		return (
			<div className="rk-slide swiper-slide" >
				<InnerBlocks.Content />
			</div>
		);
	},
} );

registerBlockType( 'rk/slider', {
	title: 'Slider',
	icon: 'images-alt',
	category: 'rk-custom-blocks',

	attributes: {
		hasAutoscroll: {
			type: 'boolean',
			default: false,
		},
		hasArrows: {
			type: 'boolean',
			default: false,
		},
		prevArrowString: {
			type: 'string',
			default: '<svg width="22" height="22" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="11" fill="#D9D9D9"/><path d="m13 6-5 5 5 5" stroke="#000" stroke-linecap="round" stroke-linejoin="round"/></svg>',
		},
		nextArrowString: {
			type: 'string',
			default: '<svg width="22" height="22" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="11" transform="rotate(-180 11 11)" fill="#D9D9D9"/><path d="m9 16 5-5-5-5" stroke="#000" stroke-linecap="round" stroke-linejoin="round"/></svg>',
		},
		hasDots: {
			type: 'boolean',
			default: false,
		},
		dotsStyles: {
			type: 'object',
			default: {
				gap: '4px',
				width: '8px',
				height: '8px',
				borderRadius: '50%',
				colorActive: '#007aff',
				colorInactive: '#000',
				opacityActive: 1,
				opacityInactive: .3,
			},
		},
		dotsGeneratedStyles: {
			type: 'string',
		},
		autoscrollDuration: {
			type: 'number',
			default: 5000,
		},
		breakpointMobile: {
			type: 'number',
			default: 576,
		},
		breakpointTablet: {
			type: 'number',
			default: 992,
		},
		breakpointLaptop: {
			type: 'number',
			default: 1200,
		},
		breakpointDesktop: {
			type: 'number',
			default: 1400,
		},
		slidesOnMobile: {
			type: 'number',
			default: 1,
		},
		slidesOnTablet: {
			type: 'number',
			default: 2,
		},
		slidesOnLaptop: {
			type: 'number',
			default: 3,
		},
		slidesOnDesktop: {
			type: 'number',
			default: 3,
		},
		slidesOnHugeDesktop: {
			type: 'number',
			default: 3,
		},
		spaceBetweenMobile: {
			type: 'number',
			default: 25,
		},
		spaceBetweenTablet: {
			type: 'number',
			default: 25,
		},
		spaceBetweenLaptop: {
			type: 'number',
			default: 25,
		},
		spaceBetweenDesktop: {
			type: 'number',
			default: 25,
		},
		spaceBetweenHugeDesktop: {
			type: 'number',
			default: 25,
		},
		jsonConfigs: {
			type: 'string',
		},
	},

	edit( { attributes, setAttributes } ) {
		useEffect( () => { //eslint-disable-line react-hooks/rules-of-hooks
			setAttributes( { jsonConfigs: generateJson() } );
		} );

		useEffect( () => { //eslint-disable-line react-hooks/rules-of-hooks
			setAttributes( { dotsGeneratedStyles: generateDotsStyles() } );
		} );
		function generateJson() {
			return `{
        ${ attributes.hasAutoscroll ? ` "autoplay": {"delay": ${ attributes.autoscrollDuration }},` : `` }
        "slidesPerView": ${ attributes.slidesOnMobile },
        "spaceBetween": "${ attributes.spaceBetweenMobile }px",
        "breakpoints":{ 
          "${ attributes.breakpointMobile }": { 
            "slidesPerView": ${ attributes.slidesOnTablet },
            "spaceBetween": "${ attributes.spaceBetweenTablet }px"
          }, 
          "${ attributes.breakpointTablet }": { 
            "slidesPerView": ${ attributes.slidesOnLaptop },
            "spaceBetween": "${ attributes.spaceBetweenLaptop }px"
          },
          "${ attributes.breakpointLaptop }": {
            "slidesPerView": ${ attributes.slidesOnDesktop },
            "spaceBetween": "${ attributes.spaceBetweenDesktop }px"
          },
          "${ attributes.breakpointDesktop }": {
            "slidesPerView": ${ attributes.slidesOnHugeDesktop },
            "spaceBetween": "${ attributes.spaceBetweenHugeDesktop }px"
          }
        }
      }`;
		}

		function generateDotsStyles() {
			return `
      :root {
        --swiper-pagination-bullet-horizontal-gap: ${ attributes.dotsStyles.gap };
        --swiper-pagination-bullet-width: ${ attributes.dotsStyles.width };
        --swiper-pagination-bullet-height: ${ attributes.dotsStyles.height };
        --swiper-pagination-bullet-border-radius: ${ attributes.dotsStyles.borderRadius };
        --swiper-pagination-color: ${ attributes.dotsStyles.colorActive };
        --swiper-pagination-bullet-inactive-color: ${ attributes.dotsStyles.colorInactive };
        --swiper-pagination-bullet-opacity: ${ attributes.dotsStyles.opacityActive };
        --swiper-pagination-bullet-inactive-opacity: ${ attributes.dotsStyles.opacityInactive };
      }
      `;
		}

		function setObjectAttribute( obj, objName, property, value ) {
			const newObj = structuredClone( obj );
			newObj[ property ] = value;
			setAttributes( { [ objName ]: newObj } );
		}

		function setDotsObject( property, value ) {
			return setObjectAttribute( attributes.dotsStyles, 'dotsStyles', property, value );
		}

		return (
			<>
				<InspectorControls>
					<PanelBody
						title={ __( 'Common Settings', 'rk' ) }
						initialOpen={ true }
					>
						<ToggleControl
							label={ __( 'Autoscroll', 'rk' ) }
							checked={ attributes.hasAutoscroll }
							onChange={ ( value ) => setAttributes( { hasAutoscroll: value } ) }
						/>
						{ ( attributes.hasAutoscroll ) && (
							<>
								<__experimentalNumberControl
									label={ __( 'Duration of autoscroll in miliseconds', 'rk' ) }
									isShiftStepEnabled={ true }
									onChange={ ( value ) => setAttributes( { autoscrollDuration: value } ) }
									shiftStep={ 100 }
									step={ 100 }
									min={ 100 }
									value={ attributes.autoscrollDuration }
								/>
							</>
						) }
						<ToggleControl
							label={ __( 'Arrows', 'rk' ) }
							checked={ attributes.hasArrows }
							onChange={ ( value ) => setAttributes( { hasArrows: value } ) }
						/>
						{ ( attributes.hasArrows ) && (
							<>
								<TextareaControl
									label={ __( 'Left arrow SVG code', 'rk' ) }
									value={ attributes.prevArrowString }
									onChange={ ( value ) => setAttributes( { prevArrowString: value } ) }
								/>
								<TextareaControl
									label={ __( 'Right arrow SVG code', 'rk' ) }
									value={ attributes.nextArrowString }
									onChange={ ( value ) => setAttributes( { nextArrowString: value } ) }
								/>
							</>
						) }
						<ToggleControl
							label={ __( 'Dots', 'rk' ) }
							checked={ attributes.hasDots }
							onChange={ ( value ) => setAttributes( { hasDots: value } ) }
						/>
						{ ( attributes.hasDots ) && (
							<>
								<TextControl
									label={ __( 'Dot gap', 'rk' ) }
									value={ attributes.dotsStyles.gap }
									onChange={ ( value ) => setDotsObject( 'gap', value ) }
								/>
								<TextControl
									label={ __( 'Dot width', 'rk' ) }
									value={ attributes.dotsStyles.width }
									onChange={ ( value ) => setDotsObject( 'width', value ) }
								/>
								<TextControl
									label={ __( 'Dot height', 'rk' ) }
									value={ attributes.dotsStyles.height }
									onChange={ ( value ) => setDotsObject( 'height', value ) }
								/>
								<TextControl
									label={ __( 'Dot border radius', 'rk' ) }
									value={ attributes.dotsStyles.borderRadius }
									onChange={ ( value ) => setDotsObject( 'borderRadius', value ) }
								/>
								<p>
									ACTIVE DOT COLOR
								</p>
								<ColorPalette
									value={ attributes.dotsStyles.colorActive }
									onChange={ ( value ) => setDotsObject( 'colorActive', value ) }
								/>
								<p>
									INACTIVE DOT COLOR
								</p>
								<ColorPalette
									value={ attributes.dotsStyles.colorInactive }
									onChange={ ( value ) => setDotsObject( 'colorInactive', value ) }
								/>
								<RangeControl
									label={ __( 'Active dot opacity', 'rk' ) }
									value={ attributes.dotsStyles.opacityActive }
									onChange={ ( value ) => setDotsObject( 'opacityActive', value ) }
									step={ 0.1 }
									min={ 0 }
									max={ 1 }
								/>
								<RangeControl
									label={ __( 'Inactive dot opacity', 'rk' ) }
									value={ attributes.dotsStyles.opacityInactive }
									onChange={ ( value ) => setDotsObject( 'opacityInactive', value ) }
									step={ 0.1 }
									min={ 0 }
									max={ 1 }
								/>
							</>
						) }
					</PanelBody>
					<SlidesAndResponsive attributes={ attributes } setAttributes={ setAttributes } sizename={ 'Mobile' } />

					<SlidesAndResponsive attributes={ attributes } setAttributes={ setAttributes } sizename={ 'Tablet' } />

					<SlidesAndResponsive attributes={ attributes } setAttributes={ setAttributes } sizename={ 'Laptop' } />

					<SlidesAndResponsive attributes={ attributes } setAttributes={ setAttributes } sizename={ 'Desktop' } />

					<SlidesAndResponsive attributes={ attributes } setAttributes={ setAttributes } sizename={ 'HugeDesktop' } />

				</InspectorControls>
				<div className={ 'rk-slider' } >
					<InnerBlocks allowedBlocks={ [ 'rk/slide' ] }
						template={ [
							[ 'rk/slide', {} ],
							[ 'rk/slide', {} ],
							[ 'rk/slide', {} ],
							[ 'rk/slide', {} ],
						] }
					/>
					{ ( attributes.hasArrows ) && (
						<>
							<div
								className="swiper-prev"
								dangerouslySetInnerHTML={ { __html: attributes.prevArrowString } }
							/>
							<div
								className="swiper-next"
								dangerouslySetInnerHTML={ { __html: attributes.nextArrowString } }
							/>
						</>
					) }

					{ ( attributes.hasDots ) && (
						<>
							<style>{ attributes.dotsGeneratedStyles }</style>
							<div className="swiper-pagination swiper-pagination-bullets swiper-pagination-horizontal">
								<span className="swiper-pagination-bullet" />
								<span className="swiper-pagination-bullet swiper-pagination-bullet-active" />
								<span className="swiper-pagination-bullet" />
							</div>
						</>
					) }

				</div>
			</>
		);
	},

	save( { attributes } ) {
		return (
			<div className="rk-slider swiper-container" data-config={ attributes.jsonConfigs }>
				<div className="swiper-wrapper">
					<InnerBlocks.Content />
				</div>
				{ ( attributes.hasArrows ) && (
					<>
						<div
							className="swiper-prev"
							dangerouslySetInnerHTML={ { __html: attributes.prevArrowString } }
						></div>
						<div
							className="swiper-next"
							dangerouslySetInnerHTML={ { __html: attributes.nextArrowString } }
						></div>
					</>
				) }
				{ ( attributes.hasDots ) && (
					<>
						<style>{ attributes.dotsGeneratedStyles }</style>
						<div className="swiper-pagination" />
					</>
				) }
			</div>
		);
	},
} );
