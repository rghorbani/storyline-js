/*
    StorylineJS
    This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
    If a copy of the MPL was not distributed with this file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/
if (typeof generator_embed_path == "undefined" || typeof generator_embed_path == "undefined") {
    var generator_embed_path = getScriptPath("storyjs-embed-generator.js").split("js/")[0];
    if (generator_embed_path.match("http")) {
        generator_embed_path = generator_embed_path
    } else if (generator_embed_path == "/") {
        generator_embed_path = "index.html"
    } else {
        generator_embed_path = generator_embed_path + "index.html"
    }
}

function getScriptPath(scriptname) {
    var scriptTags = document.getElementsByTagName("script"),
        script_path = "";
    for (var i = 0; i < scriptTags.length; i++) {
        if (scriptTags[i].src.match(scriptname)) {
            script_path = scriptTags[i].src
        }
    }
    return script_path.split("?")[0].split("/").slice(0, -1).join("/") + "/"
}

function getUrlVars(string) {
    var vars = [],
        hash, hashes, str = string.toString();
    if (str.match("&#038;")) {
        str = str.replace("&#038;", "&")
    } else if (str.match("&#38;")) {
        str = str.replace("&#38;", "&")
    } else if (str.match("&amp;")) {
        str = str.replace("&amp;", "&")
    }
    if (str.match("#")) {
        str = str.split("#")[0]
    }
    hashes = str.slice(str.indexOf("?") + 1).split("&");
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split("=");
        vars.push(hash[0]);
        vars[hash[0]] = hash[1]
    }
    return vars
}

function getLinkAndIframe() {
    var theobj = {},
        e_source = document.getElementById("embed-source-url"),
        e_width = document.getElementById("embed-width"),
        e_height = document.getElementById("embed-height"),
        e_maptype = document.getElementById("embed-maptype"),
        e_language = document.getElementById("embed-language"),
        e_embed = document.getElementById("embed_code"),
        e_font = document.getElementById("embed-font"),
        e_wordpress = document.getElementById("embed-wordpressplugin"),
        e_startatend = document.getElementById("embed-startatend"),
        e_hashbookmark = document.getElementById("embed-hashbookmark"),
        e_startzoomadjust = document.getElementById("embed-startzoomadjust"),
        e_startatslide = document.getElementById("embed-startatslide"),
        e_debug = document.getElementById("embed-debug"),
        e_googlemapkey = document.getElementById("embed-googlemapkey"),
        start_at_end = false,
        hash_bookmark = false,
        is_debug = false,
        iframe, link, vars, wp, source_key;
    if (e_source.value.match("docs.google.com")) {
        source_key = VMM.Timeline.DataObj.model.googlespreadsheet.extractSpreadsheetKey(e_source.value)
    } else {
        if (e_source.value == "") {
            source_key = "0Agl_Dv6iEbDadHdKcHlHcTB5bzhvbF9iTWwyMmJHdkE"
        } else {
            source_key = e_source.value
        }
    }
    if (e_startatend.checked) {
        start_at_end = true
    }
    if (e_hashbookmark.checked) {
        hash_bookmark = true
    }
    if (e_debug.checked) {
        is_debug = true
    }
    wp = "[timeline ";
    if (e_width.value > 0) {
        wp += "width='" + e_width.value + "' "
    }
    if (e_height.value > 0) {
        wp += "height='" + e_width.value + "' "
    }
    wp += "font='" + e_font.value + "' ";
    wp += "maptype='" + e_maptype.value + "' ";
    wp += "lang='" + e_language.value + "' ";
    wp += "src='" + e_source.value + "' ";
    if (start_at_end) {
        wp += "start_at_end='" + start_at_end + "' "
    }
    if (hash_bookmark) {
        wp += "hash_bookmark='" + hash_bookmark + "' "
    }
    if (is_debug) {
        wp += "debug='" + is_debug + "' "
    }
    if (e_googlemapkey.value != "") {
        wp += "gmap_key='" + e_googlemapkey.value + "' "
    }
    if (parseInt(e_startatslide.value, 10) > 0) {
        wp += "start_at_slide='" + parseInt(e_startatslide.value, 10) + "' "
    }
    if (parseInt(e_startzoomadjust.value, 10) > 0) {
        wp += "start_zoom_adjust='" + parseInt(e_startzoomadjust.value, 10) + "' "
    }
    wp += "]";
    theobj.wordpress = wp;
    vars = generator_embed_path + "?source=" + source_key;
    vars += "&font=" + e_font.value;
    vars += "&maptype=" + e_maptype.value;
    vars += "&lang=" + e_language.value;
    if (start_at_end) {
        vars += "&start_at_end=" + start_at_end
    }
    if (hash_bookmark) {
        vars += "&hash_bookmark=" + hash_bookmark
    }
    if (is_debug) {
        vars += "&debug=" + is_debug
    }
    if (parseInt(e_startatslide.value, 10) > 0) {
        vars += "&start_at_slide=" + parseInt(e_startatslide.value, 10)
    }
    if (parseInt(e_startzoomadjust.value, 10) > 0) {
        vars += "&start_zoom_adjust=" + parseInt(e_startzoomadjust.value, 10)
    }
    if (e_googlemapkey.value != "") {
        vars += "&gmap_key=" + e_googlemapkey.value
    }
    if (e_width.value > 0) {
        vars += "&width=" + e_width.value
    }
    if (e_height.value > 0) {
        vars += "&height=" + e_height.value
    }
    iframe = "<iframe src='" + vars + "'";
    if (e_width.value > 0 || e_width.value.match("%")) {
        iframe += " width='" + e_width.value + "'"
    }
    if (e_height.value > 0 || e_height.value.match("%")) {
        iframe += " height='" + e_height.value + "'"
    }
    iframe += " frameborder='0'></iframe>";
    theobj.iframe = iframe;
    theobj.link = vars;
    if (e_wordpress.checked) {
        theobj.copybox = wp
    } else {
        theobj.copybox = iframe
    }
    return theobj
}

function updateEmbedCode(element, options) {
    var e_embed = document.getElementById("embed_code"),
        el = getLinkAndIframe();
    e_embed.value = el.copybox;
    jQuery("#preview-embed-link").attr("href", el.link);
    jQuery("#preview-embed-iframe").html(el.iframe);
    jQuery("#preview-embed").css("display", "block")
}