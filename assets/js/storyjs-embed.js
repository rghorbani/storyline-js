/*
    TimelineJS - ver. 2.35.5 - 2015-02-26
    Copyright (c) 2012-2013 Northwestern University
    a project of the Northwestern University Knight Lab, originally created by Zach Wise
    https://github.com/NUKnightLab/TimelineJS
    This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
    If a copy of the MPL was not distributed with this file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/
LazyLoad = function(doc) {
    var env, head, pending = {},
        pollCount = 0,
        queue = {
            css: [],
            js: []
        },
        styleSheets = doc.styleSheets;

    function createNode(name, attrs) {
        var node = doc.createElement(name),
            attr;
        for (attr in attrs) {
            if (attrs.hasOwnProperty(attr)) {
                node.setAttribute(attr, attrs[attr])
            }
        }
        return node
    }

    function finish(type) {
        var p = pending[type],
            callback, urls;
        if (p) {
            callback = p.callback;
            urls = p.urls;
            urls.shift();
            pollCount = 0;
            if (!urls.length) {
                callback && callback.call(p.context, p.obj);
                pending[type] = null;
                queue[type].length && load(type)
            }
        }
    }

    function getEnv() {
        var ua = navigator.userAgent;
        env = {
            async: doc.createElement("script").async === true
        };
        (env.webkit = /AppleWebKit\//.test(ua)) || (env.ie = /MSIE/.test(ua)) || (env.opera = /Opera/.test(ua)) || (env.gecko = /Gecko\//.test(ua)) || (env.unknown = true)
    }

    function load(type, urls, callback, obj, context) {
        var _finish = function() {
                finish(type)
            },
            isCSS = type === "css",
            nodes = [],
            i, len, node, p, pendingUrls, url;
        env || getEnv();
        if (urls) {
            urls = typeof urls === "string" ? [urls] : urls.concat();
            if (isCSS || env.async || env.gecko || env.opera) {
                queue[type].push({
                    urls: urls,
                    callback: callback,
                    obj: obj,
                    context: context
                })
            } else {
                for (i = 0, len = urls.length; i < len; ++i) {
                    queue[type].push({
                        urls: [urls[i]],
                        callback: i === len - 1 ? callback : null,
                        obj: obj,
                        context: context
                    })
                }
            }
        }
        if (pending[type] || !(p = pending[type] = queue[type].shift())) {
            return
        }
        head || (head = doc.head || doc.getElementsByTagName("head")[0]);
        pendingUrls = p.urls;
        for (i = 0, len = pendingUrls.length; i < len; ++i) {
            url = pendingUrls[i];
            if (isCSS) {
                node = env.gecko ? createNode("style") : createNode("link", {
                    href: url,
                    rel: "stylesheet"
                })
            } else {
                node = createNode("script", {
                    src: url
                });
                node.async = false
            }
            node.className = "lazyload";
            node.setAttribute("charset", "utf-8");
            if (env.ie && !isCSS) {
                node.onreadystatechange = function() {
                    if (/loaded|complete/.test(node.readyState)) {
                        node.onreadystatechange = null;
                        _finish()
                    }
                }
            } else if (isCSS && (env.gecko || env.webkit)) {
                if (env.webkit) {
                    p.urls[i] = node.href;
                    pollWebKit()
                } else {
                    node.innerHTML = '@import "' + url + '";';
                    pollGecko(node)
                }
            } else {
                node.onload = node.onerror = _finish
            }
            nodes.push(node)
        }
        for (i = 0, len = nodes.length; i < len; ++i) {
            head.appendChild(nodes[i])
        }
    }

    function pollGecko(node) {
        var hasRules;
        try {
            hasRules = !!node.sheet.cssRules
        } catch (ex) {
            pollCount += 1;
            if (pollCount < 200) {
                setTimeout(function() {
                    pollGecko(node)
                }, 50)
            } else {
                hasRules && finish("css")
            }
            return
        }
        finish("css")
    }

    function pollWebKit() {
        var css = pending.css,
            i;
        if (css) {
            i = styleSheets.length;
            while (--i >= 0) {
                if (styleSheets[i].href === css.urls[0]) {
                    finish("css");
                    break
                }
            }
            pollCount += 1;
            if (css) {
                if (pollCount < 200) {
                    setTimeout(pollWebKit, 50)
                } else {
                    finish("css")
                }
            }
        }
    }
    return {
        css: function(urls, callback, obj, context) {
            load("css", urls, callback, obj, context)
        },
        js: function(urls, callback, obj, context) {
            load("js", urls, callback, obj, context)
        }
    }
}(this.document);
LoadLib = function(doc) {
    var loaded = [];

    function isLoaded(url) {
        var i = 0,
            has_loaded = false;
        for (i = 0; i < loaded.length; i++) {
            if (loaded[i] == url) {
                has_loaded = true
            }
        }
        if (has_loaded) {
            return true
        } else {
            loaded.push(url);
            return false
        }
    }
    return {
        css: function(urls, callback, obj, context) {
            if (!isLoaded(urls)) {
                LazyLoad.css(urls, callback, obj, context)
            }
        },
        js: function(urls, callback, obj, context) {
            if (!isLoaded(urls)) {
                LazyLoad.js(urls, callback, obj, context)
            }
        }
    }
}(this.document);

var WebFontConfig;
var embed_path;
var _tmp_script_path;
var runningStoryline = function() {
    console.log('running story');
    if (typeof embed_path == "undefined") {
        _tmp_script_path = getEmbedScriptPath("storyjs-embed.js");
        embed_path = _tmp_script_path.substr(0, _tmp_script_path.lastIndexOf("js/"))
    }

    function getEmbedScriptPath(scriptname) {
        var scriptTags = document.getElementsByTagName("script"),
            script_path = "",
            script_path_end = "";
        for (var i = 0; i < scriptTags.length; i++) {
            if (scriptTags[i].src.match(scriptname)) {
                script_path = scriptTags[i].src
            }
        }
        if (script_path != "") {
            script_path_end = "/"
        }
        return script_path.split("?")[0].split("/").slice(0, -1).join("/") + script_path_end
    }(function() {
        if (typeof url_config == "object") {
            createStoryJS(url_config)
        } else if (typeof timeline_config == "object") {
            console.log('timeline config');
            createStoryJS(timeline_config)
        } else if (typeof storyjs_config == "object") {
            createStoryJS(storyjs_config)
        } else if (typeof config == "object") {
            createStoryJS(config)
        } else {}
    })();
}

function createChart(json_data) {
    setTimeout(function() {
        // var chart = d3.chart.architectureTree();
        // chart.data(json_data);
        // d3.select('#tree-chart').call(chart);
        treeJSON = d3.json('story.json', function(error, treeData) {

            treeData = json_data;
            console.log(treeData);

            // Calculate total nodes, max label length
            var totalNodes = 0;
            var maxLabelLength = 0;
            // variables for drag/drop
            var selectedNode = null;
            var draggingNode = null;
            // panning variables
            var panSpeed = 200;
            var panBoundary = 20; // Within 20px from edges will pan when dragging.
            // Misc. variables
            var i = 0;
            var duration = 750;
            var root;

            // size of the diagram
            $(".slider-item-container .slider-item:first-child .media").html('');
            var viewerWidth = $('.slider-item-container .slider-item:first-child .media').width();
            var viewerHeight = $('.slider-item-container .slider-item:first-child').height();

            var tree = d3.layout.tree()
                .size([viewerHeight, viewerWidth]);

            // define a d3 diagonal projection for use by the node paths later on.
            var diagonal = d3.svg.diagonal()
                .projection(function(d) {
                    return [d.y, d.x];
                });

            // A recursive helper function for performing some setup by walking through all nodes

            function visit(parent, visitFn, childrenFn) {
                if (!parent) return;

                visitFn(parent);

                var children = childrenFn(parent);
                if (children) {
                    var count = children.length;
                    for (var i = 0; i < count; i++) {
                        visit(children[i], visitFn, childrenFn);
                    }
                }
            }

            // Call visit function to establish maxLabelLength
            visit(treeData, function(d) {
                totalNodes++;
                maxLabelLength = Math.max(d.name.length, maxLabelLength);

            }, function(d) {
                return d.children && d.children.length > 0 ? d.children : null;
            });


            // sort the tree according to the node names

            function sortTree() {
                tree.sort(function(a, b) {
                    return b.name.toLowerCase() < a.name.toLowerCase() ? 1 : -1;
                });
            }
            // Sort the tree initially incase the JSON isn't in a sorted order.
            sortTree();

            // TODO: Pan function, can be better implemented.

            function pan(domNode, direction) {
                var speed = panSpeed;
                if (panTimer) {
                    clearTimeout(panTimer);
                    translateCoords = d3.transform(svgGroup.attr("transform"));
                    if (direction == 'left' || direction == 'right') {
                        translateX = direction == 'left' ? translateCoords.translate[0] + speed : translateCoords.translate[0] - speed;
                        translateY = translateCoords.translate[1];
                    } else if (direction == 'up' || direction == 'down') {
                        translateX = translateCoords.translate[0];
                        translateY = direction == 'up' ? translateCoords.translate[1] + speed : translateCoords.translate[1] - speed;
                    }
                    scaleX = translateCoords.scale[0];
                    scaleY = translateCoords.scale[1];
                    scale = zoomListener.scale();
                    svgGroup.transition().attr("transform", "translate(" + translateX + "," + translateY + ")scale(" + scale + ")");
                    d3.select(domNode).select('g.node').attr("transform", "translate(" + translateX + "," + translateY + ")");
                    zoomListener.scale(zoomListener.scale());
                    zoomListener.translate([translateX, translateY]);
                    panTimer = setTimeout(function() {
                        pan(domNode, speed, direction);
                    }, 50);
                }
            }

            // Define the zoom function for the zoomable tree

            function zoom() {
                svgGroup.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
            }


            // define the zoomListener which calls the zoom function on the "zoom" event constrained within the scaleExtents
            var zoomListener = d3.behavior.zoom().scaleExtent([0.1, 3]).on("zoom", zoom);

            function initiateDrag(d, domNode) {
                draggingNode = d;
                d3.select(domNode).select('.ghostCircle').attr('pointer-events', 'none');
                d3.selectAll('.ghostCircle').attr('class', 'ghostCircle show');
                d3.select(domNode).attr('class', 'node activeDrag');

                svgGroup.selectAll("g.node").sort(function(a, b) { // select the parent and sort the path's
                    if (a.id != draggingNode.id) return 1; // a is not the hovered element, send "a" to the back
                    else return -1; // a is the hovered element, bring "a" to the front
                });
                // if nodes has children, remove the links and nodes
                if (nodes.length > 1) {
                    // remove link paths
                    links = tree.links(nodes);
                    nodePaths = svgGroup.selectAll("path.link")
                        .data(links, function(d) {
                            return d.target.id;
                        }).remove();
                    // remove child nodes
                    nodesExit = svgGroup.selectAll("g.node")
                        .data(nodes, function(d) {
                            return d.id;
                        }).filter(function(d, i) {
                            if (d.id == draggingNode.id) {
                                return false;
                            }
                            return true;
                        }).remove();
                }

                // remove parent link
                parentLink = tree.links(tree.nodes(draggingNode.parent));
                svgGroup.selectAll('path.link').filter(function(d, i) {
                    if (d.target.id == draggingNode.id) {
                        return true;
                    }
                    return false;
                }).remove();

                dragStarted = null;
            }

            // define the baseSvg, attaching a class for styling and the zoomListener
            var baseSvg = d3.select(".slider-item-container .slider-item:first-child .media").append("svg")
                .attr("width", viewerWidth)
                .attr("height", viewerHeight)
                .attr("class", "overlay")
                .call(zoomListener);


            // Define the drag listeners for drag/drop behaviour of nodes.
            dragListener = d3.behavior.drag()
                .on("dragstart", function(d) {
                    if (d == root) {
                        return;
                    }
                    dragStarted = true;
                    nodes = tree.nodes(d);
                    d3.event.sourceEvent.stopPropagation();
                    // it's important that we suppress the mouseover event on the node being dragged. Otherwise it will absorb the mouseover event and the underlying node will not detect it d3.select(this).attr('pointer-events', 'none');
                })
                .on("drag", function(d) {
                    if (d == root) {
                        return;
                    }
                    if (dragStarted) {
                        domNode = this;
                        initiateDrag(d, domNode);
                    }

                    // get coords of mouseEvent relative to svg container to allow for panning
                    relCoords = d3.mouse($('svg').get(0));
                    if (relCoords[0] < panBoundary) {
                        panTimer = true;
                        pan(this, 'left');
                    } else if (relCoords[0] > ($('svg').width() - panBoundary)) {

                        panTimer = true;
                        pan(this, 'right');
                    } else if (relCoords[1] < panBoundary) {
                        panTimer = true;
                        pan(this, 'up');
                    } else if (relCoords[1] > ($('svg').height() - panBoundary)) {
                        panTimer = true;
                        pan(this, 'down');
                    } else {
                        try {
                            clearTimeout(panTimer);
                        } catch (e) {

                        }
                    }

                    d.x0 += d3.event.dy;
                    d.y0 += d3.event.dx;
                    var node = d3.select(this);
                    node.attr("transform", "translate(" + d.y0 + "," + d.x0 + ")");
                    updateTempConnector();
                }).on("dragend", function(d) {
                    if (d == root) {
                        return;
                    }
                    domNode = this;
                    if (selectedNode) {
                        // now remove the element from the parent, and insert it into the new elements children
                        var index = draggingNode.parent.children.indexOf(draggingNode);
                        if (index > -1) {
                            draggingNode.parent.children.splice(index, 1);
                        }
                        if (typeof selectedNode.children !== 'undefined' || typeof selectedNode._children !== 'undefined') {
                            if (typeof selectedNode.children !== 'undefined') {
                                selectedNode.children.push(draggingNode);
                            } else {
                                selectedNode._children.push(draggingNode);
                            }
                        } else {
                            selectedNode.children = [];
                            selectedNode.children.push(draggingNode);
                        }
                        // Make sure that the node being added to is expanded so user can see added node is correctly moved
                        expand(selectedNode);
                        sortTree();
                        endDrag();
                    } else {
                        endDrag();
                    }
                });

            function endDrag() {
                selectedNode = null;
                d3.selectAll('.ghostCircle').attr('class', 'ghostCircle');
                d3.select(domNode).attr('class', 'node');
                // now restore the mouseover event or we won't be able to drag a 2nd time
                d3.select(domNode).select('.ghostCircle').attr('pointer-events', '');
                updateTempConnector();
                if (draggingNode !== null) {
                    update(root);
                    centerNode(draggingNode);
                    draggingNode = null;
                }
            }

            // Helper functions for collapsing and expanding nodes.

            function collapse(d) {
                if (d.children) {
                    d._children = d.children;
                    d._children.forEach(collapse);
                    d.children = null;
                }
            }

            function expand(d) {
                if (d._children) {
                    d.children = d._children;
                    d.children.forEach(expand);
                    d._children = null;
                }
            }

            var overCircle = function(d) {
                selectedNode = d;
                updateTempConnector();
            };
            var outCircle = function(d) {
                selectedNode = null;
                updateTempConnector();
            };

            // Function to update the temporary connector indicating dragging affiliation
            var updateTempConnector = function() {
                var data = [];
                if (draggingNode !== null && selectedNode !== null) {
                    // have to flip the source coordinates since we did this for the existing connectors on the original tree
                    data = [{
                        source: {
                            x: selectedNode.y0,
                            y: selectedNode.x0
                        },
                        target: {
                            x: draggingNode.y0,
                            y: draggingNode.x0
                        }
                    }];
                }
                var link = svgGroup.selectAll(".templink").data(data);

                link.enter().append("path")
                    .attr("class", "templink")
                    .attr("d", d3.svg.diagonal())
                    .attr('pointer-events', 'none');

                link.attr("d", d3.svg.diagonal());

                link.exit().remove();
            };

            // Function to center node when clicked/dropped so node doesn't get lost when collapsing/moving with large amount of children.

            function centerNode(source) {
                scale = zoomListener.scale();
                x = -source.y0;
                y = -source.x0;
                x = x * scale + viewerWidth / 2;
                y = y * scale + viewerHeight / 2;
                d3.select('g').transition()
                    .duration(duration)
                    .attr("transform", "translate(" + x + "," + y + ")scale(" + scale + ")");
                zoomListener.scale(scale);
                zoomListener.translate([x, y]);
            }

            // Toggle children function

            function toggleChildren(d) {
                if (d.children) {
                    d._children = d.children;
                    d.children = null;
                } else if (d._children) {
                    d.children = d._children;
                    d._children = null;
                }
                return d;
            }

            // Toggle children on click.

            function click(d) {
                if (d3.event.defaultPrevented) return; // click suppressed
                d = toggleChildren(d);
                update(d);
                centerNode(d);
            }

            function update(source) {
                // Compute the new height, function counts total children of root node and sets tree height accordingly.
                // This prevents the layout looking squashed when new nodes are made visible or looking sparse when nodes are removed
                // This makes the layout more consistent.
                var levelWidth = [1];
                var childCount = function(level, n) {

                    if (n.children && n.children.length > 0) {
                        if (levelWidth.length <= level + 1) levelWidth.push(0);

                        levelWidth[level + 1] += n.children.length;
                        n.children.forEach(function(d) {
                            childCount(level + 1, d);
                        });
                    }
                };
                childCount(0, root);
                var newHeight = d3.max(levelWidth) * 60; // 50 pixels per line  
                tree = tree.size([newHeight, viewerWidth]);

                // Compute the new tree layout.
                var nodes = tree.nodes(root).reverse(),
                    links = tree.links(nodes);

                // Set widths between levels based on maxLabelLength.
                nodes.forEach(function(d) {
                    d.y = (d.depth * (maxLabelLength * 5)); //maxLabelLength * 10px
                    // alternatively to keep a fixed scale one can set a fixed depth per level
                    // Normalize for fixed-depth by commenting out below line
                    // d.y = (d.depth * 500); //500px per level.
                });

                // Update the nodes…
                node = svgGroup.selectAll("g.node")
                    .data(nodes, function(d) {
                        return d.id || (d.id = ++i);
                    });

                // Enter any new nodes at the parent's previous position.
                var nodeEnter = node.enter().append("g")
                    // .call(dragListener)
                    .attr("class", "node")
                    .attr("transform", function(d) {
                        return "translate(" + source.y0 + "," + source.x0 + ")";
                    });
                    // .on('click', function(d) {
                    //     main_timeline.goToEventOut(d.id);
                    // });
                    

                nodeEnter.append("circle")
                    .attr('class', 'nodeCircle')
                    .attr("r", 0)
                    .style("fill", function(d) {
                        return d._children ? "lightsteelblue" : "#fff";
                    })
                    .on('click', click);

                nodeEnter.append("text")
                    .attr("x", function(d) {
                        return d.children || d._children ? -10 : 10;
                    })
                    .attr("dy", ".35em")
                    .attr('class', 'nodeText')
                    .attr("text-anchor", function(d) {
                        return d.children || d._children ? "end" : "start";
                    })
                    .text(function(d) {
                        return d.name;
                    })
                    .style("fill-opacity", 0)
                    .on('click', function(d) {
                        main_timeline.goToEventOut(d.id);
                    });

                // phantom node to give us mouseover in a radius around it
                nodeEnter.append("circle")
                    .attr('class', 'ghostCircle')
                    .attr("r", 30)
                    .attr("opacity", 0.2) // change this to zero to hide the target area
                .style("fill", "red")
                    .attr('pointer-events', 'mouseover')
                    .on("mouseover", function(node) {
                        overCircle(node);
                    })
                    .on("mouseout", function(node) {
                        outCircle(node);
                    });

                // Update the text to reflect whether node has children or not.
                node.select('text')
                    .attr("x", function(d) {
                        return d.children || d._children ? -10 : 10;
                    })
                    .attr("text-anchor", function(d) {
                        return d.children || d._children ? "end" : "start";
                    })
                    .text(function(d) {
                        return d.name;
                    });

                // Change the circle fill depending on whether it has children and is collapsed
                node.select("circle.nodeCircle")
                    .attr("r", 4.5)
                    .style("fill", function(d) {
                        return d._children ? "lightsteelblue" : "#fff";
                    });

                // Transition nodes to their new position.
                var nodeUpdate = node.transition()
                    .duration(duration)
                    .attr("transform", function(d) {
                        return "translate(" + d.y + "," + d.x + ")";
                    });

                // Fade the text in
                nodeUpdate.select("text")
                    .style("fill-opacity", 1);

                // Transition exiting nodes to the parent's new position.
                var nodeExit = node.exit().transition()
                    .duration(duration)
                    .attr("transform", function(d) {
                        return "translate(" + source.y + "," + source.x + ")";
                    })
                    .remove();

                nodeExit.select("circle")
                    .attr("r", 0);

                nodeExit.select("text")
                    .style("fill-opacity", 0);

                // Update the links…
                var link = svgGroup.selectAll("path.link")
                    .data(links, function(d) {
                        return d.target.id;
                    });

                // Enter any new links at the parent's previous position.
                link.enter().insert("path", "g")
                    .attr("class", "link")
                    .attr("d", function(d) {
                        var o = {
                            x: source.x0,
                            y: source.y0
                        };
                        return diagonal({
                            source: o,
                            target: o
                        });
                    });

                // Transition links to their new position.
                link.transition()
                    .duration(duration)
                    .attr("d", diagonal);

                // Transition exiting nodes to the parent's new position.
                link.exit().transition()
                    .duration(duration)
                    .attr("d", function(d) {
                        var o = {
                            x: source.x,
                            y: source.y
                        };
                        return diagonal({
                            source: o,
                            target: o
                        });
                    })
                    .remove();

                // Stash the old positions for transition.
                nodes.forEach(function(d) {
                    d.x0 = d.x;
                    d.y0 = d.y;
                });
            }

            // Append a group which holds all nodes and which the zoom Listener can act upon.
            var svgGroup = baseSvg.append("g");

            // Define the root
            root = treeData;
            root.x0 = viewerHeight / 2;
            root.y0 = 0;

            // Layout the tree initially and center on the root node.
            update(root);
            centerNode(root);
        });
        // console.log('chart done.');
    }, 1000);
}

function createStoryJS(c, src) {
    var storyjs_embedjs, t, te, x, isCDN = false,
        js_version = "2.24",
        jquery_version_required = "1.7.1",
        jquery_version = "",
        ready = {
            timeout: "",
            checks: 0,
            finished: false,
            js: false,
            css: false,
            jquery: false,
            has_jquery: false,
            language: false,
            font: {
                css: false,
                js: false
            }
        },
        path = {
            base: embed_path,
            css: embed_path + "css/",
            js: embed_path + "js/",
            locale: embed_path + "js/locale/",
            jquery: "//ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js",
            font: {
                google: false,
                css: embed_path + "css/themes/font/",
                js: "//ajax.googleapis.com/ajax/libs/webfont/1/webfont.js"
            }
        },
        storyjs_e_config = {
            version: js_version,
            debug: false,
            type: "timeline",
            id: "storyjs",
            embed_id: "timeline-embed",
            embed: true,
            width: "100%",
            height: "100%",
            source: "https://docs.google.com/spreadsheet/pub?key=0Agl_Dv6iEbDadFYzRjJPUGktY0NkWXFUWkVIZDNGRHc&output=html",
            lang: "en",
            font: "default",
            css: path.css + "timeline.css?" + js_version,
            js: "",
            api_keys: {
                google: "",
                flickr: "",
                twitter: ""
            },
            gmap_key: ""
        },
        font_presets = [{
            name: "Merriweather-NewsCycle",
            google: ["News+Cycle:400,700:latin", "Merriweather:400,700,900:latin"]
        }, {
            name: "NewsCycle-Merriweather",
            google: ["News+Cycle:400,700:latin", "Merriweather:300,400,700:latin"]
        }, {
            name: "PoiretOne-Molengo",
            google: ["Poiret+One::latin", "Molengo::latin"]
        }, {
            name: "Arvo-PTSans",
            google: ["Arvo:400,700,400italic:latin", "PT+Sans:400,700,400italic:latin"]
        }, {
            name: "PTSerif-PTSans",
            google: ["PT+Sans:400,700,400italic:latin", "PT+Serif:400,700,400italic:latin"]
        }, {
            name: "PT",
            google: ["PT+Sans+Narrow:400,700:latin", "PT+Sans:400,700,400italic:latin", "PT+Serif:400,700,400italic:latin"]
        }, {
            name: "DroidSerif-DroidSans",
            google: ["Droid+Sans:400,700:latin", "Droid+Serif:400,700,400italic:latin"]
        }, {
            name: "Lekton-Molengo",
            google: ["Lekton:400,700,400italic:latin", "Molengo::latin"]
        }, {
            name: "NixieOne-Ledger",
            google: ["Nixie+One::latin", "Ledger::latin"]
        }, {
            name: "AbrilFatface-Average",
            google: ["Average::latin", "Abril+Fatface::latin"]
        }, {
            name: "PlayfairDisplay-Muli",
            google: ["Playfair+Display:400,400italic:latin", "Muli:300,400,300italic,400italic:latin"]
        }, {
            name: "Rancho-Gudea",
            google: ["Rancho::latin", "Gudea:400,700,400italic:latin"]
        }, {
            name: "Bevan-PotanoSans",
            google: ["Bevan::latin", "Pontano+Sans::latin"]
        }, {
            name: "BreeSerif-OpenSans",
            google: ["Bree+Serif::latin", "Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800:latin"]
        }, {
            name: "SansitaOne-Kameron",
            google: ["Sansita+One::latin", "Kameron:400,700:latin"]
        }, {
            name: "Lora-Istok",
            google: ["Lora:400,700,400italic,700italic:latin", "Istok+Web:400,700,400italic,700italic:latin"]
        }, {
            name: "Pacifico-Arimo",
            google: ["Pacifico::latin", "Arimo:400,700,400italic,700italic:latin"]
        }];
    if (typeof c == "object") {
        for (x in c) {
            if (Object.prototype.hasOwnProperty.call(c, x)) {
                storyjs_e_config[x] = c[x]
            }
        }
    }
    if (typeof src != "undefined") {
        storyjs_e_config.source = src
    }
    if (typeof url_config == "object") {
        isCDN = true;
        if (storyjs_e_config.source.match("docs.google.com") || storyjs_e_config.source.match("json") || storyjs_e_config.source.match("storify")) {} else {
            storyjs_e_config.source = "https://docs.google.com/spreadsheet/pub?key=" + storyjs_e_config.source + "&output=html"
        }
    }
    if (storyjs_e_config.js.match("locale")) {
        storyjs_e_config.lang = storyjs_e_config.js.split("locale/")[1].replace(".js", "");
        storyjs_e_config.js = path.js + "timeline-min.js?" + js_version
    }
    if (storyjs_e_config.js.match("/")) {} else {
        storyjs_e_config.css = path.css + storyjs_e_config.type + ".css?" + js_version;
        storyjs_e_config.js = path.js + storyjs_e_config.type;
        if (storyjs_e_config.debug) {
            storyjs_e_config.js += ".js?" + js_version
        } else {
            storyjs_e_config.js += "-min.js?" + js_version
        }
        storyjs_e_config.id = "storyjs-" + storyjs_e_config.type
    }
    if (storyjs_e_config.lang.match("/")) {
        path.locale = storyjs_e_config.lang
    } else {
        path.locale = path.locale + storyjs_e_config.lang + ".js?" + js_version
    }
    createEmbedDiv();
    // LoadLib.css(storyjs_e_config.css, onloaded_css);
    onloaded_css();
    if (storyjs_e_config.font == "default") {
        ready.font.js = true;
        ready.font.css = true
    } else {
        var fn;
        if (storyjs_e_config.font.match("/")) {
            fn = storyjs_e_config.font.split(".css")[0].split("/");
            path.font.name = fn[fn.length - 1];
            path.font.css = storyjs_e_config.font
        } else {
            path.font.name = storyjs_e_config.font;
            path.font.css = path.font.css + storyjs_e_config.font + ".css?" + js_version
        }
        // LoadLib.css(path.font.css, onloaded_font_css);
        onloaded_font_css();
        for (var i = 0; i < font_presets.length; i++) {
            if (path.font.name == font_presets[i].name) {
                path.font.google = true;
                WebFontConfig = {
                    google: {
                        families: font_presets[i].google
                    }
                }
            }
        }
        if (path.font.google) {
            LoadLib.js(path.font.js, onloaded_font_js)
        } else {
            ready.font.js = true
        }
    }
    try {
        ready.has_jquery = jQuery;
        ready.has_jquery = true;
        if (ready.has_jquery) {
            var jquery_version_array = jQuery.fn.jquery.split(".");
            var jquery_version_required_array = jquery_version_required.split(".");
            ready.jquery = true;
            for (i = 0; i < 2; i++) {
                var have = jquery_version_array[i],
                    need = parseFloat(jquery_version_required_array[i]);
                if (have != need) {
                    ready.jquery = have > need;
                    break
                }
            }
        }
    } catch (err) {
        ready.jquery = false
    }
    if (!ready.jquery) {
        LoadLib.js(path.jquery, onloaded_jquery)
    } else {
        onloaded_jquery()
    }

    function onloaded_jquery() {
        // LoadLib.js(storyjs_e_config.js, onloaded_js);
        onloaded_js();
    }

    function onloaded_js() {
        ready.js = true;
        if (storyjs_e_config.lang != "en") {
            LazyLoad.js(path.locale, onloaded_language)
        } else {
            ready.language = true
        }
        onloaded_check()
    }

    function onloaded_language() {
        ready.language = true;
        onloaded_check()
    }

    function onloaded_css() {
        ready.css = true;
        onloaded_check()
    }

    function onloaded_font_css() {
        ready.font.css = true;
        onloaded_check()
    }

    function onloaded_font_js() {
        ready.font.js = true;
        onloaded_check()
    }

    function onloaded_check() {
        if (ready.checks > 40) {
            return;
            alert("Error Loading Files")
        } else {
            ready.checks++;
            if (ready.js && ready.css && ready.font.css && ready.font.js && ready.language) {
                if (!ready.finished) {
                    ready.finished = true;
                    buildEmbed()
                }
            } else {
                ready.timeout = setTimeout("onloaded_check_again();", 250)
            }
        }
    }
    this.onloaded_check_again = function() {
        onloaded_check()
    };

    function createEmbedDiv() {
        var embed_classname = "storyjs-embed";
        t = document.createElement("div");
        if (storyjs_e_config.embed_id != "") {
            te = document.getElementById(storyjs_e_config.embed_id)
        } else {
            te = document.getElementById("timeline-embed")
        }
        te.appendChild(t);
        t.setAttribute("id", storyjs_e_config.id);
        if (storyjs_e_config.width.toString().match("%")) {
            te.style.width = storyjs_e_config.width.split("%")[0] + "%"
        } else {
            storyjs_e_config.width = storyjs_e_config.width - 2;
            te.style.width = storyjs_e_config.width + "px"
        }
        if (storyjs_e_config.height.toString().match("%")) {
            te.style.height = storyjs_e_config.height;
            embed_classname += " full-embed";
            te.style.height = storyjs_e_config.height.split("%")[0] + "%"
        } else if (storyjs_e_config.width.toString().match("%")) {
            embed_classname += " full-embed";
            storyjs_e_config.height = storyjs_e_config.height - 16;
            te.style.height = storyjs_e_config.height + "px"
        } else {
            embed_classname += " sized-embed";
            storyjs_e_config.height = storyjs_e_config.height - 16;
            te.style.height = storyjs_e_config.height + "px"
        }
        te.setAttribute("class", embed_classname);
        te.setAttribute("className", embed_classname);
        t.style.position = "relative"
    }

    function buildEmbed() {
        VMM.debug = storyjs_e_config.debug;
        storyjs_embedjs = new VMM.Timeline(storyjs_e_config.id);
        storyjs_embedjs.init(storyjs_e_config);
        main_timeline = storyjs_embedjs;
        if (isCDN) {
            VMM.bindEvent(global, onHeadline, "HEADLINE")
        }
    }
}

$(document.body).on('click', '.content .text a', function(e) {
    e.preventDefault();
    var link = $(this).attr('href');
    if(link.indexOf('http') == -1) {
        link = 'http://' + link;
    }
    console.log(link);
    var frame = $(this).closest('.content').find('.media .media-frame');
    $(frame).attr('src', link);
});

$(window).on('hashchange', function(e) {
    e.preventDefault();
    alert('bye');
});

window.onbeforeunload = function() {
    return 'Are you sure you want to leave?';
}