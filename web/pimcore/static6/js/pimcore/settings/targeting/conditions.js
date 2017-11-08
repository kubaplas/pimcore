/**
 * Pimcore
 *
 * This source file is available under two different licenses:
 * - GNU General Public License version 3 (GPLv3)
 * - Pimcore Enterprise License (PEL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 * @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
 * @license    http://www.pimcore.org/license     GPLv3 and PEL
 */

/* CONDITION TYPES */

pimcore.registerNS("pimcore.settings.targeting.conditions");

pimcore.settings.targeting.conditions = (function () {
    var conditions = {
        url: Class.create(pimcore.settings.targeting.condition.abstract, {
            getName: function () {
                return "URL (RegExp)";
            },

            getPanel: function (panel, data) {
                var id = Ext.id();

                return new Ext.form.FormPanel({
                    id: id,
                    forceLayout: true,
                    style: "margin: 10px 0 0 0",
                    bodyStyle: "padding: 10px 30px 10px 30px; min-height:40px;",
                    tbar: pimcore.settings.targeting.conditions.getTopBar(this, id, panel, data),
                    items: [{
                        xtype: "textfield",
                        fieldLabel: "URL (RegExp)",
                        name: "url",
                        value: data.url,
                        width: 500
                    }, {
                        xtype: "hidden",
                        name: "type",
                        value: "url"
                    }]
                });
            }
        }),

        browser: Class.create(pimcore.settings.targeting.condition.abstract, {
            getName: function () {
                return t("browser");
            },

            getPanel: function (panel, data) {
                var id = Ext.id();

                return new Ext.form.FormPanel({
                    id: id,
                    forceLayout: true,
                    style: "margin: 10px 0 0 0",
                    bodyStyle: "padding: 10px 30px 10px 30px; min-height:40px;",
                    tbar: pimcore.settings.targeting.conditions.getTopBar(this, id, panel, data),
                    items: [{
                        xtype: "combo",
                        fieldLabel: t("browser"),
                        store: [
                            ["ie", "Internet Explorer"],
                            ["firefox", "Firefox"],
                            ["chrome", "Google Chrome"],
                            ["safari", "Safari"],
                            ["opera", "Opera"]
                        ],
                        name: "browser",
                        mode: "local",
                        width: 300,
                        value: data.browser,
                        editable: false,
                        triggerAction: "all"
                    }, {
                        xtype: "hidden",
                        name: "type",
                        value: "browser"
                    }]
                });
            }
        }),

        country: Class.create(pimcore.settings.targeting.condition.abstract, {
            getName: function () {
                return t("country");
            },

            getPanel: function (panel, data) {
                var id = Ext.id();

                return new Ext.form.FormPanel({
                    id: id,
                    forceLayout: true,
                    style: "margin: 10px 0 0 0",
                    bodyStyle: "padding: 10px 30px 10px 30px; min-height:40px;",
                    tbar: pimcore.settings.targeting.conditions.getTopBar(this, id, panel, data),
                    items: [{
                        xtype: 'combo',
                        fieldLabel: t('country'),
                        displayField: 'name',
                        valueField: 'code',
                        name: "country",
                        store: new Ext.data.JsonStore({
                            autoDestroy: true,
                            proxy: {
                                type: 'ajax',
                                url: "/admin/misc/country-list",
                                reader: {
                                    type: 'json',
                                    rootProperty: 'data'
                                }
                            },
                            fields: ["code", "name"]
                        }),
                        triggerAction: "all",
                        mode: "local",
                        width: 350,
                        value: data.country,
                        listeners: {
                            afterrender: function (el) {
                                el.getStore().load();
                            }
                        }
                    }, {
                        xtype: "hidden",
                        name: "type",
                        value: "country"
                    }]
                });
            }
        }),

        language: Class.create(pimcore.settings.targeting.condition.abstract, {
            getName: function () {
                return t("language");
            },

            getPanel: function (panel, data) {
                var id = Ext.id();

                return new Ext.form.FormPanel({
                    id: id,
                    forceLayout: true,
                    style: "margin: 10px 0 0 0",
                    bodyStyle: "padding: 10px 30px 10px 30px; min-height:40px;",
                    tbar: pimcore.settings.targeting.conditions.getTopBar(this, id, panel, data),
                    items: [{
                        xtype: 'combo',
                        fieldLabel: t('language'),
                        displayField: 'name',
                        valueField: 'code',
                        name: "language",
                        store: new Ext.data.JsonStore({
                            autoDestroy: true,
                            proxy: {
                                type: 'ajax',
                                url: "/admin/misc/language-list",
                                reader: {
                                    type: 'json',
                                    rootProperty: 'data'
                                }
                            },
                            fields: ["code", "name"]
                        }),
                        triggerAction: "all",
                        mode: "local",
                        width: 350,
                        value: data.language,
                        listeners: {
                            afterrender: function (el) {
                                el.getStore().load();
                            }
                        }
                    }, {
                        xtype: "hidden",
                        name: "type",
                        value: "language"
                    }]
                });
            }
        }),

        event: Class.create(pimcore.settings.targeting.condition.abstract, {
            getName: function () {
                return t("event");
            },

            getPanel: function (panel, data) {
                var id = Ext.id();

                return new Ext.form.FormPanel({
                    id: id,
                    forceLayout: true,
                    style: "margin: 10px 0 0 0",
                    bodyStyle: "padding: 10px 30px 10px 30px; min-height:40px;",
                    tbar: pimcore.settings.targeting.conditions.getTopBar(this, id, panel, data),
                    items: [{
                        xtype: 'textfield',
                        fieldLabel: t('key'),
                        name: "key",
                        value: data.key,
                        width: 300
                    }, {
                        xtype: 'textfield',
                        fieldLabel: t('value'),
                        name: "value",
                        value: data.value,
                        width: 200
                    }, {
                        xtype: "hidden",
                        name: "type",
                        value: "event"
                    }]
                });
            }
        }),

        geopoint: Class.create(pimcore.settings.targeting.condition.abstract, {
            getName: function () {
                return t("geopoint");
            },

            getPanel: function (panel, data) {
                var id = Ext.id();

                var longitude = new Ext.form.NumberField({
                    decimalPrecision: 20,
                    fieldLabel: t('longitude'),
                    name: "longitude",
                    value: data.longitude,
                    width: 350
                });

                var latitude = new Ext.form.NumberField({
                    decimalPrecision: 20,
                    fieldLabel: t('latitude'),
                    name: "latitude",
                    value: data.latitude,
                    width: 350
                });

                var radius = new Ext.form.NumberField({
                    decimalPrecision: 0,
                    fieldLabel: t('radius_in_km'),
                    name: "radius",
                    value: data.radius,
                    width: 200
                });

                return new Ext.form.FormPanel({
                    id: id,
                    forceLayout: true,
                    style: "margin: 10px 0 0 0",
                    bodyStyle: "padding: 10px 30px 10px 30px; min-height:40px;",
                    tbar: pimcore.settings.targeting.conditions.getTopBar(this, id, panel, data),
                    items: [
                        longitude,
                        latitude,
                        radius,
                        {
                            xtype: "button",
                            text: t("open_search_editor"),
                            iconCls: "pimcore_icon_search",
                            handler: function () {

                                var gmap, marker, mapPanel, circle;

                                var searchfield = new Ext.form.TextField({
                                    width: 400,
                                    name: "mapSearch",
                                    style: "float: left;",
                                    fieldLabel: t("search")
                                });

                                var currentLocationTextNode = new Ext.Toolbar.TextItem({
                                    text: " - "
                                });

                                var searchWindow = new Ext.Window({
                                    modal: true,
                                    width: 700,
                                    height: 500,
                                    resizable: false,
                                    tbar: [currentLocationTextNode],
                                    bbar: [searchfield, {
                                        xtype: "button",
                                        text: t("search"),
                                        iconCls: "pimcore_icon_search",
                                        handler: function () {
                                            var geocoder = new google.maps.Geocoder();
                                            if (geocoder) {
                                                var address = searchfield.getValue();
                                                geocoder.geocode({'address': address}, function (results, status) {
                                                    if (status === google.maps.GeocoderStatus.OK) {
                                                        marker.setPosition(results[0].geometry.location);
                                                        gmap.setCenter(results[0].geometry.location, 16);
                                                        gmap.setZoom(7);
                                                    }
                                                });
                                            }
                                        }
                                    }, "->", {
                                        xtype: "button",
                                        text: t("cancel"),
                                        iconCls: "pimcore_icon_cancel",
                                        handler: function () {
                                            searchWindow.close();
                                        }
                                    }, {
                                        xtype: "button",
                                        text: t("OK"),
                                        iconCls: "pimcore_icon_save",
                                        handler: function () {
                                            var point = marker.getPosition();
                                            latitude.setValue(point.lat());
                                            longitude.setValue(point.lng());
                                            radius.setValue(Math.round(circle.getRadius() / 1000));

                                            searchWindow.close();
                                        }
                                    }],
                                    plain: true
                                });

                                searchWindow.on("afterrender", function () {
                                    var latitudeMap = 0;
                                    var longitudeMap = 0;
                                    var radiusMap = 100000;
                                    var mapZoom = 1;
                                    if (latitude.getValue() && longitude.getValue()) {
                                        latitudeMap = latitude.getValue();
                                        longitudeMap = longitude.getValue();
                                        mapZoom = 14;
                                    }
                                    if (radius.getValue()) {
                                        radiusMap = radius.getValue() * 1000;
                                    }

                                    var startingPoint = new google.maps.LatLng(latitudeMap, longitudeMap);

                                    gmap = new google.maps.Map(searchWindow.body.dom, {
                                        zoom: mapZoom,
                                        center: startingPoint,
                                        mapTypeId: google.maps.MapTypeId.ROADMAP
                                    });

                                    marker = new google.maps.Marker({
                                        position: startingPoint,
                                        map: gmap,
                                        draggable: true
                                    });

                                    circle = new google.maps.Circle({
                                        map: gmap,
                                        center: startingPoint,
                                        editable: true,
                                        radius: radiusMap,
                                        fillColor: "#ff6600",
                                        fillOpacity: 0.5,
                                        strokeWeight: 2,
                                        strokeOpacity: 1,
                                        strokeColor: "#000000"
                                    });

                                    google.maps.event.addListener(marker, "position_changed", function () {
                                        circle.setCenter(marker.getPosition());
                                    });

                                    var GLOBE_WIDTH = 256; // a constant in Google's map projection
                                    var west = circle.getBounds().getSouthWest().lng();
                                    var east = circle.getBounds().getNorthEast().lng();
                                    var angle = east - west;
                                    if (angle < 0) {
                                        angle += 360;
                                    }
                                    var zoom = Math.round(Math.log(searchWindow.body.getWidth()
                                        * 360 / angle / GLOBE_WIDTH) / Math.LN2);
                                    gmap.setZoom(zoom - 1);
                                });

                                searchWindow.show();
                            }
                        }, {
                            xtype: "hidden",
                            name: "type",
                            value: "geopoint"
                        }, {
                            xtype: "displayfield",
                            style: "margin-top:10px;",
                            html: 'This product includes GeoLite2 data created by MaxMind, available from <a href="http://www.maxmind.com" target="_blank">http://www.maxmind.com</a>.'
                        }
                    ]
                });
            }
        }),

        referringsite: Class.create(pimcore.settings.targeting.condition.abstract, {
            getName: function () {
                return t("referring_site");
            },

            getPanel: function (panel, data) {
                var id = Ext.id();

                return new Ext.form.FormPanel({
                    id: id,
                    forceLayout: true,
                    style: "margin: 10px 0 0 0",
                    bodyStyle: "padding: 10px 30px 10px 30px; min-height:40px;",
                    tbar: pimcore.settings.targeting.conditions.getTopBar(this, id, panel, data),
                    items: [{
                        xtype: 'textfield',
                        fieldLabel: t('referrer'),
                        name: "referrer",
                        value: data.referrer,
                        width: 450
                    }, {
                        xtype: "hidden",
                        name: "type",
                        value: "referringsite"
                    }]
                });
            }
        }),

        searchengine: Class.create(pimcore.settings.targeting.condition.abstract, {
            getName: function () {
                return t("searchengine");
            },

            getPanel: function (panel, data) {
                var id = Ext.id();

                return new Ext.form.FormPanel({
                    id: id,
                    forceLayout: true,
                    style: "margin: 10px 0 0 0",
                    bodyStyle: "padding: 10px 30px 10px 30px; min-height:40px;",
                    tbar: pimcore.settings.targeting.conditions.getTopBar(this, id, panel, data),
                    items: [{
                        xtype: 'combo',
                        fieldLabel: t('searchengine'),
                        name: "searchengine",
                        disableKeyFilter: true,
                        store: [["", t("all")], ["google", "Google"], ["bing", "Bing"], ["yahoo", "Yahoo!"]],
                        triggerAction: "all",
                        mode: "local",
                        width: 350,
                        value: data.searchengine ? data.searchengine : ""
                    }, {
                        xtype: "hidden",
                        name: "type",
                        value: "searchengine"
                    }]
                })
            }
        }),

        vistitedpagebefore: Class.create(pimcore.settings.targeting.condition.abstract, {
            getName: function () {
                return t("visited_page_before");
            },

            getPanel: function (panel, data) {
                var id = Ext.id();

                return new Ext.form.FormPanel({
                    id: id,
                    forceLayout: true,
                    style: "margin: 10px 0 0 0",
                    bodyStyle: "padding: 10px 30px 10px 30px; min-height:40px;",
                    tbar: pimcore.settings.targeting.conditions.getTopBar(this, id, panel, data),
                    items: [{
                        xtype: 'textfield',
                        fieldLabel: "URL",
                        name: "url",
                        value: data.url,
                        width: 450
                    }, {
                        xtype: "hidden",
                        name: "type",
                        value: "vistitedpagebefore"
                    }]
                });
            }
        }),

        vistitedpagesbefore: Class.create(pimcore.settings.targeting.condition.abstract, {
            getName: function () {
                return t("visited_pages_before_number");
            },

            getPanel: function (panel, data) {
                var id = Ext.id();

                return new Ext.form.FormPanel({
                    id: id,
                    forceLayout: true,
                    style: "margin: 10px 0 0 0",
                    bodyStyle: "padding: 10px 30px 10px 30px; min-height:40px;",
                    tbar: pimcore.settings.targeting.conditions.getTopBar(this, id, panel, data),
                    items: [{
                        xtype: 'numberfield',
                        fieldLabel: t("number"),
                        name: "number",
                        value: data.number,
                        width: 200
                    }, {
                        xtype: "hidden",
                        name: "type",
                        value: "vistitedpagesbefore"
                    }]
                });
            }
        }),

        timeonsite: Class.create(pimcore.settings.targeting.condition.abstract, {
            getName: function () {
                return t("time_on_site");
            },

            getPanel: function (panel, data) {
                var id = Ext.id();

                return new Ext.form.FormPanel({
                    id: id,
                    forceLayout: true,
                    style: "margin: 10px 0 0 0",
                    bodyStyle: "padding: 10px 30px 10px 30px; min-height:40px;",
                    tbar: pimcore.settings.targeting.conditions.getTopBar(this, id, panel, data),
                    items: [{
                        xtype: 'numberfield',
                        fieldLabel: t("hours"),
                        name: "hours",
                        value: data.hours ? data.hours : 0,
                        width: 200
                    }, {
                        xtype: 'numberfield',
                        fieldLabel: t("minutes"),
                        name: "minutes",
                        value: data.minutes ? data.minutes : 0,
                        width: 200
                    }, {
                        xtype: 'numberfield',
                        fieldLabel: t("seconds"),
                        name: "seconds",
                        value: data.seconds ? data.seconds : 0,
                        width: 200
                    }, {
                        xtype: "hidden",
                        name: "type",
                        value: "timeonsite"
                    }]
                });
            }
        }),

        linkclicked: Class.create(pimcore.settings.targeting.condition.abstract, {
            getName: function () {
                return t("link_clicked");
            },

            getPanel: function (panel, data) {
                var id = Ext.id();

                return new Ext.form.FormPanel({
                    id: id,
                    forceLayout: true,
                    style: "margin: 10px 0 0 0",
                    bodyStyle: "padding: 10px 30px 10px 30px; min-height:40px;",
                    tbar: pimcore.settings.targeting.conditions.getTopBar(this, id, panel, data),
                    items: [{
                        xtype: 'textfield',
                        fieldLabel: "URL",
                        name: "url",
                        value: data.url,
                        width: 450
                    }, {
                        xtype: "hidden",
                        name: "type",
                        value: "linkclicked"
                    }]
                });
            }
        }),

        linksclicked: Class.create(pimcore.settings.targeting.condition.abstract, {
            getName: function () {
                return t("number_of_links_clicked");
            },

            getPanel: function (panel, data) {
                var id = Ext.id();

                return new Ext.form.FormPanel({
                    id: id,
                    forceLayout: true,
                    style: "margin: 10px 0 0 0",
                    bodyStyle: "padding: 10px 30px 10px 30px; min-height:40px;",
                    tbar: pimcore.settings.targeting.conditions.getTopBar(this, id, panel, data),
                    items: [{
                        xtype: 'numberfield',
                        fieldLabel: t("number"),
                        name: "number",
                        value: data.number,
                        width: 200
                    }, {
                        xtype: "hidden",
                        name: "type",
                        value: "linksclicked"
                    }]
                });
            }
        }),

        hardwareplatform: Class.create(pimcore.settings.targeting.condition.abstract, {
            getName: function () {
                return t("hardware_platform");
            },

            getPanel: function (panel, data) {
                var id = Ext.id();

                return new Ext.form.FormPanel({
                    id: id,
                    forceLayout: true,
                    style: "margin: 10px 0 0 0",
                    bodyStyle: "padding: 10px 30px 10px 30px; min-height:40px;",
                    tbar: pimcore.settings.targeting.conditions.getTopBar(this, id, panel, data),
                    items: [{
                        xtype: 'combo',
                        fieldLabel: t('hardware_platform'),
                        name: "platform",
                        disableKeyFilter: true,
                        store: [["", t("all")], ["desktop", t("desktop")], ["tablet", t("tablet")], ["mobile", t("mobile")]],
                        triggerAction: "all",
                        mode: "local",
                        width: 350,
                        value: data.platform ? data.platform : "all"
                    }, {
                        xtype: "hidden",
                        name: "type",
                        value: "hardwareplatform"
                    }]
                });
            }
        }),

        operatingsystem: Class.create(pimcore.settings.targeting.condition.abstract, {
            getName: function () {
                return t("operating_system");
            },

            getPanel: function (panel, data) {
                var id = Ext.id();

                return new Ext.form.FormPanel({
                    id: id,
                    forceLayout: true,
                    style: "margin: 10px 0 0 0",
                    bodyStyle: "padding: 10px 30px 10px 30px; min-height:40px;",
                    tbar: pimcore.settings.targeting.conditions.getTopBar(this, id, panel, data),
                    items: [{
                        xtype: 'combo',
                        fieldLabel: t('operating_system'),
                        name: "system",
                        disableKeyFilter: true,
                        store: [["", t("all")], ["windows", "Windows"], ["macos", "Mac OS"], ["linux", "Linux"],
                            ["android", "Android"], ["ios", "iOS"]],
                        triggerAction: "all",
                        mode: "local",
                        width: 350,
                        value: data.system ? data.system : "all"
                    }, {
                        xtype: "hidden",
                        name: "type",
                        value: "operatingsystem"
                    }]
                });
            }
        }),

        persona: Class.create(pimcore.settings.targeting.condition.abstract, {
            getName: function () {
                return t("personas");
            },

            getPanel: function (panel, data) {
                var id = Ext.id();

                return new Ext.form.FormPanel({
                    id: id,
                    forceLayout: true,
                    style: "margin: 10px 0 0 0",
                    bodyStyle: "padding: 10px 30px 10px 30px; min-height:40px;",
                    tbar: pimcore.settings.targeting.conditions.getTopBar(this, id, panel, data),
                    items: [{
                        xtype: "combo",
                        name: "persona",
                        displayField: 'text',
                        valueField: "id",
                        store: pimcore.globalmanager.get("personas"),
                        editable: false,
                        width: 400,
                        triggerAction: 'all',
                        listWidth: 200,
                        mode: "local",
                        value: data["persona"],
                        emptyText: t("select_a_persona"),
                        fieldLabel: t("select_a_persona")
                    }, {
                        xtype: "hidden",
                        name: "type",
                        value: "persona"
                    }]
                });
            }
        })
    };

    return {
        register: function (name, condition) {
            conditions[name] = condition;
        },

        create: function (name) {
            var conditionClass = this.get(name);

            return new conditionClass();
        },

        get: function (name) {
            if ('undefined' === typeof conditions[name]) {
                throw new Error('Condition ' + name + ' is not defined', name);
            }

            return conditions[name];
        },

        getConditions: function () {
            return conditions;
        },

        getKeys: function() {
            return Object.keys(conditions);
        },

        detectBlockIndex: function (blockElement, container) {
            // detect index
            var index;

            for (var s = 0; s < container.items.items.length; s++) {
                if (container.items.items[s].getId() === blockElement.getId()) {
                    index = s;
                    break;
                }
            }
            return index;
        },

        getTopBar: function (condition, index, parent, data) {
            var that = this;

            var toggleGroup = "g_" + index + parent.data.id;
            if (!data["operator"]) {
                data.operator = "and";
            }

            return [
                {
                    iconCls: condition.getIconCls(),
                    disabled: true
                },
                {
                    xtype: "tbtext",
                    text: "<b>" + condition.getName() + "</b>"
                },
                "-",
                {
                    iconCls: "pimcore_icon_up",
                    handler: function (blockId, parent) {

                        var container = parent.conditionsContainer;
                        var blockElement = Ext.getCmp(blockId);
                        var index = that.detectBlockIndex(blockElement, container);

                        var newIndex = index - 1;
                        if (newIndex < 0) {
                            newIndex = 0;
                        }

                        container.remove(blockElement, false);
                        container.insert(newIndex, blockElement);

                        parent.recalculateButtonStatus();
                        parent.recalculateBracketIdent(parent.conditionsContainer.items);

                        pimcore.layout.refresh();
                    }.bind(window, index, parent)
                },
                {
                    iconCls: "pimcore_icon_down",
                    handler: function (blockId, parent) {
                        var container = parent.conditionsContainer;
                        var blockElement = Ext.getCmp(blockId);
                        var index = that.detectBlockIndex(blockElement, container);

                        container.remove(blockElement, false);
                        container.insert(index + 1, blockElement);

                        parent.recalculateButtonStatus();
                        parent.recalculateBracketIdent(parent.conditionsContainer.items);

                        pimcore.layout.refresh();
                    }.bind(window, index, parent)
                },
                "-",
                {
                    text: t("AND"),
                    toggleGroup: toggleGroup,
                    enableToggle: true,
                    itemId: "toggle_and",
                    pressed: (data.operator === "and")
                },
                {
                    text: t("OR"),
                    toggleGroup: toggleGroup,
                    enableToggle: true,
                    itemId: "toggle_or",
                    pressed: (data.operator === "or")
                }, {
                    text: t("AND_NOT"),
                    toggleGroup: toggleGroup,
                    enableToggle: true,
                    itemId: "toggle_and_not",
                    pressed: (data.operator === "and_not")
                },
                "->",
                {
                    iconCls: "pimcore_icon_delete",
                    handler: function (index, parent) {
                        parent.conditionsContainer.remove(Ext.getCmp(index));
                        parent.recalculateButtonStatus();
                        parent.recalculateBracketIdent(parent.conditionsContainer.items);
                    }.bind(window, index, parent)
                }
            ];
        }
    };
}());
