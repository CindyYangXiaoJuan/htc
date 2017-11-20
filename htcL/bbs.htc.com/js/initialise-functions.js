/* 
 * ===============================================================
 * ON DOCUMENT READY
 * ===============================================================
 */
function initialise_document_ready_functions()
{
 
    // Initialise Main Menu  
    // on page load, initialise menu functionality depending on window width
    if (viewport().width >= window.xs_screen_max)
    { 
        initialise_main_menu_horizontal_functionality(); 
    }
    else 
    { 
        initialise_main_menu_mobile_functionality(); 
    }

    // Main menu - tablet viewport fix - allow opening of submenus when menu items clicked
    initialise_tablet_mainmenu_submenu_fix();

    // initialise subpages sidebar menu functionality
    initialise_submenu_functionality();

    // Initialise Top Banner Carousel (Owl Carousel)
    var top_banner_carousel = $("#top-banner-carousel");
    if (top_banner_carousel.length > 0)
    {
        top_banner_carousel.owlCarousel({
          singleItem: true,
          slideSpeed: 300,
          paginationSpeed: 700,
          autoPlay: 3500,
          lazyLoad: true,
          rewindNav: true,
          mouseDrag: true,
          touchDrag: true,
          stopOnHover: false,
          pagination: false,
          navigation: false,
          autoHeight : true,
          transitionStyle: "fade",
          afterMove: function(owl) {
            var base = this;
            if (base.currentItem+1 == base.itemsAmount) {
              base.apStatus = "stop";
              window.clearInterval(base.autoPlayInterval);
              setTimeout(function(){ base.jumpTo(0);base.play() }, 3500);
            }
          }
        });

        // left nav
        if (top_banner_carousel.parent().find(".slider-nav-left").length == 1)
        {
            top_banner_carousel.parent().find(".slider-nav-left").click(function(){
                top_banner_carousel.trigger('owl.prev');
            });  
        }

        // right nav
        if (top_banner_carousel.parent().find(".slider-nav-right").length == 1)
        {
            top_banner_carousel.parent().find(".slider-nav-right").click(function(){
                top_banner_carousel.trigger('owl.next');
            });  
        }
        
    }

    // Initialise Affiliates Slider 2 Columns (Owl Carousel)
    var affiliates_carousel_2cols = $("#affiliates-slider-2cols");
    if (affiliates_carousel_2cols.length > 0)
    {
        affiliates_carousel_2cols.owlCarousel({
            singleItem: true,
            slideSpeed: 300,
            paginationSpeed: 700,
            autoPlay: 7000,
            lazyLoad: false,
            stopOnHover: true,
            pagination: false,
            navigation: false,
            autoHeight : true
        }); 
    }

    // Initialise Affiliates Slider 4 Columns (Owl Carousel)
    var affiliates_carousel_4cols = $("#affiliates-slider-4cols");
    if (affiliates_carousel_4cols.length > 0)
    {
        affiliates_carousel_4cols.owlCarousel({
            items: 4,
            itemsDesktop: [1199,4],
            itemsDesktopSmall: [979,4],
            itemsTablet: [768,4],
            itemsMobile: [479,4],
            slideSpeed: 300,
            paginationSpeed: 700,
            autoPlay: 4000,
            lazyLoad: false,
            stopOnHover: true,
            pagination: false,
            navigation: false,
            autoHeight : true
        }); 
    }

    // Initialise Full Page Content Slider
    var full_page_content_slider = $("#full-page-content-slider");
    if (full_page_content_slider.length > 0)
    {
        full_page_content_slider.owlCarousel({
            singleItem: true,
            slideSpeed: 400,
            paginationSpeed: 700,
            autoPlay: 7000,
            lazyLoad: true,
            stopOnHover: true,
            pagination: false,
            navigation: false,
            autoHeight : true
        }); 

        // initialise slider custom navigation arrows
        var fullpage_slider_arrow_left = $("#fullpage-slider-arrow-left");
        if (fullpage_slider_arrow_left.length > 0)
        {
            fullpage_slider_arrow_left.click(function(){
                full_page_content_slider.trigger('owl.next');
            }); 
        }
        var fullpage_slider_arrow_right = $("#fullpage-slider-arrow-right");
        if (fullpage_slider_arrow_right.length > 0)
        {
            fullpage_slider_arrow_right.click(function(){
                full_page_content_slider.trigger('owl.prev');
            }); 
        }
    }

    // initialise form validation and submit functions 
    validate_and_submit_forms();

    // initialise menu search Icon visiblity / click actions
    mainmenu_search_icon();

    /* 
     * ----------------------------------------------------------
     * ON WINDOW RESIZE
     * ----------------------------------------------------------
     */
    $(window).resize(function()
    { 
        // on window resize, initialise menu functionality depending on window width
        if (viewport().width >= window.xs_screen_max)
        { 
            initialise_main_menu_horizontal_functionality(); 
        }
        else 
        { 
            initialise_main_menu_mobile_functionality(); 
        }

        // Main Menu Fixed at top on scroll
        // (the parameter 'true' is set to re-calculate the top menu original top offset)
        main_menu_fixed_at_top_on_scroll(true);

        // set equal heights to all horizontal list items with ".equal-height" class
        set_equal_heights_to_list_items();

        // set equal heights to horizontal section columns (if isolated-sections enabled)
        set_equal_heights_to_section_columns();

    });
    // end: on window resize

    /* 
     * ----------------------------------------------------------
     * ON WINDOW SCROLL
     * ----------------------------------------------------------
     */
    $(window).scroll(function()
    { 
        // Main Menu Fixed at top on scroll
        main_menu_fixed_at_top_on_scroll();

        // update scroll to top icon visibility
        go_to_top_visibility();        
    });
    // end: on window scroll

}
// end: initialise_document_ready_functions()

$(document).ready(function()
{
    initialise_document_ready_functions();
});

 /* 
 * ===============================================================
 * ON WINDOW LOAD (after all elements were loaded)
 * ===============================================================
 */

function initialise_window_load_functions()
{

    // Main Menu Fixed at top on scroll
    // (the parameter 'true' is set to calculate the top menu original top offset)
    // this is included in window.load in order for the header images to be loaded first
    main_menu_fixed_at_top_on_scroll(true);

    // set equal heights to all horizontal list items with ".equal-height" class
    set_equal_heights_to_list_items();

    // set equal heights to horizontal section columns (if isolated-sections enabled)
    set_equal_heights_to_section_columns();

    // Load Blog Masonry
    var blog_masonry = $(".blog-articles-container.masonry-list");
    if (blog_masonry.length > 0)
    {
        blog_masonry.each(function()
        {
            $(this).masonry({
              itemSelector: '.blog-article'
            });
        });
    }

    // Load Gallery Masonry
    var gallery_masonry = $(".gallery-masonry");
    if (gallery_masonry.length > 0)
    {
        gallery_masonry.each(function()
        {
            $(this).masonry({
              itemSelector: '.gallery-item'
            });
        });
    }

    // Fade In Gallery images after all images are loaded
    fade_in_gallery_images();

}
// end: initialise_window_load_functions()

$(window).load(function()
{
    initialise_window_load_functions();
});