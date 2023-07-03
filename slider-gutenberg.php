<?php
/*
  Plugin Name: Slider Gutenberg
  Description: Slider for Wordpress Gutenberg
  Author: RK
  Version: 1.0.0
*/

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! defined( 'SLIDER_PLUGIN_DIR' ) ) {
  define( 'SLIDER_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
}

function rk_slider_gutenberg_init() {
  require_once SLIDER_PLUGIN_DIR . '/register-block.php';
}

add_action( 'plugins_loaded', 'rk_slider_gutenberg_init' );