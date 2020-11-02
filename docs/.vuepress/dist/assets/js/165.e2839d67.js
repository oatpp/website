(window.webpackJsonp=window.webpackJsonp||[]).push([[165],{535:function(t,a,s){"use strict";s.r(a);var e=s(42),r=Object(e.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"lazystringmap-hpp"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#lazystringmap-hpp"}},[t._v("#")]),t._v(" LazyStringMap.hpp"),s("seo")],1),t._v(" "),s("p",[s("a",{attrs:{href:"https://github.com/oatpp/oatpp/blob/master/src/oatpp/core/data/share/LazyStringMap.hpp",target:"_blank",rel:"noopener noreferrer"}},[t._v("This File On Github"),s("OutboundLink")],1),s("br"),t._v(" "),s("a",{attrs:{href:"https://github.com/oatpp/oatpp/issues/new?title=API%20question&body=In%20file:%20oatpp/core/data/share/LazyStringMap.hpp%0A%0A%23%20Question%0A%0A%3Cyour-question-here%3E",target:"_blank",rel:"noopener noreferrer"}},[t._v("Ask A Question"),s("OutboundLink")],1)]),t._v(" "),s("p",[s("code",[t._v("API: latest")]),s("br"),t._v(" "),s("code",[t._v("module: oatpp")]),s("br"),t._v(" "),s("code",[t._v('#include "oatpp/core/data/share/LazyStringMap.hpp"')])]),t._v(" "),s("h2",{attrs:{id:"lazystringmap"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#lazystringmap"}},[t._v("#")]),t._v(" LazyStringMap")]),t._v(" "),s("p",[t._v("Lazy String Map keeps keys, and values as memory label. Once value is requested by user, the new memory block is allocated and value is copied to be stored permanently. "),s("ul",[s("li",[s("strong",[t._v("@tparam")]),t._v(" Key - one of: "),s("RouterLink",{attrs:{to:"/api/latest/oatpp/core/data/share/MemoryLabel/#memorylabel"}},[t._v("oatpp::data::share::MemoryLabel")]),t._v(", "),s("RouterLink",{attrs:{to:"/api/latest/oatpp/core/data/share/MemoryLabel/#stringkeylabel"}},[t._v("oatpp::data::share::StringKeyLabel")]),t._v(", "),s("RouterLink",{attrs:{to:"/api/latest/oatpp/core/data/share/MemoryLabel/#stringkeylabelci"}},[t._v("oatpp::data::share::StringKeyLabelCI")]),t._v(", "),s("RouterLink",{attrs:{to:"/api/latest/oatpp/core/data/share/MemoryLabel/#stringkeylabelci-fast"}},[t._v("oatpp::data::share::StringKeyLabelCI_FAST")]),t._v(". ")],1)])]),t._v(" "),s("div",{staticClass:"language-cpp extra-class"},[s("pre",{pre:!0,attrs:{class:"language-cpp"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("namespace")]),t._v(" oatpp "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("namespace")]),t._v(" data "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("namespace")]),t._v(" share "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" \n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("template")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Key")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("LazyStringMap")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("h3",{attrs:{id:"methods"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#methods"}},[t._v("#")]),t._v(" Methods")]),t._v(" "),s("table",[s("thead",[s("tr",[s("th",[t._v("Return Type")]),t._v(" "),s("th",[t._v("Name")]),t._v(" "),s("th",[t._v("Summary")])])]),t._v(" "),s("tbody",[s("tr",[s("td",[s("code",[t._v("[none]")])]),t._v(" "),s("td",[s("a",{attrs:{href:"#lazystringmap-lazystringmap"}},[t._v("LazyStringMap")])]),t._v(" "),s("td",[t._v("Multiple implementations: "),s("br"),s("ol",[s("li",[t._v("Constructor. ")]),s("li",[t._v("Copy-constructor. ")]),s("li",[t._v("Move constructor. ")])])])]),t._v(" "),s("tr",[s("td",[s("code",[t._v("void")])]),t._v(" "),s("td",[s("a",{attrs:{href:"#lazystringmap-put"}},[t._v("put")])]),t._v(" "),s("td",[t._v("Put value to map.")])]),t._v(" "),s("tr",[s("td",[s("code",[t._v("void")])]),t._v(" "),s("td",[s("a",{attrs:{href:"#lazystringmap-put-lockfree"}},[t._v("put_LockFree")])]),t._v(" "),s("td",[t._v("Put value to map. Not thread-safe.")])]),t._v(" "),s("tr",[s("td",[s("code",[t._v("bool")])]),t._v(" "),s("td",[s("a",{attrs:{href:"#lazystringmap-putifnotexists"}},[t._v("putIfNotExists")])]),t._v(" "),s("td",[t._v("Put value to map if not already exists.")])]),t._v(" "),s("tr",[s("td",[s("code",[t._v("bool")])]),t._v(" "),s("td",[s("a",{attrs:{href:"#lazystringmap-putifnotexists-lockfree"}},[t._v("putIfNotExists_LockFree")])]),t._v(" "),s("td",[t._v("Put value to map if not already exists. Not thread-safe.")])]),t._v(" "),s("tr",[s("td",[s("code",[t._v("String")])]),t._v(" "),s("td",[s("a",{attrs:{href:"#lazystringmap-get"}},[t._v("get")])]),t._v(" "),s("td",[t._v("Get value as "),s("RouterLink",{attrs:{to:"/api/latest/oatpp/core/Types/#string"}},[t._v("oatpp::String")]),t._v(".")],1)]),t._v(" "),s("tr",[s("td",[s("code",[t._v("T")])]),t._v(" "),s("td",[s("a",{attrs:{href:"#lazystringmap-getasmemorylabel"}},[t._v("getAsMemoryLabel")])]),t._v(" "),s("td",[t._v("Get value as a memory label.")])]),t._v(" "),s("tr",[s("td",[s("code",[t._v("T")])]),t._v(" "),s("td",[s("a",{attrs:{href:"#lazystringmap-getasmemorylabel-unsafe"}},[t._v("getAsMemoryLabel_Unsafe")])]),t._v(" "),s("td",[t._v("Get value as a memory label without allocating memory for value.")])]),t._v(" "),s("tr",[s("td",[s("code",[t._v("const std::unordered_map<Key, StringKeyLabel>&")])]),t._v(" "),s("td",[s("a",{attrs:{href:"#lazystringmap-getall"}},[t._v("getAll")])]),t._v(" "),s("td",[t._v("Get map of all values.")])]),t._v(" "),s("tr",[s("td",[s("code",[t._v("const std::unordered_map<Key, StringKeyLabel>&")])]),t._v(" "),s("td",[s("a",{attrs:{href:"#lazystringmap-getall-unsafe"}},[t._v("getAll_Unsafe")])]),t._v(" "),s("td",[t._v("Get map of all values without allocating memory for those keys/values.")])]),t._v(" "),s("tr",[s("td",[s("code",[t._v("v_int32")])]),t._v(" "),s("td",[s("a",{attrs:{href:"#lazystringmap-getsize"}},[t._v("getSize")])]),t._v(" "),s("td",[t._v("Get number of entries in the map.")])])])]),t._v(" "),s("h3",{attrs:{id:"lazystringmap-lazystringmap"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#lazystringmap-lazystringmap"}},[t._v("#")]),t._v(" LazyStringMap::LazyStringMap")]),t._v(" "),s("ol",[s("li",[t._v("Constructor."),s("div",{staticClass:"language-cpp extra-class"},[s("pre",{pre:!0,attrs:{class:"language-cpp"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[t._v("LazyStringMap")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("m_fullyInitialized")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])])]),t._v(" "),s("li",[t._v("Copy-constructor. "),s("ul",[s("li",[s("strong",[t._v("@param")]),t._v(" other ")])]),s("div",{staticClass:"language-cpp extra-class"},[s("pre",{pre:!0,attrs:{class:"language-cpp"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[t._v("LazyStringMap")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" LazyStringMap"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&")]),t._v(" other"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])])]),t._v(" "),s("li",[t._v("Move constructor. "),s("ul",[s("li",[s("strong",[t._v("@param")]),t._v(" other ")])]),s("div",{staticClass:"language-cpp extra-class"},[s("pre",{pre:!0,attrs:{class:"language-cpp"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[t._v("LazyStringMap")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("LazyStringMap"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&&")]),t._v(" other"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])])])]),t._v(" "),s("h3",{attrs:{id:"lazystringmap-put"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#lazystringmap-put"}},[t._v("#")]),t._v(" LazyStringMap::put")]),t._v(" "),s("p",[t._v("Put value to map. "),s("ul",[s("li",[s("strong",[t._v("@param")]),t._v(" key ")]),s("li",[s("strong",[t._v("@param")]),t._v(" value ")])])]),t._v(" "),s("div",{staticClass:"language-cpp extra-class"},[s("pre",{pre:!0,attrs:{class:"language-cpp"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("void")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("put")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" Key"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&")]),t._v(" key"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" StringKeyLabel"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&")]),t._v(" value"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),s("h3",{attrs:{id:"lazystringmap-put-lockfree"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#lazystringmap-put-lockfree"}},[t._v("#")]),t._v(" LazyStringMap::put_LockFree")]),t._v(" "),s("p",[t._v("Put value to map. Not thread-safe. "),s("ul",[s("li",[s("strong",[t._v("@param")]),t._v(" key ")]),s("li",[s("strong",[t._v("@param")]),t._v(" value ")])])]),t._v(" "),s("div",{staticClass:"language-cpp extra-class"},[s("pre",{pre:!0,attrs:{class:"language-cpp"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("void")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("put_LockFree")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" Key"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&")]),t._v(" key"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" StringKeyLabel"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&")]),t._v(" value"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),s("h3",{attrs:{id:"lazystringmap-putifnotexists"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#lazystringmap-putifnotexists"}},[t._v("#")]),t._v(" LazyStringMap::putIfNotExists")]),t._v(" "),s("p",[t._v("Put value to map if not already exists. "),s("ul",[s("li",[s("strong",[t._v("@param")]),t._v(" key ")]),s("li",[s("strong",[t._v("@param")]),t._v(" value ")]),s("li",[s("strong",[t._v("@return")])])])]),t._v(" "),s("div",{staticClass:"language-cpp extra-class"},[s("pre",{pre:!0,attrs:{class:"language-cpp"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("bool")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("putIfNotExists")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" Key"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&")]),t._v(" key"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" StringKeyLabel"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&")]),t._v(" value"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),s("h3",{attrs:{id:"lazystringmap-putifnotexists-lockfree"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#lazystringmap-putifnotexists-lockfree"}},[t._v("#")]),t._v(" LazyStringMap::putIfNotExists_LockFree")]),t._v(" "),s("p",[t._v("Put value to map if not already exists. Not thread-safe. "),s("ul",[s("li",[s("strong",[t._v("@param")]),t._v(" key ")]),s("li",[s("strong",[t._v("@param")]),t._v(" value ")]),s("li",[s("strong",[t._v("@return")])])])]),t._v(" "),s("div",{staticClass:"language-cpp extra-class"},[s("pre",{pre:!0,attrs:{class:"language-cpp"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("bool")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("putIfNotExists_LockFree")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" Key"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&")]),t._v(" key"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" StringKeyLabel"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&")]),t._v(" value"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),s("h3",{attrs:{id:"lazystringmap-get"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#lazystringmap-get"}},[t._v("#")]),t._v(" LazyStringMap::get")]),t._v(" "),s("p",[t._v("Get value as "),s("RouterLink",{attrs:{to:"/api/latest/oatpp/core/Types/#string"}},[t._v("oatpp::String")]),t._v(". "),s("ul",[s("li",[s("strong",[t._v("@param")]),t._v(" key ")]),s("li",[s("strong",[t._v("@return")])])])],1),t._v(" "),s("div",{staticClass:"language-cpp extra-class"},[s("pre",{pre:!0,attrs:{class:"language-cpp"}},[s("code",[t._v("String "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("get")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" Key"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&")]),t._v(" key"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v("\n")])])]),s("h3",{attrs:{id:"lazystringmap-getasmemorylabel"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#lazystringmap-getasmemorylabel"}},[t._v("#")]),t._v(" LazyStringMap::getAsMemoryLabel")]),t._v(" "),s("p",[t._v("Get value as a memory label. "),s("ul",[s("li",[s("strong",[t._v("@tparam")]),t._v(" T - one of: "),s("RouterLink",{attrs:{to:"/api/latest/oatpp/core/data/share/MemoryLabel/#memorylabel"}},[t._v("oatpp::data::share::MemoryLabel")]),t._v(", "),s("RouterLink",{attrs:{to:"/api/latest/oatpp/core/data/share/MemoryLabel/#stringkeylabel"}},[t._v("oatpp::data::share::StringKeyLabel")]),t._v(", "),s("RouterLink",{attrs:{to:"/api/latest/oatpp/core/data/share/MemoryLabel/#stringkeylabelci"}},[t._v("oatpp::data::share::StringKeyLabelCI")]),t._v(", "),s("RouterLink",{attrs:{to:"/api/latest/oatpp/core/data/share/MemoryLabel/#stringkeylabelci-fast"}},[t._v("oatpp::data::share::StringKeyLabelCI_FAST")]),t._v(". ")],1),s("li",[s("strong",[t._v("@param")]),t._v(" key ")]),s("li",[s("strong",[t._v("@return")])])])]),t._v(" "),s("div",{staticClass:"language-cpp extra-class"},[s("pre",{pre:!0,attrs:{class:"language-cpp"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("template")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("T")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\nT "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("getAsMemoryLabel")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" Key"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&")]),t._v(" key"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v("\n")])])]),s("h3",{attrs:{id:"lazystringmap-getasmemorylabel-unsafe"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#lazystringmap-getasmemorylabel-unsafe"}},[t._v("#")]),t._v(" LazyStringMap::getAsMemoryLabel_Unsafe")]),t._v(" "),s("p",[t._v("Get value as a memory label without allocating memory for value. "),s("ul",[s("li",[s("strong",[t._v("@tparam")]),t._v(" T - one of: "),s("RouterLink",{attrs:{to:"/api/latest/oatpp/core/data/share/MemoryLabel/#memorylabel"}},[t._v("oatpp::data::share::MemoryLabel")]),t._v(", "),s("RouterLink",{attrs:{to:"/api/latest/oatpp/core/data/share/MemoryLabel/#stringkeylabel"}},[t._v("oatpp::data::share::StringKeyLabel")]),t._v(", "),s("RouterLink",{attrs:{to:"/api/latest/oatpp/core/data/share/MemoryLabel/#stringkeylabelci"}},[t._v("oatpp::data::share::StringKeyLabelCI")]),t._v(", * "),s("RouterLink",{attrs:{to:"/api/latest/oatpp/core/data/share/MemoryLabel/#stringkeylabelci-fast"}},[t._v("oatpp::data::share::StringKeyLabelCI_FAST")]),t._v(". ")],1),s("li",[s("strong",[t._v("@param")]),t._v(" key ")]),s("li",[s("strong",[t._v("@return")])])])]),t._v(" "),s("div",{staticClass:"language-cpp extra-class"},[s("pre",{pre:!0,attrs:{class:"language-cpp"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("template")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("T")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\nT "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("getAsMemoryLabel_Unsafe")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" Key"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&")]),t._v(" key"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v("\n")])])]),s("h3",{attrs:{id:"lazystringmap-getall"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#lazystringmap-getall"}},[t._v("#")]),t._v(" LazyStringMap::getAll")]),t._v(" "),s("p",[t._v("Get map of all values. "),s("ul",[s("li",[s("strong",[t._v("@return")])])])]),t._v(" "),s("div",{staticClass:"language-cpp extra-class"},[s("pre",{pre:!0,attrs:{class:"language-cpp"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" std"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("::")]),t._v("unordered_map"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("Key"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" StringKeyLabel"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("getAll")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v("\n")])])]),s("h3",{attrs:{id:"lazystringmap-getall-unsafe"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#lazystringmap-getall-unsafe"}},[t._v("#")]),t._v(" LazyStringMap::getAll_Unsafe")]),t._v(" "),s("p",[t._v("Get map of all values without allocating memory for those keys/values. "),s("ul",[s("li",[s("strong",[t._v("@return")])])])]),t._v(" "),s("div",{staticClass:"language-cpp extra-class"},[s("pre",{pre:!0,attrs:{class:"language-cpp"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" std"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("::")]),t._v("unordered_map"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("Key"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" StringKeyLabel"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("getAll_Unsafe")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v("\n")])])]),s("h3",{attrs:{id:"lazystringmap-getsize"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#lazystringmap-getsize"}},[t._v("#")]),t._v(" LazyStringMap::getSize")]),t._v(" "),s("p",[t._v("Get number of entries in the map. "),s("ul",[s("li",[s("strong",[t._v("@return")])])])]),t._v(" "),s("div",{staticClass:"language-cpp extra-class"},[s("pre",{pre:!0,attrs:{class:"language-cpp"}},[s("code",[t._v("v_int32 "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("getSize")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v("\n")])])])])}),[],!1,null,null,null);a.default=r.exports}}]);