const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { InspectorControls, InnerBlocks } = wp.blockEditor;
const { PanelBody, ToggleControl, __experimentalNumberControl } = wp.components;
const { useEffect } = wp.element;

registerBlockType( 'rk/slide', {
  title: 'Slide',
  icon: 'columns',
  category: 'rk-custom-blocks',
  attributes: {},
  edit: function() {
    return (
      <div className="rk-slide-editor" >
        <p className="rk-slide-editor__title">Slide</p>
        <InnerBlocks />
      </div>
    )
  },
  save: function() {
    return (
      <div className="rk-slide swiper-slide" >
        <InnerBlocks.Content />
      </div>
    );
  }
});

registerBlockType( 'rk/slider', {
  title: 'Slider',
  icon: 'images-alt',
  category: 'rk-custom-blocks',

  attributes: {
    hasAutoscroll: {
      type: 'boolean',
      default: 'true',
    },
    hasArrows: {
      type: 'boolean',
      default: 'true',
    },
    hasDots: {
      type: 'boolean',
      default: 'true',
    },
    autoscrollDuration: {
      type: 'number',
      default: 5
    },
    mobileBreakpoint: {
      type: 'number',
      default: 576,
    },
    tabletBreakpoint: {
      type: 'number',
      default: 992,
    },
    laptopBreakpoint: {
      type: 'number',
      default: 1200,
    },
    desktopBreakpoint: {
      type: 'number',
      default: 1400,
    },
    slidesOnMobile: {
      type: 'number',
      default: 1
    },
    slidesOnTablet: {
      type: 'number',
      default: 2
    },
    slidesOnLaptop: {
      type: 'number',
      default: 3
    },
    slidesOnDesktop: {
      type: 'number',
      default: 3
    },
    slidesOnHugeDesktop: {
      type: 'number',
      default: 3
    },
    jsonConfigs: {
      type: 'string'
    }
  },

  edit: function( {attributes, setAttributes} ) {
    function generateJson(){
      return `{
        ${attributes.hasAutoscroll ? ` "autoplay": {"delay": ${attributes.autoscrollDuration * 1000}},` : ``}
        "slidesPerView": ${attributes.slidesOnMobile},
        "spaceBetween": 0,
        "breakpoints":{ 
          "${attributes.mobileBreakpoint}": { 
            "slidesPerView": ${attributes.slidesOnTablet}
          }, 
          "${attributes.tabletBreakpoint}": { 
            "slidesPerView": ${attributes.slidesOnLaptop}
          },
          "${attributes.laptopBreakpoint}": {
            "slidesPerView": ${attributes.slidesOnDesktop}
          },
          "${attributes.desktopBreakpoint}": {
            "slidesPerView": ${attributes.slidesOnHugeDesktop}
          }
        }
      }`;
    }

    useEffect(() => {
      setAttributes( { jsonConfigs: generateJson() } );
    });

    return (
      <>
        <InspectorControls>
          <PanelBody
              title={ __( 'Block Settings', 'rk' ) }
              initialOpen={ true }
            >
              <ToggleControl 
                label={ __( 'Autoscroll', 'rk' ) }
                help={
                  attributes.hasAutoscroll
                      ? 'Will autosroll'
                      : 'Will not autosroll'
                }
                checked={ attributes.hasAutoscroll }
                onChange={ ( newval ) => setAttributes( {hasAutoscroll: newval} ) }
              />
              { ( attributes.hasAutoscroll ) && (
              <>
                <__experimentalNumberControl
                  label = {  __('Duration of autoscroll in seconds') }
                  isShiftStepEnabled={ true }
                  onChange={ ( newval ) => setAttributes( { autoscrollDuration: newval } )}
                  shiftStep={ 1 }
                  step={ 0.1 }
                  min = { 0.1 }
                  value={ attributes.autoscrollDuration }
                />
              </>
              )}
              <ToggleControl 
                label={ __( 'Arrows', 'rk' ) }
                help={
                  attributes.hasArrows
                      ? 'Arrows enabled'
                      : 'Arrows disabled'
                }
                checked={ attributes.hasArrows }
                onChange={ ( newval ) => setAttributes( { hasArrows: newval } ) }
              />
              <ToggleControl 
                label={ __( 'Dots', 'rk' ) }
                help={
                  attributes.hasDots
                      ? 'Dots enabled'
                      : 'Dots disabled'
                }
                checked={ attributes.hasDots }
                onChange={ ( newval ) => setAttributes( { hasDots: newval } ) }
              />
          </PanelBody>
          
        </InspectorControls>
        <div className={ 'rk-slider' } >
          <InnerBlocks allowedBlocks={ ['rk/slide'] }
            template={ [
              [ 'rk/slide', {} ],
              [ 'rk/slide', {} ],
              [ 'rk/slide', {} ],
            ] }
          />
        </div>
      </>
    )
  },

  save: function( {attributes} ) {
    return (
      <div className="rk-slider swiper-container" data-config={attributes.jsonConfigs}>
        <div className="swiper-wrapper">
          <InnerBlocks.Content />
        </div>
      </div>
    );
  }
} );
